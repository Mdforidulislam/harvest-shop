"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Zap, Heart, Share2, ChevronRight, Plus, Minus,
  Check, Truck, ShieldCheck, RotateCcw, Star, Package, MessageSquare,
  BadgeCheck, Info, ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, reviews as allReviews } from "@/lib/fake-data";
import { formatPrice, calcDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import StarRating from "@/components/ui/StarRating";
import ProductShelf from "@/components/shop/ProductShelf";

type Props = { params: Promise<{ slug: string }> };
const tabs = ["Description", "Specifications", "Reviews", "Shipping"] as const;

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Description");
  const [added, setAdded] = useState(false);

  const price = selectedVariant?.price ?? product.salePrice ?? product.price;
  const stock = selectedVariant?.stock ?? product.stock;
  const discount = product.salePrice ? calcDiscount(product.price, product.salePrice) : null;
  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 6);

  function handleAddToCart() {
    dispatch(addToCart({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, qty, variant: selectedVariant?.label, stock }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">

        {/* Breadcrumb - High Contrast */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-12 text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href={`/category/${product.categorySlug}`} className="hover:text-[var(--primary)] transition-colors">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--text)]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24 items-start">

          {/* Gallery Section */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-6">
            <div className="relative rounded-[3rem] overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-2xl shadow-black/[0.03] aspect-square">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-12 md:p-24"
                >
                  <Image src={product.images[activeImg]} alt={product.name} fill priority className="object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-4 overflow-x-auto scrollbar-none py-2 px-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${i === activeImg ? "border-[var(--accent)] scale-105 shadow-xl" : "border-[var(--border)] opacity-60 hover:opacity-100"}`}
                >
                  <Image src={img} alt="Thumb" fill className="object-contain p-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)] bg-[var(--primary-soft)] px-3 py-1 rounded-full">Authentic Source</span>
              {stock > 0 ? (
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--success)]">Harvest Ready</span>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Harvest Sold Out</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[0.9] tracking-tighter text-[var(--text)]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center gap-1.5 text-[#FFB400]">
                <StarRating rating={5} size={14} />
                <span className="text-xs font-black text-[var(--text-muted)] ml-2">({productReviews.length} Verified Harvests)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-5xl font-black text-[var(--accent)] tracking-tighter">{formatPrice(price)}</span>
              {product.salePrice && (
                <span className="text-2xl line-through text-[var(--text-muted)] font-bold opacity-30">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Tactical Actions */}
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex gap-4">
                <div className="flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-2xl h-16 w-40 overflow-hidden shadow-sm">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 h-full flex items-center justify-center hover:bg-[var(--surface-2)] text-[var(--text-muted)]"><Minus size={18} /></button>
                  <span className="flex-1 text-center font-black text-xl text-[var(--text)]">{qty}</span>
                  <button onClick={() => setQty(Math.min(stock, qty + 1))} className="flex-1 h-full flex items-center justify-center hover:bg-[var(--surface-2)] text-[var(--text-muted)]"><Plus size={18} /></button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 rounded-2xl h-16 font-black uppercase tracking-widest text-xs transition-all shadow-2xl active:scale-95 ${added ? "bg-[var(--success)] text-white" : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-[var(--primary)]/20"}`}
                >
                  <ShoppingCart size={18} /> {added ? "In Basket" : "Add to Basket"}
                </button>
              </div>
              <Link href="/checkout" className="flex items-center justify-center gap-3 rounded-2xl h-16 bg-[var(--accent)] text-white font-black text-lg shadow-xl shadow-orange-500/10 hover:bg-[#e67710] active:scale-[0.98]">
                <Zap size={20} fill="currentColor" /> Express Harvest
              </Link>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6 p-8 bg-[var(--surface-2)] rounded-[2.5rem] border border-[var(--border)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--primary)]"><ShieldCheck size={24} /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-[var(--text-muted)]">Lab Checked</span>
                  <span className="text-xs font-black text-[var(--text)]">100% Pure</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--accent)]"><Truck size={24} /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-[var(--text-muted)]">Express</span>
                  <span className="text-xs font-black text-[var(--text)]">Direct Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab System */}
        <div className="mt-32">
          <div className="flex items-center gap-10 border-b border-[var(--border)] mb-12 overflow-x-auto scrollbar-none whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-6 px-1 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tabLineBig" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-[var(--primary)] rounded-full" />}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === "Description" && <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed font-medium max-w-4xl">{product.description}</p>}
            {activeTab === "Specifications" && (
              <div className="max-w-3xl bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/[0.02]">
                {Object.entries(product.specs).map(([k, v], i) => (
                  <div key={k} className={`flex justify-between p-7 ${i !== 0 ? 'border-t border-[var(--border)]' : ''}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{k}</span>
                    <span className="text-sm font-black text-[var(--text)]">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Shelf */}
        <section className="mt-40">
          <ProductShelf title="Our Other Harvests" subtitle="You might also appreciate these" products={related} />
        </section>

      </div>
    </div>
  );
}
