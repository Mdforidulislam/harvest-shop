import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Truck, Wallet, RotateCcw } from "lucide-react";
import HeroSlider from "@/components/shop/HeroSlider";
import NewsletterForm from "@/components/shop/NewsletterForm";
import ProductCard from "@/components/shop/ProductCard";
import FlashDealTimer from "@/components/shop/FlashDealTimer";
import { categories, bestSellers, newArrivals, flashDeals, blogPosts } from "@/lib/fake-data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — Pure Organic Foods",
  description: "Shop 100% organic honey, ghee, mustard oil, dates, nuts and spices from Bangladesh's finest farms.",
};

const trustBadges = [
  { icon: Leaf, label: "100% Organic", sub: "No chemicals, no compromise" },
  { icon: Truck, label: "Home Delivery", sub: "All over Bangladesh" },
  { icon: Wallet, label: "Cash on Delivery", sub: "Pay when you receive" },
  { icon: RotateCcw, label: "Easy Returns", sub: "7-day hassle-free returns" },
];

const flashEndsAt = new Date(Date.now() + 8 * 3600 * 1000 + 23 * 60 * 1000 + 45 * 1000);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSlider />

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Shop by Category</h2>
          <Link href="/category/all" className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all" style={{ color: "var(--primary)" }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x-mandatory">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="snap-start flex-shrink-0 flex flex-col items-center gap-2 group"
              style={{ width: "80px" }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[var(--primary)] transition-all duration-200" style={{ background: "var(--surface-2)" }}>
                <Image src={cat.image} alt={cat.name} width={64} height={64} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold leading-tight" style={{ color: "var(--text)" }}>{cat.name}</p>
                <p className="font-bangla text-[10px]" style={{ color: "var(--text-muted)" }}>{cat.nameBn}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--bg)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary-soft)" }}>
                  <Icon size={20} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{label}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="section-title" style={{ color: "var(--danger)" }}>⚡ Flash Deals</h2>
            <FlashDealTimer endsAt={flashEndsAt} />
          </div>
          <Link href="/category/all?sale=true" className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--accent)" }}>
            All deals <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {flashDeals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Best Sellers */}
      <section style={{ background: "var(--surface-2)" }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Best Sellers</h2>
            <Link href="/category/all?sort=popular" className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--primary)" }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center">
          <Image
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=500&fit=crop"
            alt="Organic farm"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(47,107,58,0.85) 0%,rgba(47,107,58,0.5) 60%,transparent 100%)" }} />
          <div className="relative px-8 md:px-16 max-w-xl">
            <span className="badge badge-accent mb-3">Our Story</span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              From Farm to Your Family Table
            </h3>
            <p className="text-white/80 text-sm mb-5 leading-relaxed">
              We partner directly with 200+ small farms across Bangladesh, cutting out middlemen to deliver fresher products at fairer prices.
            </p>
            <Link href="/about" className="btn-lg btn-accent inline-flex">Learn Our Story</Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">New Arrivals</h2>
          <Link href="/category/all?sort=new" className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--primary)" }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Blog Posts */}
      <section style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">From the Blog</h2>
            <Link href="/blog" className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--primary)" }}>
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={post.cover} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-400" sizes="(max-width:768px) 100vw,33vw" />
                </div>
                <div className="p-4">
                  <span className="badge badge-primary text-xs mb-2">{post.category}</span>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{post.title}</h3>
                  <p className="text-xs line-clamp-2 mb-3" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <Image src={post.authorAvatar} alt={post.author} width={24} height={24} className="rounded-full" />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.author}</span>
                    <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>{formatDate(post.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: "var(--surface-2)" }}>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--primary-soft)" }}>
            <Leaf size={24} style={{ color: "var(--primary)" }} />
          </div>
          <h2 className="section-title mb-2">Join the Harvest Community</h2>
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Get weekly tips on organic living, recipe ideas, and exclusive discount codes straight to your inbox.
          </p>
          <NewsletterForm />
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>No spam. Unsubscribe at any time.</p>
        </div>
      </section>
    </>
  );
}
