import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, Edit3, Trash2 } from "lucide-react";
import { reviews, products } from "@/lib/fake-data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Reviews — Harvest" };

const myReviews = reviews.filter((r) => r.author === "Rabeya Khatun");

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < rating ? "var(--warning)" : "var(--border)"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function MyReviewsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
          My Reviews
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
          {myReviews.length} review{myReviews.length !== 1 ? "s" : ""} posted
        </p>
      </div>

      {myReviews.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--surface-2)" }}>
            <Star size={28} style={{ color: "var(--border)" }} />
          </div>
          <h2 className="text-lg font-semibold mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            No reviews yet
          </h2>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Share your experience with the products you&apos;ve purchased
          </p>
          <Link href="/account/orders" className="btn-md btn-primary">View My Orders</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myReviews.map((review) => {
            const product = products.find((p) => p.id === review.productId);
            return (
              <div key={review.id} className="card p-5">
                <div className="flex gap-4">
                  {/* Product image */}
                  {product && (
                    <Link href={`/product/${product.slug}`} className="flex-shrink-0">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden" style={{ background: "var(--surface-2)" }}>
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="64px" />
                      </div>
                    </Link>
                  )}

                  <div className="flex-1 min-w-0">
                    {/* Product name + actions */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        {product && (
                          <Link
                            href={`/product/${product.slug}`}
                            className="text-sm font-semibold hover:text-[var(--primary)] transition-colors line-clamp-1"
                            style={{ color: "var(--text)" }}
                          >
                            {product.name}
                          </Link>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <StarRow rating={review.rating} />
                          <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{review.rating}.0</span>
                          {review.verified && (
                            <span className="flex items-center gap-0.5 text-[10px] font-semibold" style={{ color: "var(--success)" }}>
                              <CheckCircle size={10} /> Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]" style={{ color: "var(--text-muted)" }} aria-label="Edit review">
                          <Edit3 size={13} />
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "var(--danger)" }} aria-label="Delete review">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text)" }}>
                      &ldquo;{review.comment}&rdquo;
                    </p>

                    {/* Date */}
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Posted on {formatDate(review.date)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Products pending review */}
      <div className="card p-5">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
          Pending Reviews
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          You have delivered orders waiting for your review
        </p>
        <div className="space-y-3">
          {products.slice(2, 4).map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{p.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Purchased · Delivered</p>
              </div>
              <button className="btn-sm btn-primary flex-shrink-0 text-xs">
                <Star size={12} /> Write Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
