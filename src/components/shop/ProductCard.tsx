"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/fake-data";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const price = product.salePrice ?? product.price;
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;
  const outOfStock = product.stock <= 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    dispatch(addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price,
      qty: 1,
      stock: product.stock,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <motion.div className="group bg-[var(--surface)] rounded-lg border border-[var(--border)] overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative p-5 aspect-square bg-[var(--surface)] flex items-center justify-center">
        <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Top-left: New Arrival */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[var(--accent)] text-white text-[11px] font-semibold px-2.5 py-1 rounded">
            New Arrival
          </span>
        )}

        {/* Top-right: Discount */}
        {discount && (
          <span className="absolute top-2 right-2 bg-[var(--success)] text-white text-[11px] font-semibold px-2.5 py-1 rounded">
            Save {discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pb-4 flex flex-col flex-1">
        <Link
          href={`/product/${product.slug}`}
          className="text-[15px] text-[var(--text)] hover:text-[var(--accent)] line-clamp-1 mb-2"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[15px] font-bold text-[var(--accent)]">
            {formatPrice(price)}
          </span>
          {product.salePrice && (
            <span className="text-[13px] text-[var(--text-muted)] line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="btn btn-md btn-accent flex-1"
            aria-label={`Buy ${product.name} now`}
          >
            Buy Now
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            aria-label="Add to cart"
            className={`btn h-10 w-10 shrink-0 border ${
              outOfStock
                ? "border-[var(--danger)] text-[var(--danger)]"
                : added
                ? "bg-[var(--success)] border-[var(--success)] text-white"
                : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            }`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}