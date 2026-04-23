"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Carousel from "@/components/ui/Carousel";
import type { Product } from "@/lib/fake-data";

interface ProductShelfProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  carousel?: boolean;
}

export default function ProductShelf({ title, subtitle, products, viewAllLink, carousel = false }: ProductShelfProps) {
  return (
    <section className="page-container py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full" style={{ background: "var(--accent)" }} />
          <div>
            <h2 className="text-lg font-black text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              {title}
            </h2>
            {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
          </div>
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="flex items-center gap-1.5 text-xs font-bold py-2 rounded border transition-all hover:text-white"
            style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--primary)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
          >
            View All <ArrowRight size={13} />
          </Link>
        )}
      </div>

      {carousel ? (
        <Carousel
          slidesPerView={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          gap={12}
          autoplay
          autoplayDelay={4000}
          ariaLabel={`${title} products`}
        >
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
