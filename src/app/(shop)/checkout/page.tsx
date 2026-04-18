"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Lock, ShieldCheck, MapPin, Truck, Wallet, CheckCircle2, ChevronRight, CreditCard, Smartphone, Banknote, HelpCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
          <Link href="/" className="px-8 py-4 bg-[#2F6B3A] text-white rounded-2xl font-black uppercase">Back to Farm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFCFC] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/cart" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#999] hover:text-[#333] transition-all">
            <ArrowLeft size={16} /> Edit Basket
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#999]">Secure SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-6">

            <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#EDEDED] shadow-xl shadow-black/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#2F6B3A]/10 flex items-center justify-center text-[#2F6B3A]"><MapPin size={24} /></div>
                <h2 className="text-2xl font-black text-[#333]">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-2 block ml-2">Full Name</label>
                  <input required className="w-full h-14 bg-[#F9F9F9] border-none rounded-2xl px-6 font-bold text-sm outline-none focus:ring-2 focus:ring-[#2F6B3A]/20" placeholder="e.g. Ariful Islam" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-2 block ml-2">Phone Number</label>
                  <input required className="w-full h-14 bg-[#F9F9F9] border-none rounded-2xl px-6 font-bold text-sm outline-none focus:ring-2 focus:ring-[#2F6B3A]/20" placeholder="017XX-XXXXXX" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-2 block ml-2">District</label>
                  <select className="w-full h-14 bg-[#F9F9F9] border-none rounded-2xl px-6 font-bold text-sm outline-none appearance-none">
                    {divisions.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-2 block ml-2">Full Address</label>
                  <textarea required className="w-full h-24 bg-[#F9F9F9] border-none rounded-2xl px-6 py-4 font-bold text-sm outline-none focus:ring-2 focus:ring-[#2F6B3A]/20 resize-none" placeholder="House no, Road no, Area..." />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#EDEDED] shadow-xl shadow-black/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#F58220]/10 flex items-center justify-center text-[#F58220]"><Wallet size={24} /></div>
                <h2 className="text-2xl font-black text-[#333]">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map(m => (
                  <label key={m.id} className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all ${payment === m.id ? "border-[#F58220] bg-[#F58220]/5" : "border-[#F9F9F9] bg-[#F9F9F9] hover:border-[#DDD]"}`}>
                    <input type="radio" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="sr-only" />
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#F58220] shadow-sm"><m.icon size={24} /></div>
                    <div>
                      <p className="text-sm font-black text-[#333]">{m.label}</p>
                      <p className="text-[10px] font-bold text-[#999]">{m.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-[2rem] border border-[#EDEDED] shadow-2xl shadow-black/5 overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-black mb-6 text-[#333]">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F9F9F9] shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black truncate">{item.name}</p>
                        <p className="text-[10px] text-[#999] font-bold">{item.qty} × {formatPrice(item.price)}</p>
                        <p className="text-xs font-black text-[#F58220]">{formatPrice(item.price * item.qty)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-[#EDEDED] mb-8">
                  <div className="flex justify-between text-sm font-bold text-[#666]">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#666]">
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

                <div className="pt-6 border-t-2 border-dashed border-[#EDEDED] mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase text-[#999]">Grand Total</span>
                    <span className="text-3xl font-black text-[#F58220]">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placing}
                  className="w-full h-16 bg-[#F58220] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-[#CCC]"
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

                <p className="text-[10px] text-center text-[#999] font-bold mt-6">
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
