"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectWishlist, removeWishlistItem } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/fake-data";
import type { Metadata } from "next";

export default function AccountWishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlist);
  const wishlistProducts = wishlistItems
    .map((i) => products.find((p) => p.id === i.id))
    .filter(Boolean) as typeof products;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            My Wishlist
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            {wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
        {wishlistProducts.length > 0 && (
          <Link href="/category/all" className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--primary)" }}>
            Continue shopping <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--surface-2)" }}>
            <Heart size={28} style={{ color: "var(--border)" }} />
          </div>
          <h2 className="text-lg font-semibold mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            Your wishlist is empty
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Save products you love and buy them later
          </p>
          <Link href="/category/all" className="btn-md btn-primary">Explore Products</Link>
        </div>
      ) : (
        <>
          {/* Move all to cart */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => {
                  dispatch(addToCart({ id: p.id, slug: p.slug, name: p.name, image: p.images[0], price: p.salePrice ?? p.price, qty: 1, stock: p.stock }));
                  dispatch(removeWishlistItem(p.id));
                });
              }}
              className="btn-md btn-primary text-sm"
            >
              <ShoppingCart size={14} /> Move All to Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {wishlistProducts.map((p) => {
              const price = p.salePrice ?? p.price;
              return (
                <div key={p.id} className="card overflow-hidden group flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--surface-2)" }}>
                    <Link href={`/product/${p.slug}`}>
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width:640px) 100vw, 33vw"
                      />
                    </Link>
                    {p.salePrice && (
                      <span className="absolute top-2 left-2 badge badge-danger">
                        {Math.round((1 - p.salePrice / p.price) * 100)}% OFF
                      </span>
                    )}
                    {p.isNew && !p.salePrice && (
                      <span className="absolute top-2 left-2 badge badge-primary">New</span>
                    )}
                    <button
                      onClick={() => dispatch(removeWishlistItem(p.id))}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 shadow hover:bg-red-50 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={13} style={{ color: "var(--danger)" }} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{p.category}</p>
                    <Link
                      href={`/product/${p.slug}`}
                      className="text-sm font-semibold line-clamp-2 hover:text-[var(--primary)] transition-colors mb-2 flex-1"
                      style={{ color: "var(--text)" }}
                    >
                      {p.name}
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < Math.floor(p.rating) ? "var(--warning)" : "var(--border)"}>
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>({p.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(price)}</span>
                      {p.salePrice && (
                        <span className="text-xs line-through price-num" style={{ color: "var(--text-muted)" }}>{formatPrice(p.price)}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          dispatch(addToCart({ id: p.id, slug: p.slug, name: p.name, image: p.images[0], price, qty: 1, stock: p.stock }));
                          dispatch(removeWishlistItem(p.id));
                        }}
                        className="btn-sm btn-primary flex-1"
                        disabled={p.stock === 0}
                      >
                        <ShoppingCart size={13} />
                        {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                      <Link href={`/product/${p.slug}`} className="btn-sm btn-secondary">View</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
