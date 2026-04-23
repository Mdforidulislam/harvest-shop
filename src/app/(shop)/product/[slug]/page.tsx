"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Zap, Heart, Share2, ChevronRight, Plus, Minus,
  Check, Truck, ShieldCheck, RotateCcw, Star, Package,
  MessageSquare, Phone,
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
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 10);

  function handleAddToCart() {
    dispatch(addToCart({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, qty, variant: selectedVariant?.label, stock }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleWishlist() {
    dispatch(toggleWishlist({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price, salePrice: product.salePrice }));
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <div className="page-container py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-5">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/category/${product.categorySlug}`} className="hover:text-[var(--primary)] transition-colors">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--text)] font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Layout */}
        <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-5 md:p-8 mb-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">

            {/* Gallery */}
            <div>
              <div className="relative rounded-lg overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] mb-3" style={{ aspectRatio: "1/1" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 p-8"
                  >
                    <Image src={product.images[activeImg]} alt={product.name} fill priority className="object-contain" />
                  </motion.div>
                </AnimatePresence>

                {/* Discount badge */}
                {discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{discount}%
                  </div>
                )}

                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    isWishlisted ? "bg-red-500 border-red-500 text-white" : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-red-500"
                  }`}
                >
                  <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      i === activeImg ? "border-[var(--accent)] shadow-sm" : "border-[var(--border)] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumb" fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Stock badge */}
              <div className="flex items-center gap-2 mb-3">
                {stock > 0 ? (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check size={11} /> In Stock ({stock} available)
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Out of Stock</span>
                )}
                <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-2)] px-2 py-0.5 rounded-full">{product.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-black text-[var(--text)] mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <StarRating rating={5} size={14} />
                </div>
                <span className="text-sm text-[var(--text-muted)]">({productReviews.length} reviews)</span>
                <span className="text-[var(--border)]">|</span>
                <span className="text-sm font-semibold text-[var(--primary)]">SKU: PRD-{product.id.toString().padStart(4, "0")}</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[var(--border)]">
                <span className="text-3xl font-black text-[var(--accent)]">{formatPrice(price)}</span>
                {product.salePrice && (
                  <>
                    <span className="text-lg text-[var(--text-muted)] line-through font-medium">{formatPrice(product.price)}</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-bold text-[var(--text-muted)] mb-2">
                    Variant: <span className="font-black text-[var(--text)]">{selectedVariant?.label}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.label}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                          selectedVariant?.label === v.label
                            ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--primary-soft)]"
                            : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border)]"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="mb-5">
                <p className="text-sm font-bold text-[var(--text-muted)] mb-2">Quantity:</p>
                <div className="flex gap-3 flex-wrap">
                  <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden h-11">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-11 h-full flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-black text-[var(--text)]">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(stock, qty + 1))}
                      className="w-11 h-full flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                    className={`flex-1 min-w-[140px] h-11 flex items-center justify-center gap-2 rounded-lg font-bold text-sm border-2 transition-all disabled:opacity-50 ${
                      added
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {added ? "Added to Cart!" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => {
                      handleAddToCart();
                      window.location.href = "/checkout";
                    }}
                    disabled={stock === 0}
                    className="flex-1 min-w-[140px] h-11 flex items-center justify-center gap-2 rounded-lg font-bold text-sm text-white bg-[var(--accent)] transition-all hover:opacity-90 disabled:opacity-50"
                  >
                    <Zap size={16} />
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] mb-5">
                {[
                  { icon: Truck, label: "Fast Delivery", desc: "Dhaka 24h, others 3-5 days" },
                  { icon: ShieldCheck, label: "Authentic", desc: "100% quality guaranteed" },
                  { icon: RotateCcw, label: "Easy Return", desc: "7-day return policy" },
                  { icon: Package, label: "Secure Packaging", desc: "Safe & protected" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={16} className="text-[var(--primary)] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[var(--text)]">{label}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="flex gap-3">
                <a
                  href="tel:+8801700000000"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  <Phone size={15} /> Call Us
                </a>
                <a
                  href="https://wa.me/8801700000000"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "#25D366" }}
                >
                  <MessageSquare size={15} /> WhatsApp
                </a>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-muted)] hover:border-[var(--border)] transition-colors ml-auto">
                  <Share2 size={15} /> Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] mb-8">
          <div className="flex border-b border-[var(--border)] overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all relative ${
                  activeTab === tab ? "text-[var(--primary)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-[var(--accent)]" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 min-h-[200px]">
            {activeTab === "Description" && (
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{product.description}</p>
            )}
            {activeTab === "Specifications" && (
              <div className="divide-y divide-[var(--border)]">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex py-3">
                    <span className="w-40 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0">{k}</span>
                    <span className="text-sm font-semibold text-[var(--text)]">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "Reviews" && (
              <div>
                {productReviews.length > 0 ? (
                  <div className="space-y-4">
                    {productReviews.map((r) => (
                      <div key={r.id} className="border-b border-[var(--border)] pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-[var(--text)]">{r.author}</span>
                          <StarRating rating={r.rating} size={12} />
                        </div>
                        <p className="text-sm text-[var(--text-muted)]">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-muted)]">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
            {activeTab === "Shipping" && (
              <div className="space-y-3 text-sm text-[var(--text-muted)]">
                <p><strong className="text-[var(--text)]">Dhaka City:</strong> Delivery within 24 hours (৳60)</p>
                <p><strong className="text-[var(--text)]">Outside Dhaka:</strong> 3-5 business days (৳120)</p>
                <p><strong className="text-[var(--text)]">Free Shipping:</strong> On orders over ৳999</p>
                <p><strong className="text-[var(--text)]">Return Policy:</strong> 7-day hassle-free returns</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <ProductShelf title="Related Products" subtitle="You might also like" products={related} />
        )}

      </div>
    </div>
  );
}
