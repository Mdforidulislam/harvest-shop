"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/lib/fake-data";

/* Floating geometric block config */
const blocks = [
  { w: 80,  h: 80,  top: "8%",   left: "4%",  rotate: 20,  color: "#f48721", opacity: 0.9, delay: 0 },
  { w: 52,  h: 52,  top: "14%",  left: "28%", rotate: -15, color: "#ffffff", opacity: 0.15, delay: 0.1 },
  { w: 64,  h: 64,  top: "60%",  left: "2%",  rotate: 35,  color: "#f48721", opacity: 0.5, delay: 0.2 },
  { w: 44,  h: 44,  top: "72%",  left: "22%", rotate: -25, color: "#ffffff", opacity: 0.12, delay: 0.15 },
  { w: 96,  h: 96,  top: "5%",   left: "68%", rotate: -12, color: "#0a4a82", opacity: 1,   delay: 0.05 },
  { w: 56,  h: 56,  top: "55%",  left: "72%", rotate: 22,  color: "#f48721", opacity: 0.7, delay: 0.25 },
  { w: 36,  h: 36,  top: "35%",  left: "88%", rotate: -40, color: "#ffffff", opacity: 0.1, delay: 0.3 },
  { w: 70,  h: 70,  top: "78%",  left: "82%", rotate: 15,  color: "#0a4a82", opacity: 0.8, delay: 0.1 },
];

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
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = heroSlides[current];

  const textVariants = {
    enter:  { opacity: 0, y: 24 },
    center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    exit:   { opacity: 0, y: -16, transition: { duration: 0.3 } },
  };

  const imgVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.92 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit:   (d: number) => ({ opacity: 0, x: d < 0 ? 80 : -80, scale: 0.92, transition: { duration: 0.35 } }),
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">

        {/* ── Left: Slider ── */}
        <div className="lg:w-[72%]">
          <div
            className="relative rounded-2xl overflow-hidden h-full"
            style={{
              background: "linear-gradient(135deg, #042b50 0%, #0a3d70 60%, #0d4d8a 100%)",
              minHeight: 420,
            }}
          >
            {/* Floating background blocks (static decoration) */}
            {blocks.map((b, i) => (
              <div
                key={i}
                className="absolute rounded-xl pointer-events-none"
                style={{
                  width: b.w,
                  height: b.h,
                  top: b.top,
                  left: b.left,
                  background: b.color,
                  opacity: b.opacity,
                  transform: `rotate(${b.rotate}deg)`,
                  borderRadius: 12,
                }}
              />
            ))}

            {/* Grid: text left | product right */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center h-full min-h-[420px] md:min-h-[460px]">

              {/* ── LEFT: Text content ── */}
              <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col gap-5">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`text-${current}`}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-5"
                  >
                    {/* Badge */}
                    <span
                      className="inline-flex items-center gap-1.5 self-start text-white text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: "#f48721" }}
                    >
                      <Tag size={12} />
                      {slide.badge}
                    </span>

                    {/* Headline */}
                    <h1
                      className="text-3xl md:text-5xl font-black text-white leading-tight"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {slide.headline}
                    </h1>

                    {/* Sub */}
                    <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm">
                      {slide.subheading}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link
                        href={slide.ctaLink}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                        style={{ background: "#f48721" }}
                      >
                        <ShoppingBag size={16} />
                        {slide.cta}
                      </Link>
                      <Link
                        href="/category/all"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white border border-white/30 hover:bg-white/10 transition-all"
                      >
                        View All Deals
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide dots + arrows */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={prev}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex gap-2">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="transition-all duration-400 rounded-full h-2"
                        style={{
                          width: i === current ? 28 : 8,
                          background: i === current ? "#f48721" : "rgba(255,255,255,0.3)",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* ── RIGHT: Product collage + 3D floating blocks ── */}
              <div className="relative flex items-center justify-center h-[260px] md:h-full py-6 md:py-0 overflow-hidden">
                {/* Large tilted accent block behind image */}
                <div
                  className="absolute rounded-2xl"
                  style={{
                    width: 280,
                    height: 280,
                    background: "rgba(244,135,33,0.15)",
                    transform: "rotate(-12deg)",
                    borderRadius: 24,
                  }}
                />
                {/* Second block */}
                <div
                  className="absolute rounded-2xl"
                  style={{
                    width: 220,
                    height: 220,
                    background: "rgba(255,255,255,0.06)",
                    transform: "rotate(8deg)",
                    borderRadius: 24,
                    top: "15%",
                    right: "10%",
                  }}
                />

                {/* Product image — floating with drop shadow */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`img-${current}`}
                    custom={direction}
                    variants={imgVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative z-10"
                    style={{
                      width: 280,
                      height: 280,
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.headline}
                      fill
                      priority
                      className="object-cover rounded-2xl"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Small floating accent cubes around the image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute top-[10%] right-[8%] w-10 h-10 rounded-xl z-20"
                  style={{ background: "#f48721", opacity: 0.9, transform: "rotate(18deg)" }}
                />
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-[12%] left-[8%] w-8 h-8 rounded-lg z-20"
                  style={{ background: "#ffffff", opacity: 0.2, transform: "rotate(-22deg)" }}
                />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[20%] right-[6%] w-6 h-6 rounded-lg z-20"
                  style={{ background: "#f48721", opacity: 0.6, transform: "rotate(30deg)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Two stacked promo cards ── */}
        <div className="flex flex-row sm:flex-row lg:flex-col gap-4 lg:w-[28%]">

          {/* Card 1 — Mustard Oil */}
          <Link
            href="/category/oils"
            className="relative flex-1 h-36 lg:h-auto rounded-xl overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&h=240&fit=crop"
              alt="Mustard Oil"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span
                className="inline-block text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-1.5 w-fit"
                style={{ background: "var(--accent)" }}
              >
                25% OFF
              </span>
              <h3 className="text-white text-sm font-black leading-tight">Artisan Cold-Pressed Mustard Oil</h3>
            </div>
          </Link>

          {/* Card 2 — Honey */}
          <Link
            href="/category/honey"
            className="relative flex-1 h-36 lg:h-auto rounded-xl overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1558642891-54be180ea339?w=600&h=240&fit=crop"
              alt="Honey"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span
                className="inline-block text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-1.5 w-fit"
                style={{ background: "var(--primary)" }}
              >
                Best Seller
              </span>
              <h3 className="text-white text-sm font-black leading-tight">Sundarban Organic Raw Honey</h3>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
