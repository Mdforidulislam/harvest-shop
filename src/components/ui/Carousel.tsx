"use client";
import { useRef, useState, useEffect, useCallback, Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import type { SwiperRef, SwiperClass } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/a11y";

export type SlidesPerView = {
  base: number;
  sm?:  number;
  md?:  number;
  lg?:  number;
  xl?:  number;
};

export type CarouselProps = {
  children:       React.ReactNode;
  slidesPerView:  SlidesPerView;
  gap?:           number;
  autoplay?:      boolean;
  autoplayDelay?: number;
  loop?:          boolean;
  showArrows?:    boolean;
  showDots?:      boolean;
  ariaLabel:      string;
};

function resolve(spv: SlidesPerView) {
  const base = spv.base;
  const sm   = spv.sm   ?? base;
  const md   = spv.md   ?? sm;
  const lg   = spv.lg   ?? md;
  const xl   = spv.xl   ?? lg;
  return { base, sm, md, lg, xl };
}

export default function Carousel({
  children,
  slidesPerView,
  gap           = 16,
  autoplay      = false,
  autoplayDelay = 5000,
  loop          = true,
  showArrows    = true,
  showDots      = true,
  ariaLabel,
}: CarouselProps) {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSPG, setCurrentSPG]   = useState(slidesPerView.base);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const spv        = resolve(slidesPerView);
  const maxSPV     = Math.max(spv.base, spv.sm, spv.md, spv.lg, spv.xl);
  const childCount = Children.count(children);

  // Only loop when there are more slides than the widest view — avoids Swiper clone bugs
  const effectiveLoop = loop && childCount > maxSPV;

  const breakpoints = {
    0:    { slidesPerView: spv.base, slidesPerGroup: spv.base },
    640:  { slidesPerView: spv.sm,   slidesPerGroup: spv.sm   },
    768:  { slidesPerView: spv.md,   slidesPerGroup: spv.md   },
    1024: { slidesPerView: spv.lg,   slidesPerGroup: spv.lg   },
    1280: { slidesPerView: spv.xl,   slidesPerGroup: spv.xl   },
  };

  const pageCount  = Math.max(1, Math.ceil(childCount / currentSPG));
  const activePage = Math.min(Math.floor(activeIndex / currentSPG), pageCount - 1);
  const needNav    = childCount > maxSPV;

  const syncSPG = useCallback((sw: SwiperClass) => {
    setCurrentSPG((sw.params.slidesPerGroup as number | undefined) ?? slidesPerView.base);
  }, [slidesPerView.base]);

  const handleSlideChange = useCallback((sw: SwiperClass) => {
    setActiveIndex(sw.realIndex);
  }, []);

  // Pause autoplay when the browser tab is hidden
  useEffect(() => {
    if (!autoplay || reducedMotion) return;
    const onVisibility = () => {
      const sw = swiperRef.current?.swiper;
      if (!sw?.autoplay) return;
      document.hidden ? sw.autoplay.pause() : sw.autoplay.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [autoplay, reducedMotion]);

  const goToPage = useCallback((page: number) => {
    const sw = swiperRef.current?.swiper;
    if (!sw) return;
    const index = page * currentSPG;
    effectiveLoop ? sw.slideToLoop(index) : sw.slideTo(index);
  }, [effectiveLoop, currentSPG]);

  const arrowCls =
    "absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full " +
    "flex items-center justify-center transition-all duration-200 " +
    "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 " +
    "[@media(hover:none)]:opacity-100";

  const arrowStyle: React.CSSProperties = {
    background: "var(--surface)",
    border:     "1px solid var(--border)",
    color:      "var(--text)",
    boxShadow:  "0 1px 4px rgba(0,0,0,0.08)",
  };

  return (
    <div role="region" aria-label={ariaLabel}>
      {/* Track + arrows */}
      <div className="relative group">
        {showArrows && needNav && (
          <button
            type="button"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            aria-label="Previous"
            className={`${arrowCls} left-1`}
            style={arrowStyle}
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <Swiper
          ref={swiperRef}
          modules={[...(autoplay && !reducedMotion ? [Autoplay] : []), A11y, Keyboard]}
          breakpoints={breakpoints}
          spaceBetween={gap}
          loop={effectiveLoop}
          autoplay={
            autoplay && !reducedMotion
              ? { delay: autoplayDelay, pauseOnMouseEnter: true, disableOnInteraction: false }
              : false
          }
          speed={reducedMotion ? 0 : 400}
          a11y={{ enabled: true }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          onSwiper={syncSPG}
          onSlideChange={handleSlideChange}
          onBreakpoint={(sw) => syncSPG(sw)}
          className="w-full"
        >
          {Children.map(children, (child, i) => (
            <SwiperSlide key={i} className="h-auto">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>

        {showArrows && needNav && (
          <button
            type="button"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            aria-label="Next"
            className={`${arrowCls} right-1`}
            style={arrowStyle}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Dot pagination */}
      {showDots && pageCount > 1 && (
        <div
          className="flex items-center justify-center gap-2 mt-5"
          role="group"
          aria-label={`${ariaLabel} page indicators`}
        >
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToPage(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-pressed={i === activePage}
              className="rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                width:        i === activePage ? 28 : 8,
                height:       8,
                background:   i === activePage ? "var(--accent)" : "var(--border)",
                outlineColor: "var(--accent)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
