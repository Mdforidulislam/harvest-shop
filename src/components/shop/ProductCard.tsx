"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Sparkles, Star, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { formatPrice, calcDiscount } from "@/lib/utils";
import type { Product } from "@/lib/fake-data";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);

  const price = product.salePrice ?? product.price;
  const discount = product.salePrice ? calcDiscount(product.price, product.salePrice) : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price,
      qty: 1,
      stock: product.stock
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price,
      qty: 1,
      stock: product.stock
    }));
    router.push("/checkout");
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price,
      salePrice: product.salePrice
    }));
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] h-full flex flex-col"
    >
      {/* Dynamic Badges */}
      <div className="absolute top-5 left-5 flex flex-col gap-2 z-10 pointer-events-none">
        {discount && (
          <span className="bg-[#E91E63] text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg">
            -{discount}%
          </span>
        )}
        {product.isBestSeller && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--primary)] text-white text-[9px] font-black px-4 py-1 rounded-full shadow-lg uppercase tracking-wider"
          >
            Best Seller
          </motion.span>
        )}
      </div>

      {/* Wishlist Button - Minimalist */}
      <button
        onClick={handleWishlist}
        className={`absolute top-5 right-5 w-11 h-11 rounded-full backdrop-blur-md border flex items-center justify-center transition-all z-10 ${isWishlisted
            ? "bg-red-500 border-red-500 text-white shadow-xl shadow-red-500/20"
            : "bg-white/90 border-[#EEE] text-[#999] hover:text-red-500 hover:border-red-500 shadow-sm"
          }`}
      >
        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2.5} />
      </button>

      {/* Hero Image Section */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] block p-8 bg-[var(--surface-2)] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width:640px) 50vw, 350px"
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
          priority={product.featured}
        />

        {/* Quick View Aesthetic */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="w-full h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase text-black shadow-2xl border border-white/50">
            <Eye size={14} /> Discovery Detail
          </div>
        </div>
      </Link>

      {/* Comprehensive Info Section */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">{product.category}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#FFB400]">
            <Star size={10} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="text-lg md:text-xl font-black text-[var(--text)] mb-4 line-clamp-2 hover:text-[var(--primary)] transition-colors leading-tight min-h-[3rem]"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {product.name}
        </Link>

        <div className="flex items-end justify-between mb-8">
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black text-[var(--accent)] tracking-tighter">
              {formatPrice(price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-[var(--text-muted)] line-through font-bold opacity-30">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-[var(--text-muted)] opacity-40">
            <ShieldCheck size={14} className="text-[var(--primary)]" /> Pure
          </div>
        </div>

        {/* Tactical Buttons */}
        <div className="mt-auto flex flex-col gap-3">
          <button
            onClick={handleBuyNow}
            className="w-full h-14 rounded-2xl bg-[var(--accent)] text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/10 hover:bg-[#e67710] hover:-translate-y-1 transition-all active:scale-95"
          >
            Direct Harvest
          </button>
          <button
            onClick={handleAddToCart}
            className={`w-full h-14 rounded-2xl border-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 ${added
                ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-2xl shadow-green-900/10"
                : "border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
          >
            {added ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <ShieldCheck size={18} /> In Basket
              </motion.div>
            ) : (
              <>
                <ShoppingBag size={18} /> Add To Basket
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
