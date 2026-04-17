"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/fake-data";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);
  const slide = heroSlides[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <Image src={s.image} alt={s.headline} fill className="object-cover" priority={i === 0} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)" }} />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <span className="badge badge-accent mb-3 text-xs">{s.badge}</span>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-lg leading-tight mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                {s.headline}
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-md mb-6">{s.subheading}</p>
              <Link href={s.ctaLink} className="btn-lg btn-primary inline-flex">{s.cta}</Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors" aria-label="Previous">
        <ChevronLeft size={20} color="white" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors" aria-label="Next">
        <ChevronRight size={20} color="white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
