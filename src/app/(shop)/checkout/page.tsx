"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Lock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartItems, selectCartTotal, selectCoupon, clearCart } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";

const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];
const paymentMethods = [
  { id: "sslcommerz", label: "SSLCommerz", sub: "All cards & mobile banking", icon: "💳" },
  { id: "bkash", label: "bKash", sub: "Fast, secure mobile payment", icon: "🩷" },
  { id: "nagad", label: "Nagad", sub: "Digital financial service", icon: "🟠" },
  { id: "cod", label: "Cash on Delivery", sub: "Pay when you receive", icon: "💵" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const coupon = useAppSelector(selectCoupon);
  const [zone, setZone] = useState("inside");
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const shipping = zone === "inside" ? 60 : 130;
  const grandTotal = total + shipping - coupon.discount;

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));
    dispatch(clearCart());
    router.push("/order-success?id=ORD-" + Math.floor(10000 + Math.random() * 90000));
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-8">
          {/* Left — Form */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Full Name *</label>
                  <input required className="input" placeholder="Rabeya Khatun" />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Phone *</label>
                  <input required type="tel" className="input" placeholder="01700000000" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Email (optional)</label>
                  <input type="email" className="input" placeholder="you@email.com" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Address Line *</label>
                  <input required className="input" placeholder="House 12, Road 5, Block B" />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Area / Thana *</label>
                  <input required className="input" placeholder="Gulshan-2" />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>District *</label>
                  <select required className="input">
                    {divisions.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>City *</label>
                  <input required className="input" placeholder="Dhaka" />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Postal Code</label>
                  <input className="input" placeholder="1212" />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Shipping Method</h2>
              <div className="space-y-2">
                {[
                  { id: "inside", label: "Inside Dhaka", cost: 60, eta: "1–2 business days" },
                  { id: "outside", label: "Outside Dhaka", cost: 130, eta: "3–5 business days" },
                ].map((option) => (
                  <label key={option.id} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all ${zone === option.id ? "border-[var(--primary)] bg-[var(--primary-soft)]" : "border-[var(--border)] hover:border-[var(--primary)]"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="zone" value={option.id} checked={zone === option.id} onChange={() => setZone(option.id)} className="accent-[var(--primary)] w-4 h-4" />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{option.label}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{option.eta}</p>
                      </div>
                    </div>
                    <span className="font-bold price-num" style={{ color: "var(--primary)" }}>৳{option.cost}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <label key={method.id} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${payment === method.id ? "border-[var(--primary)] bg-[var(--primary-soft)]" : "border-[var(--border)] hover:border-[var(--primary)]"}`}>
                    <input type="radio" name="payment" value={method.id} checked={payment === method.id} onChange={() => setPayment(method.id)} className="accent-[var(--primary)] w-4 h-4" />
                    <span className="text-xl">{method.icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{method.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{method.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order notes */}
            <div className="card p-5">
              <label className="font-bold text-sm block mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Notes (optional)</label>
              <textarea className="input h-24 resize-none" placeholder="Any special instructions for delivery…" />
            </div>
          </div>

          {/* Right — Order Summary */}
          <div>
            {/* Mobile accordion */}
            <button type="button" onClick={() => setSummaryOpen(!summaryOpen)} className="lg:hidden w-full flex items-center justify-between p-4 mb-4 card">
              <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>Order Summary ({items.length} items)</span>
              <div className="flex items-center gap-2">
                <span className="font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(grandTotal)}</span>
                <ChevronDown size={16} className={`transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            <div className={`lg:block ${summaryOpen ? "block" : "hidden"}`}>
              <div className="card p-5 sticky top-24 space-y-4">
                <h2 className="font-bold text-sm hidden lg:block" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Summary</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "var(--text-muted)" }}>{item.qty}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium" style={{ color: "var(--text)" }}>{item.name}</p>
                        {item.variant && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.variant}</p>}
                      </div>
                      <span className="text-xs font-bold price-num flex-shrink-0" style={{ color: "var(--text)" }}>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                    <span className="price-num" style={{ color: "var(--text)" }}>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Shipping ({zone === "inside" ? "Inside Dhaka" : "Outside Dhaka"})</span>
                    <span className="price-num" style={{ color: "var(--text)" }}>৳{shipping}</span>
                  </div>
                  {coupon.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--success)" }}>Discount ({coupon.code})</span>
                      <span className="price-num" style={{ color: "var(--success)" }}>−{formatPrice(coupon.discount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <span className="font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Total</span>
                  <span className="text-xl font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(grandTotal)}</span>
                </div>

                <button type="submit" disabled={placing} className="btn-lg btn-primary w-full justify-center">
                  <Lock size={16} />
                  {placing ? "Placing Order…" : "Place Order"}
                </button>
                <p className="text-[11px] text-center" style={{ color: "var(--text-muted)" }}>
                  By placing this order you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy-policy" className="underline">Privacy Policy</a>
                </p>
              </div>
            </div>

            {/* Mobile sticky bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 border-t z-40" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <button type="submit" disabled={placing} className="btn-lg btn-primary w-full justify-center">
                <Lock size={16} />
                {placing ? "Placing…" : `Place Order — ${formatPrice(grandTotal)}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
