"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, MapPin, Truck, Wallet, CheckCircle2, ArrowLeft, CreditCard, Smartphone, Banknote } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartItems, selectCartTotal, selectCoupon, clearCart } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";

const divisions = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];
const paymentMethods = [
  { id: "sslcommerz", label: "Debit/Credit Card", sub: "Visa, Mastercard, Amex", icon: CreditCard },
  { id: "bkash", label: "bKash", sub: "Merchant: 01711223344", icon: Smartphone },
  { id: "nagad", label: "Nagad", sub: "Fast mobile settlement", icon: Smartphone },
  { id: "cod", label: "Cash on Delivery", sub: "Pay at your doorstep", icon: Banknote },
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

  const shipping = zone === "inside" ? 60 : 130;
  const grandTotal = total + shipping - coupon.discount;

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 2000));
    const orderId = "HRV-" + Math.floor(100000 + Math.random() * 900000);
    dispatch(clearCart());
    router.push(`/order-success?id=${orderId}`);
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-4">Your basket is empty</h2>
          <Link href="/" className="px-8 py-4 bg-[var(--cta-green)] text-white rounded-2xl font-black uppercase">Back to Farm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-20">
      <div className="page-container py-8">

        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/cart" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-all">
            <ArrowLeft size={16} /> Edit Basket
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Secure SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-6">

            <section className="bg-[var(--surface)] rounded-[2rem] p-8 md:p-10 border border-[var(--border)] shadow-xl shadow-black/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--cta-green) 10%, transparent)", color: "var(--cta-green)" }}><MapPin size={24} /></div>
                <h2 className="text-2xl font-black text-[var(--text)]">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">Full Name</label>
                  <input required className="w-full h-14 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 font-bold text-sm outline-none focus:ring-2 text-[var(--text)]" style={{ "--tw-ring-color": "color-mix(in srgb, var(--cta-green) 20%, transparent)" } as React.CSSProperties} placeholder="e.g. Ariful Islam" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">Phone Number</label>
                  <input required className="w-full h-14 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 font-bold text-sm outline-none text-[var(--text)]" placeholder="017XX-XXXXXX" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">District</label>
                  <select className="w-full h-14 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 font-bold text-sm outline-none appearance-none text-[var(--text)]">
                    {divisions.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">Full Address</label>
                  <textarea required className="w-full h-24 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 py-4 font-bold text-sm outline-none resize-none text-[var(--text)]" placeholder="House no, Road no, Area..." />
                </div>
              </div>
            </section>

            <section className="bg-[var(--surface)] rounded-[2rem] p-8 md:p-10 border border-[var(--border)] shadow-xl shadow-black/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[var(--accent)]" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)" }}><Wallet size={24} /></div>
                <h2 className="text-2xl font-black text-[var(--text)]">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map(m => (
                  <label key={m.id} className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all ${payment === m.id ? "border-[var(--accent)]" : "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border)]"}`} style={payment === m.id ? { background: "color-mix(in srgb, var(--accent) 5%, transparent)" } : {}}>
                    <input type="radio" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="sr-only" />
                    <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] shadow-sm"><m.icon size={24} /></div>
                    <div>
                      <p className="text-sm font-black text-[var(--text)]">{m.label}</p>
                      <p className="text-[10px] font-bold text-[var(--text-muted)]">{m.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-[var(--surface)] rounded-[2rem] border border-[var(--border)] shadow-2xl shadow-black/5 overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-black mb-6 text-[var(--text)]">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--surface-2)] shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black truncate text-[var(--text)]">{item.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)] font-bold">{item.qty} × {formatPrice(item.price)}</p>
                        <p className="text-xs font-black text-[var(--accent)]">{formatPrice(item.price * item.qty)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-[var(--border)] mb-8">
                  <div className="flex justify-between text-sm font-bold text-[var(--text-muted)]">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[var(--text-muted)]">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  {coupon.discount > 0 && (
                    <div className="flex justify-between text-sm font-black text-green-600">
                      <span>Discount ({coupon.code})</span>
                      <span>−{formatPrice(coupon.discount)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t-2 border-dashed border-[var(--border)] mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase text-[var(--text-muted)]">Grand Total</span>
                    <span className="text-3xl font-black text-[var(--accent)]">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placing}
                  className="w-full h-16 bg-[var(--accent)] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {placing ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock size={20} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[var(--text-muted)] font-bold mt-6">
                  By placing this order you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
