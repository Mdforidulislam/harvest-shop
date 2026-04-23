"use client";
import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, Grid3X3, List, ChevronRight, X, LayoutGrid, Filter, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories } from "@/lib/fake-data";
import { use } from "react";

type Props = { params: Promise<{ slug: string }> };

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "new", label: "Newest Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(3000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const category = categories.find((c) => c.slug === slug);
  const isAll = slug === "all";

  const filtered = useMemo(() => {
    let list = isAll ? products : products.filter((p) => p.categorySlug === slug);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    const priceValue = (p: typeof products[0]) => p.salePrice ?? p.price;
    list = list.filter((p) => priceValue(p) >= priceMin && priceValue(p) <= priceMax);

    const sorted = [...list];
    switch (sort) {
      case "new": sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "price-asc": sorted.sort((a, b) => priceValue(a) - priceValue(b)); break;
      case "price-desc": sorted.sort((a, b) => priceValue(b) - priceValue(a)); break;
      case "rating": sorted.sort((a, b) => b.rating - a.rating); break;
      default: sorted.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return sorted;
  }, [slug, isAll, sort, priceMin, priceMax, inStockOnly]);

  const title = isAll ? "Fresh Supermarket" : category?.name ?? slug;

  const FilterPanel = () => (
    <div className="space-y-10">
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-6 ml-2">Shop Categories</h3>
        <div className="flex flex-col gap-1.5">
          <Link
            href="/category/all"
            className={`flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black transition-all ${isAll ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20" : "text-[var(--text)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"}`}
          >
            <span>Everything Harvested</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isAll ? "bg-white/20" : "bg-[var(--surface-2)]"}`}>{products.length}</span>
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black transition-all ${slug === c.slug ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20" : "text-[var(--text)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"}`}
            >
              <span className="flex items-center gap-3">
                <span className="opacity-60">{c.icon}</span>
                {c.name}
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${slug === c.slug ? "bg-white/20" : "bg-[var(--surface-2)]"}`}>{c.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-6 ml-2">Market Price (৳)</h3>
        <div className="space-y-6 px-2">
          <div className="flex gap-3 items-center">
            <input type="number" value={priceMin} onChange={(e) => setPriceMin(+e.target.value)} className="w-full h-11 px-4 bg-[var(--surface-2)] border-none rounded-xl text-xs font-black text-[var(--text)] outline-none" />
            <span className="text-[var(--border)]">—</span>
            <input type="number" value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} className="w-full h-11 px-4 bg-[var(--surface-2)] border-none rounded-xl text-xs font-black text-[var(--text)] outline-none" />
          </div>
          <input type="range" min="0" max="3000" step="50" value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} className="w-full h-1.5 bg-[var(--border)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]" />
        </div>
      </div>

      <div className="bg-[var(--surface-2)] p-6 rounded-[2rem]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-[var(--text)] uppercase tracking-widest cursor-pointer" htmlFor="stock_switch">Ready Harvest</label>
          <input id="stock_switch" type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-5 h-5 accent-[var(--primary)] rounded-lg cursor-pointer" />
        </div>
      </div>

      <button
        onClick={() => { setSort("popular"); setPriceMin(0); setPriceMax(3000); setInStockOnly(false); }}
        className="w-full h-14 rounded-2xl border-2 border-dashed border-[var(--border)] text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
      >
        Reset Market Filter
      </button>
    </div>
  );

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-20">

      {/* Editorial Category Banner */}
      <div className="bg-[var(--primary)] text-white py-20 md:py-32 relative overflow-hidden">
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Certified Organic
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85]"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-white/70 font-medium text-base md:text-xl leading-relaxed"
          >
            Harvesting {filtered.length} pure selections today. All items are ethically sourced and handled with extreme care for your wellness.
          </motion.p>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="page-container -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-[var(--surface)] p-10 rounded-[2.5rem] border border-[var(--border)] shadow-2xl shadow-black/5 sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {/* Control Bar */}
            <div className="bg-[var(--surface)] p-5 md:p-8 rounded-[2.5rem] border border-[var(--border)] shadow-2xl shadow-black/5 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <button onClick={() => setFilterOpen(true)} className="lg:hidden flex items-center gap-3 px-6 h-14 rounded-2xl bg-[var(--accent)] text-white text-xs font-black uppercase shadow-xl shadow-orange-500/10">
                  <SlidersHorizontal size={16} /> Market Filter
                </button>
                <div className="flex items-center gap-4">
                  <p className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest hidden md:block">Arrange By</p>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-[var(--surface-2)] border-none rounded-xl px-5 h-12 text-[10px] font-black uppercase tracking-widest text-[var(--text)] outline-none"
                  >
                    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex bg-[var(--surface-2)] p-1.5 rounded-2xl">
                <button onClick={() => setView('grid')} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${view === 'grid' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-xl' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                  <Grid3X3 size={20} />
                </button>
                <button onClick={() => setView('list')} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${view === 'list' ? 'bg-[var(--surface)] text-[var(--accent)] shadow-xl' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Product Rendering */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 bg-[var(--surface)] rounded-[3rem] border border-[var(--border)]">
                  <div className="text-7xl mb-6">🏜️</div>
                  <h3 className="text-3xl font-black mb-3">Field Empty</h3>
                  <p className="text-[var(--text-muted)] font-medium mb-10">No harvests match your current filter settings.</p>
                  <button onClick={() => { setSort("popular"); setPriceMin(0); setPriceMax(3000); }} className="h-14 px-10 bg-[var(--accent)] text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-orange-500/10">Clear Selections</button>
                </motion.div>
              ) : (
                <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {filtered.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm lg:hidden" onClick={() => setFilterOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm z-[110] bg-[var(--surface)] p-10 overflow-y-auto lg:hidden">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-3xl font-black tracking-tight">Market Filters</h3>
                <button onClick={() => setFilterOpen(false)} className="w-12 h-12 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text)]"><X size={24} /></button>
              </div>
              <FilterPanel />
              <button onClick={() => setFilterOpen(false)} className="w-full h-16 bg-[var(--primary)] text-white rounded-2xl font-black text-xs uppercase tracking-widest mt-12 shadow-2xl">Confirm Harvest View ({filtered.length})</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
