"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectWishlist } from "@/features/wishlist/wishlistSlice";
import { formatPrice } from "@/lib/utils";
import { Heart } from "lucide-react";

export default function WishlistPreview() {
  const items = useSelector(selectWishlist);

  return (
    <div className="card overflow-hidden">
      {/* Dark header bar */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ background: "var(--primary)" }}
      >
        <h2
          className="text-sm font-bold"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "white" }}
        >
          Wishlist Items
        </h2>
        <Link
          href="/account/wishlist"
          className="btn-sm text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.15)", color: "white", borderRadius: 8 }}
        >
          View More
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {items.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="group rounded-xl overflow-hidden transition-shadow hover:shadow-md"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="relative aspect-square overflow-hidden"
                style={{ background: "var(--surface-2)" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="160px"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold line-clamp-1" style={{ color: "var(--text)" }}>
                  {item.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {item.salePrice ? (
                    <>
                      <span className="text-xs font-bold price-num" style={{ color: "var(--primary)" }}>
                        {formatPrice(item.salePrice)}
                      </span>
                      <span className="text-[10px] line-through price-num" style={{ color: "var(--text-muted)" }}>
                        {formatPrice(item.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-bold price-num" style={{ color: "var(--primary)" }}>
                      {formatPrice(item.price)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Heart
            size={36}
            className="mx-auto mb-3"
            style={{ color: "var(--border)" }}
            aria-hidden="true"
          />
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            No Product in Wishlist
          </p>
          <Link href="/category/all" className="btn-sm btn-primary mt-3 inline-flex">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}
