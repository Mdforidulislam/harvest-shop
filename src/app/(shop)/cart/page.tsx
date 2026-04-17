"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartItems, selectCartTotal, selectCoupon, removeFromCart, updateQty, applyCoupon } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import type { Metadata } from "next";

const VALID_COUPONS: Record<string, number> = { FRESH10: 0.10, HARVEST20: 0.20, ORGANIC50: 50 };
const SHIPPING = 60;

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const coupon = useAppSelector(selectCoupon);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  function applyCouponCode() {
    const code = couponInput.toUpperCase().trim();
    const val = VALID_COUPONS[code];
    if (!val) { setCouponError("Invalid coupon code"); return; }
    const discount = val < 1 ? Math.round(total * val) : val;
    dispatch(applyCoupon({ code, discount }));
    setCouponError("");
  }

  const shipping = total >= 1500 ? 0 : SHIPPING;
  const discount = coupon.discount;
  const grandTotal = total + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Your cart is empty</h1>
        <p className="mb-6" style={{ color: "var(--text-muted)" }}>Looks like you haven't added anything yet.</p>
        <Link href="/category/all" className="btn-lg btn-primary inline-flex">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
        Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-8">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.id}-${item.variant}`} className="card flex gap-4 p-4">
              <Link href={`/product/${item.slug}`} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-semibold text-sm hover:text-[var(--primary)] transition-colors" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                      {item.name}
                    </Link>
                    {item.variant && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Size: {item.variant}</p>}
                  </div>
                  <button onClick={() => dispatch(removeFromCart({ id: item.id, variant: item.variant }))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 flex-shrink-0" aria-label="Remove">
                    <Trash2 size={14} style={{ color: "var(--danger)" }} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-0 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                    <button onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty - 1 }))} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" disabled={item.qty <= 1}>
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium" style={{ color: "var(--text)" }}>{item.qty}</span>
                    <button onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty + 1 }))} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" disabled={item.qty >= item.stock}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            </div>
          ))}

          <Link href="/category/all" className="btn-md btn-ghost inline-flex mt-2 text-sm">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary Sidebar */}
        <div>
          <div className="card p-5 sticky top-24 space-y-4">
            <h2 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Summary</h2>

            {/* Coupon */}
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code"
                    className="input pl-8 h-10 text-sm"
                  />
                </div>
                <button onClick={applyCouponCode} className="btn-md btn-secondary px-4 text-sm">Apply</button>
              </div>
              {couponError && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{couponError}</p>}
              {coupon.code && <p className="text-xs mt-1 font-medium" style={{ color: "var(--success)" }}>"{coupon.code}" applied — saving {formatPrice(discount)}</p>}
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Try: FRESH10, HARVEST20</p>
            </div>

            <div className="space-y-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                <span className="price-num" style={{ color: "var(--text)" }}>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Shipping</span>
                <span className="price-num" style={{ color: shipping === 0 ? "var(--success)" : "var(--text)" }}>
                  {shipping === 0 ? "Free 🎉" : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--success)" }}>Discount</span>
                  <span className="price-num" style={{ color: "var(--success)" }}>−{formatPrice(discount)}</span>
                </div>
              )}
              {total < 1500 && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Add {formatPrice(1500 - total)} more for free shipping!
                </p>
              )}
            </div>

            <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <span className="font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Total</span>
              <span className="text-xl font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(grandTotal)}</span>
            </div>

            <Link href="/checkout" className="btn-lg btn-primary w-full justify-center">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              {["bKash", "Nagad", "Visa", "COD"].map((m) => (
                <span key={m} className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
