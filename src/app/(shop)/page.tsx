"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, ShieldCheck, Truck, RotateCcw, Phone, ChevronRight } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import HeroSlider from "@/components/shop/HeroSlider";
import ProductShelf from "@/components/shop/ProductShelf";
import FlashDealTimer from "@/components/shop/FlashDealTimer";
import TopSellingProducts from "@/components/shop/TopSellingProducts";
import type { TopProduct } from "@/components/shop/TopSellingProducts";
import CustomerReviews from "@/components/shop/CustomerReviews";
import { categories, products, bestSellers, flashDeals } from "@/lib/fake-data";

const flashEndsAt = new Date(Date.now() + 8 * 3600 * 1000 + 45 * 60 * 1000);

const trustItems = [
  { icon: Truck, title: "Fast Delivery", desc: "Dhaka 24h, nationwide 3-5 days" },
  { icon: ShieldCheck, title: "100% Authentic", desc: "Verified quality products" },
  { icon: RotateCcw, title: "Easy Return", desc: "7-day hassle-free returns" },
  { icon: Phone, title: "24/7 Support", desc: "Always here to help you" },
];

export default function HomePage() {
  const honeyProducts = products.filter(p => p.categorySlug === "honey");
  const spicesProducts = products.filter(p => p.categorySlug === "spices");
  const newArrivals = products.filter(p => p.featured).slice(0, 10);

  const topSelling: TopProduct[] = bestSellers.slice(0, 4).map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.name,
    image: p.images[0],
    price: p.salePrice ?? p.price,
    oldPrice: p.salePrice ? p.price : undefined,
    savings: p.salePrice ? p.price - p.salePrice : undefined,
    badge: p.isBestSeller ? "best_selling" as const : undefined,
    stock: p.stock,
  }));

  return (
    <div className=" page-container bg-[var(--bg)] min-h-screen">

      {/* Hero */}
      <HeroSlider />

      {/* Category Grid */}
      <section className=" py-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full" style={{ background: "var(--accent)" }} />
            <h2 className="text-lg font-black text-[var(--text)]">Shop by Category</h2>
          </div>
          <Link href="/category/all" className="text-xs font-semibold flex items-center gap-1 hover:underline" style={{ color: "var(--primary)" }}>
            View All <ChevronRight size={13} />
          </Link>
        </div>
        <Carousel
          slidesPerView={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          gap={12}
          ariaLabel="Product categories"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-2 bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6 hover:border-[var(--accent)] hover:shadow-md transition-all"
            >
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image src={cat.image} alt={cat.name} fill className="object-contain group-hover:scale-110 transition-transform duration-200" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-center text-[var(--text-muted)] group-hover:text-[var(--primary)] leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </Carousel>
      </section>

     {/* Top Selling Products */}
    <section className=" py-4">
      <TopSellingProducts products={topSelling} />
    </section>

      {/* Flash Deals Banner */}
      <section className=" py-2">
        <div className="rounded-lg overflow-hidden p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "var(--primary)" }}>
          <div className="text-white text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} fill="white" style={{ color: "var(--accent)" }} />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Flash Sale</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3">Today&apos;s Hot Deals!</h2>
            <FlashDealTimer endsAt={flashEndsAt} />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            {flashDeals.slice(0, 2).map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-3 flex items-center gap-3 transition-colors border border-white/20 group"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-bold line-clamp-2 leading-tight">{p.name}</p>
                  <p className="font-black mt-1" style={{ color: "var(--accent)" }}>৳{p.salePrice || p.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/category/all?sort=sale"
            className="shrink-0 px-6 py-3 rounded-lg font-bold text-sm text-white border border-white/30 hover:bg-white hover:text-[var(--primary)] transition-all whitespace-nowrap"
          >
            All Deals →
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <ProductShelf
        title="Recommended Products"
        subtitle="Products we recommend for you"
        products={bestSellers}
        viewAllLink="/category/all?sort=popular"
        carousel
      />



      {/* Promotional Banners */}
      <section className=" py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden h-44 md:h-52 group cursor-pointer">
            <Image src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="inline-block text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-2 w-fit" style={{ background: "var(--accent)" }}>
                Special Offer
              </span>
              <h3 className="text-white text-xl font-black mb-1">Organic Honey</h3>
              <p className="text-white/70 text-xs mb-3">Up to 20% off — Limited stock</p>
              <Link href="/category/honey" className="text-white text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                Shop Now <ArrowRight size={12} />
              </Link>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden h-44 md:h-52 group cursor-pointer">
            <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="inline-block text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-2 w-fit" style={{ background: "var(--primary)" }}>
                Wholesale
              </span>
              <h3 className="text-white text-xl font-black mb-1">Bulk Nuts & Seeds</h3>
              <p className="text-white/70 text-xs mb-3">Best prices for bulk orders</p>
              <Link href="/category/nuts" className="text-white text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                Shop Now <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <ProductShelf
        title="New Arrivals"
        subtitle="Fresh products just added"
        products={newArrivals}
        viewAllLink="/category/all?sort=new"
      />

      {/* Honey Collection */}
      <ProductShelf
        title="Pure Honey Collection"
        subtitle="100% raw & unfiltered"
        products={honeyProducts}
        viewAllLink="/category/honey"
      />

      {/* Spices */}
      <ProductShelf
        title="Spices of Bengal"
        subtitle="Hand-picked & stone-ground"
        products={spicesProducts}
        viewAllLink="/category/spices"
      />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Newsletter Banner */}
      <section className="py-8 md:py-12">
        <div className="rounded-lg p-6 md:p-12 text-center" style={{ background: "var(--primary)" }}>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Stay Updated!</h2>
          <p className="text-white/70 text-sm mb-6">Subscribe to get the latest deals and new arrivals.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-11 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button
              type="submit"
              className="h-11 px-6 rounded-lg font-bold text-white text-sm hover:opacity-90 transition-opacity sm:shrink-0 w-full sm:w-auto"
              style={{ background: "var(--accent)" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
