"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/fake-data";

interface ProductShelfProps {
    title: string;
    subtitle?: string;
    products: Product[];
    viewAllLink?: string;
}

export default function ProductShelf({ title, subtitle, products, viewAllLink }: ProductShelfProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 20);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
        }
    };

    useEffect(() => {
        checkScroll();
        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener("scroll", checkScroll);
            return () => ref.removeEventListener("scroll", checkScroll);
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-32">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <Sparkles size={16} className="text-[var(--primary)]" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[var(--primary)]">{subtitle}</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black tracking-tighter text-[var(--text)] leading-[0.9]"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                        {title}
                    </motion.h2>
                </div>

                <div className="flex items-center gap-6">
                    {viewAllLink && (
                        <Link href={viewAllLink} className="hidden md:flex items-center gap-2 text-xs font-black text-[var(--text-muted)] hover:text-[var(--primary)] transition-all uppercase tracking-widest decoration-2 underline-offset-8 hover:underline">
                            Discovery <ArrowRight size={14} />
                        </Link>
                    )}
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`w-14 h-14 rounded-3xl border border-[var(--border)] flex items-center justify-center transition-all shadow-2xl shadow-black/5 active:scale-95 ${canScrollLeft ? "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-white" : "bg-[var(--surface-2)] text-[var(--border)] cursor-not-allowed"}`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`w-14 h-14 rounded-3xl border border-[var(--border)] flex items-center justify-center transition-all shadow-2xl shadow-black/5 active:scale-95 ${canScrollRight ? "bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-white" : "bg-[var(--surface-2)] text-[var(--border)] cursor-not-allowed"}`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Container with "Peek" Effect */}
            <div className="relative group">
                {/* Gradient Fades for depth */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                <div
                    ref={scrollRef}
                    className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-none pb-12 snap-x snap-mandatory px-2 md:px-0"
                    style={{ scrollPadding: '1rem' }}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="min-w-[280px] sm:min-w-[400px] snap-center md:snap-start"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                    {/* View More Card at end */}
                    {viewAllLink && (
                        <div className="min-w-[280px] sm:min-w-[400px] snap-start h-full">
                            <Link href={viewAllLink} className="w-full h-full min-h-[500px] rounded-[2.5rem] border-4 border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-4 text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all group/more">
                                <div className="w-20 h-20 rounded-full bg-[var(--surface-2)] flex items-center justify-center group-hover/more:bg-[var(--primary-soft)] transition-colors">
                                    <ArrowRight size={32} />
                                </div>
                                <span className="font-black uppercase tracking-widest text-sm">See Entire Collection</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {viewAllLink && (
                <div className="mt-8 md:hidden text-center">
                    <Link href={viewAllLink} className="inline-flex items-center gap-2 text-xs font-black text-[var(--primary)] uppercase tracking-widest underline underline-offset-4">
                        Explore Full Store <ArrowRight size={14} />
                    </Link>
                </div>
            )}
        </section>
    );
}
