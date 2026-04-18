"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/lib/fake-data";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.8 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  const slide = heroSlides[current];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Main Slider */}
        <div className="flex-1 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl bg-[var(--surface)] min-h-[400px] md:min-h-[520px] lg:min-h-[580px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:from-black/70 md:via-black/30 md:to-transparent" />

              <div className="absolute inset-0 flex items-center p-8 md:p-20">
                <div className="max-w-xl md:max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <span className="bg-[#F58220] text-white text-[10px] md:text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-xl">
                      {slide.badge}
                    </span>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white drop-shadow-2xl"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {slide.headline}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/80 text-base md:text-xl font-medium mb-10 max-w-lg leading-relaxed"
                  >
                    {slide.subheading}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link href={slide.ctaLink} className="inline-flex items-center gap-4 bg-[var(--primary)] text-white px-10 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-[var(--primary-hover)] hover:shadow-2xl hover:shadow-[var(--primary)]/30 hover:-translate-y-1 transition-all active:scale-95 group">
                      {slide.cta}
                      <Play size={16} fill="white" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-10 left-10 md:left-20 flex gap-4 z-20">
            <button onClick={prev} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-12 right-10 md:right-20 flex gap-3 z-20">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-500 rounded-full h-1.5 ${i === current ? "w-12 bg-white" : "w-1.5 bg-white/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Vertical Promo Banners */}
        <div className="lg:w-[340px] xl:w-[420px] flex flex-col gap-6">
          <div className="flex-1 relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl min-h-[200px]">
            <Image
              src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&h=400&fit=crop"
              alt="Promo"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <span className="text-[10px] font-black text-[#F58220] uppercase tracking-[0.2em] mb-2">25% Discount Today</span>
              <h3 className="text-2xl font-black text-white leading-tight mb-2">Artisan Cold-Pressed Mustard Oil</h3>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Limited Batch Harvest</p>
            </div>
          </div>
          <div className="flex-1 relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl min-h-[200px]">
            <Image
              src="https://images.unsplash.com/photo-1558642891-54be180ea339?w=600&h=400&fit=crop"
              alt="Promo"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-8 bottom-8 p-10 flex flex-col justify-end">
              <span className="text-[10px] font-black text-[#F58220] uppercase tracking-[0.2em] mb-2">Community Pick</span>
              <h3 className="text-2xl font-black text-white leading-tight mb-2">Sundarban Organic Raw Honey</h3>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Verified Purity 100%</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
