"use client";
import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, List, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories } from "@/lib/fake-data";
import { use } from "react";

type Props = { params: Promise<{ slug: string }> };

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const category = categories.find((c) => c.slug === slug);
  const isAll = slug === "all";

  const filtered = useMemo(() => {
    let list = isAll ? products : products.filter((p) => p.categorySlug === slug);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    const price = (p: typeof products[0]) => p.salePrice ?? p.price;
    list = list.filter((p) => price(p) >= priceMin && price(p) <= priceMax);
    switch (sort) {
      case "new": return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "price-asc": return [...list].sort((a, b) => price(a) - price(b));
      case "price-desc": return [...list].sort((a, b) => price(b) - price(a));
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      default: return [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [slug, isAll, sort, priceMin, priceMax, minRating, inStockOnly]);

  const title = isAll ? "All Products" : category?.name ?? slug;

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Categories</h3>
        <div className="space-y-1">
          <Link href="/category/all" className={`block px-3 py-2 rounded-lg text-sm transition-colors ${isAll ? "font-semibold" : ""}`} style={{ background: isAll ? "var(--primary-soft)" : "transparent", color: isAll ? "var(--primary)" : "var(--text)" }}>
            All Products
          </Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/category/${c.slug}`} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--surface-2)]" style={{ background: slug === c.slug ? "var(--primary-soft)" : "transparent", color: slug === c.slug ? "var(--primary)" : "var(--text)" }}>
              <span>{c.icon} {c.name}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{c.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Price Range</h3>
        <div className="flex gap-2 items-center mb-2">
          <input type="number" value={priceMin} onChange={(e) => setPriceMin(+e.target.value)} min={0} className="input text-xs h-9 text-center w-24" style={{ fontSize: "12px" }} />
          <span style={{ color: "var(--text-muted)" }}>—</span>
          <input type="number" value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} min={0} className="input text-xs h-9 text-center w-24" style={{ fontSize: "12px" }} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Min Rating</h3>
        <div className="space-y-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setMinRating(r)} className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${minRating === r ? "font-semibold" : ""}`} style={{ background: minRating === r ? "var(--primary-soft)" : "transparent", color: minRating === r ? "var(--primary)" : "var(--text)" }}>
              {r === 0 ? "Any rating" : `${r}★ & above`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="inStock" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-4 h-4 accent-[var(--primary)]" />
        <label htmlFor="inStock" className="text-sm cursor-pointer" style={{ color: "var(--text)" }}>In stock only</label>
      </div>

      <button onClick={() => { setSort("popular"); setPriceMin(0); setPriceMax(2000); setMinRating(0); setInStockOnly(false); }} className="btn-md btn-secondary w-full text-xs">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: "var(--text)" }}>{title}</span>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="card p-4 sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{title}</h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Showing {filtered.length} products</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setFilterOpen(true)} className="lg:hidden btn-md btn-secondary gap-2 text-xs">
                <SlidersHorizontal size={14} /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input h-9 text-xs w-44"
              >
                {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="flex gap-1">
                <button onClick={() => setView("grid")} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${view === "grid" ? "bg-[var(--primary-soft)]" : "hover:bg-[var(--surface-2)]"}`} aria-label="Grid view">
                  <Grid3X3 size={16} style={{ color: view === "grid" ? "var(--primary)" : "var(--text-muted)" }} />
                </button>
                <button onClick={() => setView("list")} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${view === "list" ? "bg-[var(--primary-soft)]" : "hover:bg-[var(--surface-2)]"}`} aria-label="List view">
                  <List size={16} style={{ color: view === "list" ? "var(--primary)" : "var(--text-muted)" }} />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🌿</p>
              <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>No products found</h2>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Try adjusting your filters</p>
              <button onClick={() => { setSort("popular"); setPriceMin(0); setPriceMax(2000); setMinRating(0); setInStockOnly(false); }} className="btn-md btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className={`grid gap-4 ${view === "grid" ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setFilterOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto" style={{ background: "var(--surface)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)]">
                <X size={16} />
              </button>
            </div>
            <FilterPanel />
            <button onClick={() => setFilterOpen(false)} className="btn-lg btn-primary w-full mt-4">Apply Filters</button>
          </div>
        </>
      )}
    </div>
  );
}
