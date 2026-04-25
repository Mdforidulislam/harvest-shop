"use client";
import { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { products, categories } from "@/lib/fake-data";
import { use } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";
import { formatPrice, calcDiscount } from "@/lib/utils";
import type { Product } from "@/lib/fake-data";

type Props = { params: Promise<{ slug: string }> };

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "new", label: "Newest Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const VIEW_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "compact", label: "Compact" },
];

const FLAG_OPTIONS = [
  { id: "new", label: "New Arrival" },
  { id: "offered", label: "Offered Items" },
  { id: "bestseller", label: "Best Seller" },
];

/* ── Filter card: white surface card with accent underline ── */
function FilterCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm overflow-hidden">
      <h3 className="text-[12px] font-semibold text-[var(--text)] uppercase tracking-widest px-4 py-3 border-b-2 border-[var(--accent)]">
        {title}
      </h3>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* ── Catalog product card ─────────────────────────────── */
function CatalogCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const price = product.salePrice ?? product.price;
  const discount = product.salePrice
    ? calcDiscount(product.price, product.salePrice)
    : null;
  const outOfStock = product.stock <= 0;
  const isOffered = !!product.salePrice;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    dispatch(
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price,
        qty: 1,
        stock: product.stock,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className="group bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300">
      {/* Image area */}
      <div className="relative aspect-square bg-[var(--surface)] overflow-hidden">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative"
          tabIndex={-1}
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Top-left badge: New Arrival > Offered Items */}
        {product.isNew ? (
          <span className="absolute top-2 left-2 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm leading-5">
            New Arrival
          </span>
        ) : isOffered ? (
          <span className="absolute top-2 left-2 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm leading-5">
            Offered Items
          </span>
        ) : null}

        {/* Top-right badge: Save % */}
        {discount !== null && (
          <span className="absolute top-2 right-2 bg-[var(--success)] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm leading-5">
            Save {discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <Link
          href={`/product/${product.slug}`}
          className="text-[13px] font-medium text-[var(--text)] hover:text-[var(--accent)] line-clamp-2 mb-2 leading-snug min-h-[2.4rem] transition-colors"
        >
          {product.name}
        </Link>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[15px] font-bold text-[var(--accent)]">
            {formatPrice(price)}
          </span>
          {product.salePrice && (
            <span className="text-[12px] text-[var(--text-muted)] line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          aria-label={`Add ${product.name} to cart`}
          className={[
            "mt-auto w-full flex items-center justify-center gap-2 rounded border-2 text-[13px] font-semibold transition-all duration-200 min-h-[44px]",
            outOfStock
              ? "border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed"
              : added
              ? "bg-[var(--success)] border-[var(--success)] text-white"
              : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
          ].join(" ")}
        >
          <ShoppingCart size={15} aria-hidden="true" />
          {outOfStock ? "Out of Stock" : added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

/* ── Main page ───────────────────────────────────────── */
export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);

  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("default");
  const [priceMinInput, setPriceMinInput] = useState("");
  const [priceMaxInput, setPriceMaxInput] = useState("");
  const [appliedMin, setAppliedMin] = useState(0);
  const [appliedMax, setAppliedMax] = useState(Infinity);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = categories.find((c) => c.slug === slug);
  const isAll = slug === "all";

  const pageTitle =
    slug === "honey"
      ? "Sundarban Honey"
      : isAll
      ? "All Products"
      : (category?.name ?? slug);

  const baseProducts = useMemo(
    () => (isAll ? products : products.filter((p) => p.categorySlug === slug)),
    [slug, isAll]
  );

  const allBrands = useMemo(() => {
    const set = new Set(
      baseProducts.map((p) => p.brand?.name).filter(Boolean) as string[]
    );
    return Array.from(set).sort();
  }, [baseProducts]);

  const filtered = useMemo(() => {
    let list = [...baseProducts];

    if (appliedMin > 0)
      list = list.filter((p) => (p.salePrice ?? p.price) >= appliedMin);
    if (appliedMax < Infinity)
      list = list.filter((p) => (p.salePrice ?? p.price) <= appliedMax);

    if (selectedBrands.length)
      list = list.filter(
        (p) => p.brand?.name && selectedBrands.includes(p.brand.name)
      );

    if (selectedFlags.includes("new")) list = list.filter((p) => p.isNew);
    if (selectedFlags.includes("offered")) list = list.filter((p) => !!p.salePrice);
    if (selectedFlags.includes("bestseller"))
      list = list.filter((p) => p.isBestSeller);

    switch (sort) {
      case "new":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-asc":
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [baseProducts, appliedMin, appliedMax, selectedBrands, selectedFlags, sort]);

  function applyPrice() {
    setAppliedMin(priceMinInput ? parseInt(priceMinInput) : 0);
    setAppliedMax(priceMaxInput ? parseInt(priceMaxInput) : Infinity);
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }

  function toggleFlag(flag: string) {
    setSelectedFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  }

  function resetAll() {
    setPriceMinInput("");
    setPriceMaxInput("");
    setAppliedMin(0);
    setAppliedMax(Infinity);
    setSelectedBrands([]);
    setSelectedFlags([]);
    setSort("popular");
  }

  /* Shared input / select base classes */
  const inputCls =
    "w-full h-9 px-3 text-[13px] rounded outline-none transition-colors " +
    "bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] " +
    "placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]";

  const selectCls =
    "h-9 px-3 text-[13px] rounded outline-none transition-colors cursor-pointer " +
    "bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] " +
    "focus:border-[var(--accent)]";

  /* Sidebar filter panel (shared between desktop aside + mobile drawer) */
  const FilterPanel = (
    <div className="space-y-4">
      {/* Price Range */}
      <FilterCard title="Price Range">
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              placeholder="Min ৳"
              value={priceMinInput}
              onChange={(e) => setPriceMinInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyPrice()}
              aria-label="Minimum price"
              className={inputCls}
            />
            <input
              type="number"
              min={0}
              placeholder="Max ৳"
              value={priceMaxInput}
              onChange={(e) => setPriceMaxInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyPrice()}
              aria-label="Maximum price"
              className={inputCls}
            />
          </div>
          <button
            onClick={applyPrice}
            className="w-full h-9 bg-[var(--accent)] text-white text-[13px] font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Go
          </button>
        </div>
      </FilterCard>

      {/* Brands */}
      {allBrands.length > 0 && (
        <FilterCard title="Brands">
          <div className="space-y-2.5">
            {allBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2.5 cursor-pointer group/lbl"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 accent-[var(--accent)] cursor-pointer rounded"
                />
                <span className="text-[13px] text-[var(--text)] group-hover/lbl:text-[var(--accent)] transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </FilterCard>
      )}

      {/* Product Flag */}
      <FilterCard title="Product Flag">
        <div className="space-y-2.5">
          {FLAG_OPTIONS.map(({ id, label }) => (
            <label
              key={id}
              className="flex items-center gap-2.5 cursor-pointer group/lbl"
            >
              <input
                type="checkbox"
                checked={selectedFlags.includes(id)}
                onChange={() => toggleFlag(id)}
                className="w-4 h-4 accent-[var(--accent)] cursor-pointer rounded"
              />
              <span className="text-[13px] text-[var(--text)] group-hover/lbl:text-[var(--accent)] transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </FilterCard>

      <button
        onClick={resetAll}
        className="w-full h-10 border border-dashed border-[var(--border)] text-[var(--text-muted)] text-[12px] font-semibold rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
      >
        Reset All Filters
      </button>
    </div>
  );

  const gridCols =
    view === "compact"
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-16">

      {/* ── Page header ─────────────────────────────── */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[18px] font-semibold text-[var(--text)]">
            {pageTitle}
          </h1>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-[13px] text-[var(--text-muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="text-[var(--text)] font-medium" aria-current="page">
                {pageTitle}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">

          {/* ── Desktop sidebar (≥1024px) ────────────── */}
          <aside
            className="hidden lg:block w-[260px] shrink-0 sticky top-4"
            aria-label="Product filters"
          >
            {FilterPanel}
          </aside>

          {/* ── Main content ─────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Top control bar */}
            <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm px-4 py-3 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Mobile / tablet filter trigger */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 h-9 px-3 bg-[var(--accent)] text-white text-[13px] font-semibold rounded"
                  aria-label="Open product filters"
                  aria-expanded={drawerOpen}
                  aria-controls="filter-drawer"
                >
                  <SlidersHorizontal size={15} aria-hidden="true" />
                  Filter
                </button>

                {/* Sort by */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-[13px] text-[var(--text-muted)] hidden sm:block"
                    aria-hidden="true"
                  >
                    Sort By
                  </span>
                  <label htmlFor="sort-select" className="sr-only">
                    Sort products by
                  </label>
                  <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={`${selectCls} w-full sm:w-auto`}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[13px] text-[var(--text-muted)] hidden sm:block">
                  {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                </span>

                {/* View selector */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-[13px] text-[var(--text-muted)]"
                    aria-hidden="true"
                  >
                    View
                  </span>
                  <label htmlFor="view-select" className="sr-only">
                    Select view style
                  </label>
                  <select
                    id="view-select"
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    className={selectCls}
                  >
                    {VIEW_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product grid / empty state */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm">
                <div className="text-5xl mb-4" aria-hidden="true">🍯</div>
                <h2 className="text-[18px] font-semibold text-[var(--text)] mb-2">
                  No Products Found
                </h2>
                <p className="text-[14px] text-[var(--text-muted)] mb-6">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
                <button
                  onClick={resetAll}
                  className="h-10 px-6 bg-[var(--accent)] text-white text-[13px] font-semibold rounded hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-4 ${gridCols}`}
                aria-label={`${filtered.length} products`}
              >
                {filtered.map((p: Product) => (
                  <CatalogCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet bottom-sheet drawer ─────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 lg:hidden"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              id="filter-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-[110] bg-[var(--bg)] rounded-t-2xl max-h-[85vh] flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-4 bg-[var(--surface)] rounded-t-2xl border-b border-[var(--border)] shrink-0">
                <h2 className="text-[16px] font-semibold text-[var(--text)] flex items-center gap-2">
                  <SlidersHorizontal
                    size={17}
                    className="text-[var(--accent)]"
                    aria-hidden="true"
                  />
                  Filter Products
                </h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filter panel"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 p-4 space-y-4">
                {FilterPanel}
              </div>

              {/* Sticky apply button */}
              <div className="px-4 py-4 bg-[var(--surface)] border-t border-[var(--border)] shrink-0">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-full h-11 bg-[var(--accent)] text-white text-[14px] font-semibold rounded hover:opacity-90 transition-opacity"
                >
                  View {filtered.length} Product{filtered.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
