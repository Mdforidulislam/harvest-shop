"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Heart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroSlider from "@/components/shop/HeroSlider";
import ProductShelf from "@/components/shop/ProductShelf";
import NewsletterForm from "@/components/shop/NewsletterForm";
import FlashDealTimer from "@/components/shop/FlashDealTimer";
import { categories, products, bestSellers, flashDeals, blogPosts } from "@/lib/fake-data";

const brands = [
  { name: "Glarvest", logo: "🌿" },
  { name: "Khejuri", logo: "🌴" },
  { name: "Shosti", logo: "🥛" },
  { name: "Honeyraj", logo: "🍯" },
  { name: "Pureroots", logo: "🌱" },
  { name: "Naturals", logo: "🍎" },
];

const flashEndsAt = new Date(Date.now() + 8 * 3600 * 1000 + 45 * 60 * 1000);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const honeyProducts = products.filter(p => p.categorySlug === 'honey');
  const datesProducts = products.filter(p => p.categorySlug === 'dates');
  const spicesProducts = products.filter(p => p.categorySlug === 'spices');

  return (
    <div className="bg-[var(--bg)] min-h-screen">

      {/* Hero Section */}
      <HeroSlider />

      {/* Featured Categories */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 py-16 md:py-24"
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-[var(--text)]">Discover Purity</h2>
            <p className="text-sm md:text-base font-medium text-[var(--text-muted)] mt-2">Explore our farm-fresh organic collections</p>
          </div>
          <Link href="/category/all" className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--primary)] hover:translate-x-1 transition-transform">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-none pb-6">
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants} className="shrink-0">
              <Link href={`/category/${cat.slug}`} className="group flex flex-col items-center gap-4">
                <div className="w-24 h-24 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--primary)] group-hover:shadow-2xl group-hover:shadow-[var(--primary)]/10 transition-all p-4 md:p-8">
                  <div className="relative w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">
                    <Image src={cat.image} alt={cat.name} fill className="object-contain" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">{cat.name}</p>
                  <p className="text-[8px] font-bold opacity-30 uppercase mt-0.5">{cat.count} Items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Top Sellers */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <ProductShelf
          title="Top Rated Harvest"
          subtitle="Customer favorites directly from the roots"
          products={bestSellers}
          viewAllLink="/category/all?sort=popular"
        />
      </motion.div>

      {/* Middle Banner Section */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden group cursor-pointer"
          >
            <Image src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800" alt="Banner" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />
            <div className="absolute inset-x-8 bottom-8">
              <span className="bg-[#F58220] text-white text-[10px] font-black uppercase px-3 py-1 rounded mb-3 inline-block">Flash Offer</span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Organic Sunderban Honey</h3>
              <p className="text-white/70 text-sm font-medium">Get 20% off on your first order this month.</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden group cursor-pointer"
          >
            <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" alt="Banner" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />
            <div className="absolute inset-x-8 bottom-8">
              <span className="bg-[var(--primary)] text-white text-[10px] font-black uppercase px-3 py-1 rounded mb-3 inline-block">Wholesale</span>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Bulk Mixed Nuts</h3>
              <p className="text-white/70 text-sm font-medium">Special prices for restaurants & retail bulk.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Honey Grid */}
      <ProductShelf
        title="Royal Sunderban Honey"
        subtitle="100% Raw, Unfiltered & Lab-Certified"
        products={honeyProducts}
        viewAllLink="/category/honey"
      />

      {/* Flash Counter Banner */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[var(--primary)] rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left text-white max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Zap size={14} fill="white" /> LIMITED TIME OFFER
              </div>
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Hurry! The <span className="text-[#F58220]">Harvest Dealy</span> is Ending Soon
              </h2>
              <FlashDealTimer endsAt={flashEndsAt} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {flashDeals.slice(0, 2).map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-[2rem] flex items-center gap-5 group hover:bg-white/20 transition-all">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-xl">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white group-hover:text-[#F58220] transition-colors">{p.name}</h4>
                    <p className="text-lg font-black text-white mt-1">৳{p.salePrice || p.price}</p>
                    <div className="flex items-center gap-1 text-[8px] font-black uppercase text-white/40 mt-1">
                      <ShieldCheck size={10} /> Certified Pure
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
        </motion.div>
      </section>

      {/* Brands Bar */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-y border-[var(--border)]">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          {brands.map(b => (
            <div key={b.name} className="flex items-center gap-3">
              <span className="text-3xl md:text-5xl">{b.logo}</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[var(--text)]">{b.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spices */}
      <ProductShelf
        title="Spices of Bengal"
        subtitle="Hand-picked & stone-ground manually"
        products={spicesProducts}
        viewAllLink="/category/spices"
      />

      {/* Newsletter */}
      <section className="bg-[var(--surface-2)] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[var(--surface)] p-10 md:p-20 rounded-[4rem] border border-[var(--border)] shadow-2xl flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
            <div className="flex-1 space-y-8 relative z-10">
              <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--primary)] flex items-center justify-center text-white shadow-xl shadow-[var(--primary)]/20">
                <Sparkles size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text)] leading-none">Stay Rooted to <br /> <span className="text-[var(--primary)]">Pure Health.</span></h2>
              <p className="text-lg text-[var(--text-muted)] font-medium leading-relaxed max-w-lg">Join 15,000+ families receiving monthly harvest updates, organic life Hacks, and exclusive community member prices.</p>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center"><ArrowRight size={18} /></div>
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--text)]">Weekly Recipes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center"><ArrowRight size={18} /></div>
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--text)]">Flash Events</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative z-10">
              <div className="bg-[var(--surface-2)] p-1 rounded-3xl">
                <NewsletterForm />
              </div>
            </div>

            {/* Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-[0.03] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F58220] opacity-[0.03] rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>

    </div>
  );
}
