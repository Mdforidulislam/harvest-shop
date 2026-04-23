"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectWishlist, removeWishlistItem } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/fake-data";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlist);
  const wishlistProducts = wishlistItems.map((i) => products.find((p) => p.id === i.id)).filter(Boolean);

  return (
    <div className="page-container py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>My Wishlist</h1>
      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>{wishlistProducts.length} saved items</p>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={64} className="mx-auto mb-4" style={{ color: "var(--border)" }} />
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>Your wishlist is empty</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Save products you love for later</p>
          <Link href="/category/all" className="btn-md btn-primary">Explore Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlistProducts.map((product) => {
            const p = product!;
            const price = p.salePrice ?? p.price;
            return (
              <div key={p.id} className="card overflow-hidden group">
                <div className="relative aspect-square bg-[var(--surface-2)]">
                  <Link href={`/product/${p.slug}`}>
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:640px) 50vw,25vw" />
                  </Link>
                  <button onClick={() => dispatch(removeWishlistItem(p.id))} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white/80 shadow hover:bg-red-50 transition-colors" aria-label="Remove from wishlist">
                    <Trash2 size={13} style={{ color: "var(--danger)" }} />
                  </button>
                </div>
                <div className="p-3 space-y-2">
                  <Link href={`/product/${p.slug}`} className="text-sm font-semibold line-clamp-2 hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text)" }}>
                    {p.name}
                  </Link>
                  <span className="font-bold text-base price-num" style={{ color: "var(--primary)" }}>{formatPrice(price)}</span>
                  <button
                    onClick={() => {
                      dispatch(addToCart({ id: p.id, slug: p.slug, name: p.name, image: p.images[0], price, qty: 1, stock: p.stock }));
                      dispatch(removeWishlistItem(p.id));
                    }}
                    className="btn-md btn-primary w-full text-xs"
                  >
                    <ShoppingCart size={13} /> Move to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
