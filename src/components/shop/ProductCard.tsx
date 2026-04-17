"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { formatPrice, calcDiscount } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/lib/fake-data";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch     = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));
  const [added, setAdded] = useState(false);

  const price    = product.salePrice ?? product.price;
  const discount = product.salePrice ? calcDiscount(product.price, product.salePrice) : null;

  function handleAddToCart() {
    dispatch(addToCart({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, qty: 1, stock: product.stock }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(toggleWishlist({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, salePrice: product.salePrice }));
  }

  return (
    <div className="card group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square" style={{ background: "var(--surface-2)" }}>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-108"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {discount && <span className="badge badge-accent text-[11px] font-bold">{discount}% OFF</span>}
          {product.isNew && !discount && <span className="badge badge-primary text-[11px]">New</span>}
          {product.isBestSeller && !discount && <span className="badge badge-success text-[11px]">Best Seller</span>}
        </div>

        {/* Hover actions */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 translate-x-10 group-hover:translate-x-0 transition-transform duration-200">
          <button
            onClick={handleWishlist}
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-colors"
            style={{ background: isWishlisted ? "#fee2e2" : "var(--surface)" }}
            aria-label="Wishlist"
          >
            <Heart size={14} fill={isWishlisted ? "var(--danger)" : "none"} color={isWishlisted ? "var(--danger)" : "var(--text-muted)"} strokeWidth={2} />
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md hover:bg-[var(--primary-soft)] transition-colors"
            style={{ background: "var(--surface)" }}
            aria-label="View product"
          >
            <Eye size={14} color="var(--text-muted)" strokeWidth={2} />
          </Link>
        </div>

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
            <span className="badge badge-danger px-3 py-1 text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1 gap-1.5">
        <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "var(--primary)" }}>{product.category}</p>

        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[var(--primary)] transition-colors"
          style={{ color: "var(--text)" }}
        >
          {product.name}
        </Link>

        <StarRating rating={product.rating} count={product.reviewCount} size={12} />

        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(price)}</span>
          {product.salePrice && (
            <span className="text-xs line-through price-num" style={{ color: "var(--text-muted)" }}>{formatPrice(product.price)}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="btn-md btn-primary w-full text-xs mt-1"
        >
          <ShoppingCart size={13} strokeWidth={2} />
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
