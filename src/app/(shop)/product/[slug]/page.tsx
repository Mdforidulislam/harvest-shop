"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Zap, Heart, Share2, ChevronRight, Plus, Minus,
  Check, Truck, ShieldCheck, RotateCcw, Star, Package, MessageSquare,
} from "lucide-react";
import { products, reviews as allReviews } from "@/lib/fake-data";
import { formatPrice, calcDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import StarRating from "@/components/ui/StarRating";
import ProductCard from "@/components/shop/ProductCard";

type Props = { params: Promise<{ slug: string }> };
const tabs = ["Description", "Specifications", "Reviews", "Shipping & Returns"] as const;

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[1] ?? null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Description");
  const [added, setAdded] = useState(false);
  const [shared, setShared] = useState(false);

  const price    = selectedVariant?.price ?? product.salePrice ?? product.price;
  const stock    = selectedVariant?.stock ?? product.stock;
  const discount = product.salePrice ? calcDiscount(product.price, product.salePrice) : null;
  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const related  = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const ratingCounts = [5, 4, 3, 2, 1].map((s) => ({ star: s, count: productReviews.filter((r) => r.rating === s).length }));

  function handleAddToCart() {
    dispatch(addToCart({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, qty, variant: selectedVariant?.label, stock }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-8 flex-wrap" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-[var(--primary)] transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <Link href={`/category/${product.categorySlug}`} className="hover:text-[var(--primary)] transition-colors">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="line-clamp-1 max-w-[200px]" style={{ color: "var(--text)" }}>{product.name}</span>
      </nav>

      {/* ── Product Section ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

        {/* ── Gallery ── */}
        <div className="flex flex-col gap-3">

          {/* Primary image */}
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "1 / 1", background: "var(--surface-2)" }}
          >
            <Image
              src={product.images[activeImg]}
              alt={product.name}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
            />

            {/* Floating badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {discount && (
                <span className="badge badge-accent text-xs font-bold px-2.5 py-1 shadow">{discount}% OFF</span>
              )}
              {product.isNew && !discount && (
                <span className="badge badge-primary text-xs px-2.5 py-1 shadow">New Arrival</span>
              )}
              {product.isBestSeller && (
                <span className="badge badge-success text-xs px-2.5 py-1 shadow">Best Seller</span>
              )}
            </div>

            {/* Wishlist pill floating on image */}
            <button
              onClick={() => dispatch(toggleWishlist({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, salePrice: product.salePrice }))}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors"
              style={{ background: isWishlisted ? "#fee2e2" : "var(--surface)" }}
            >
              <Heart size={16} fill={isWishlisted ? "var(--danger)" : "none"} color={isWishlisted ? "var(--danger)" : "var(--text-muted)"} />
            </button>

            {/* Out of stock overlay */}
            {stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl" style={{ background: "rgba(0,0,0,0.5)" }}>
                <span className="badge badge-danger text-sm px-5 py-2 font-bold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Thumbnail strip — below primary image */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 justify-center flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    width: 72,
                    height: 72,
                    outline: i === activeImg ? "2.5px solid var(--primary)" : "2.5px solid transparent",
                    outlineOffset: "2px",
                    opacity: i === activeImg ? 1 : 0.65,
                    background: "var(--surface-2)",
                  }}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="72px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info panel ── */}
        <div className="flex flex-col gap-5">

          {/* Category */}
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            {product.category}
          </p>

          {/* Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
              {product.name}
            </h1>
            {product.nameBn && (
              <p className="text-lg mt-1 font-bangla" style={{ color: "var(--text-muted)" }}>{product.nameBn}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 flex-wrap">
            <StarRating rating={product.rating} count={product.reviewCount} size={15} />
            <span style={{ color: "var(--border)" }}>|</span>
            <button onClick={() => setActiveTab("Reviews")} className="text-xs hover:underline transition-colors" style={{ color: "var(--primary)" }}>
              {productReviews.length} customer reviews
            </button>
          </div>

          {/* Price block */}
          <div className="flex items-center gap-4 flex-wrap py-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <span className="text-3xl font-bold price-num" style={{ color: "var(--primary)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              {formatPrice(price)}
            </span>
            {product.salePrice && !selectedVariant && (
              <>
                <span className="text-lg line-through price-num" style={{ color: "var(--text-muted)" }}>{formatPrice(product.price)}</span>
                <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Short description */}
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{product.shortDesc}</p>

          {/* Variants */}
          {product.variants && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: "var(--text-muted)" }}>
                Size / Weight
                {selectedVariant && (
                  <span className="ml-2 normal-case font-normal" style={{ color: "var(--text)" }}>— {selectedVariant.label}</span>
                )}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVariant(v)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all"
                    style={{
                      borderColor: selectedVariant?.label === v.label ? "var(--primary)" : "var(--border)",
                      background:  selectedVariant?.label === v.label ? "var(--primary-soft)" : "transparent",
                      color:       selectedVariant?.label === v.label ? "var(--primary)" : "var(--text)",
                    }}
                  >
                    {v.label}
                    <span className="ml-1.5 text-xs opacity-60">{formatPrice(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock status */}
          <div className="flex items-center gap-2 text-sm">
            {stock > 10 ? (
              <>
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)" }} />
                <span style={{ color: "var(--success)" }}>In Stock</span>
                <span style={{ color: "var(--text-muted)" }}>({stock} units available)</span>
              </>
            ) : stock > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--warning)" }} />
                <span className="font-semibold" style={{ color: "var(--warning)" }}>Only {stock} left — order soon!</span>
              </>
            ) : (
              <span className="badge badge-danger">Out of Stock</span>
            )}
          </div>

          {/* Qty + Add to Cart */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Qty picker */}
            <div className="flex items-center rounded-xl border-2" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
                className="w-11 h-12 flex items-center justify-center transition-colors disabled:opacity-30 hover:bg-[var(--surface-2)]"
                style={{ color: "var(--text)" }}
              >
                <Minus size={14} />
              </button>
              <span className="w-12 text-center font-bold" style={{ color: "var(--text)" }}>{qty}</span>
              <button
                onClick={() => setQty(Math.min(stock, qty + 1))}
                disabled={qty >= stock}
                className="w-11 h-12 flex items-center justify-center transition-colors disabled:opacity-30 hover:bg-[var(--surface-2)]"
                style={{ color: "var(--text)" }}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className="btn-lg btn-primary flex-1 flex items-center justify-center gap-2"
              style={{ minWidth: "160px" }}
            >
              {added ? <Check size={16} /> : <ShoppingCart size={16} />}
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>

          {/* Buy now */}
          <Link href="/checkout" className="btn-lg btn-secondary w-full flex items-center justify-center gap-2">
            <Zap size={15} />
            Buy Now — {formatPrice(price * qty)}
          </Link>

          {/* Wishlist + Share */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => dispatch(toggleWishlist({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, salePrice: product.salePrice }))}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: isWishlisted ? "var(--danger)" : "var(--text-muted)" }}
            >
              <Heart size={15} fill={isWishlisted ? "var(--danger)" : "none"} color="currentColor" />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              {shared ? <Check size={15} style={{ color: "var(--success)" }} /> : <Share2 size={15} />}
              {shared ? "Link Copied!" : "Share"}
            </button>
          </div>

          {/* Delivery trust strip */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Truck,       title: "Fast Delivery",   sub: "2–5 business days" },
              { icon: ShieldCheck, title: "100% Authentic",  sub: "Quality guaranteed" },
              { icon: RotateCcw,   title: "Easy Returns",    sub: "7-day policy" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl" style={{ background: "var(--surface-2)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--primary-soft)" }}>
                  <Icon size={15} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>{title}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────── */}
      <div className="mt-16">
        <div className="flex overflow-x-auto" style={{ borderBottom: "2px solid var(--border)" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-3.5 text-sm font-semibold whitespace-nowrap flex-shrink-0 border-b-2 -mb-0.5 transition-colors"
              style={{
                borderColor: activeTab === tab ? "var(--primary)" : "transparent",
                color: activeTab === tab ? "var(--primary)" : "var(--text-muted)",
              }}
            >
              {tab === "Reviews" ? `Reviews (${productReviews.length})` : tab}
            </button>
          ))}
        </div>

        <div className="py-8">

          {/* Description */}
          {activeTab === "Description" && (
            <div className="max-w-3xl text-sm leading-7 space-y-4" style={{ color: "var(--text)" }}>
              <p>{product.description}</p>
              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Specifications */}
          {activeTab === "Specifications" && (
            <div className="max-w-2xl rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              {Object.entries(product.specs).map(([key, val], i) => (
                <div
                  key={key}
                  className="grid text-sm"
                  style={{
                    gridTemplateColumns: "180px 1fr",
                    borderTop: i > 0 ? "1px solid var(--border)" : "none",
                    background: i % 2 === 0 ? "var(--surface-2)" : "transparent",
                  }}
                >
                  <div className="px-5 py-3 font-semibold" style={{ color: "var(--text)" }}>{key}</div>
                  <div className="px-5 py-3" style={{ color: "var(--text-muted)" }}>{val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === "Reviews" && (
            <div className="max-w-3xl space-y-6">
              {productReviews.length > 0 && (
                <div className="flex gap-8 flex-wrap p-6 rounded-2xl" style={{ background: "var(--surface-2)" }}>
                  <div className="text-center">
                    <p className="text-5xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                      {product.rating.toFixed(1)}
                    </p>
                    <div className="flex justify-center mt-1">
                      <StarRating rating={product.rating} size={16} />
                    </div>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{productReviews.length} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5 min-w-[180px]">
                    {ratingCounts.map(({ star, count }) => (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-right" style={{ color: "var(--text-muted)" }}>{star}</span>
                        <Star size={10} fill="var(--warning)" color="var(--warning)" />
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: productReviews.length ? `${(count / productReviews.length) * 100}%` : "0%",
                              background: "var(--warning)",
                            }}
                          />
                        </div>
                        <span className="w-4 text-right" style={{ color: "var(--text-muted)" }}>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {productReviews.length === 0 ? (
                <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
                  <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No reviews yet. Be the first to review this product!</p>
                </div>
              ) : (
                productReviews.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl" style={{ background: "var(--surface-2)" }}>
                    <div className="flex items-start gap-3 mb-3">
                      <Image src={r.avatar} alt={r.author} width={42} height={42} className="rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.author}</p>
                          {r.verified && <span className="badge badge-success text-[10px]">Verified Purchase</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarRating rating={r.rating} size={12} />
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Shipping & Returns */}
          {activeTab === "Shipping & Returns" && (
            <div className="max-w-2xl grid sm:grid-cols-2 gap-4">
              {[
                { icon: Truck,       title: "Inside Dhaka",  body: "৳60 flat rate · 1–2 business days" },
                { icon: Package,     title: "Outside Dhaka", body: "৳130 flat rate · 3–5 business days" },
                { icon: ShieldCheck, title: "Free Shipping", body: "On orders above ৳1500" },
                { icon: RotateCcw,   title: "Returns",       body: "7-day window for unopened, undamaged items" },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl" style={{ background: "var(--surface-2)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary-soft)" }}>
                    <Icon size={16} style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Related Products ─────────────────────────────── */}
      {related.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>You May Also Like</h2>
            <Link href={`/category/${product.categorySlug}`} className="text-sm font-medium hover:underline" style={{ color: "var(--primary)" }}>View all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
