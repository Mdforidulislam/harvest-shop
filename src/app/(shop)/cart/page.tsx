"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight, ShieldCheck, Truck, ChevronLeft, TicketPercent, Lock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartItems, selectCartTotal, selectCoupon, removeFromCart, updateQty, applyCoupon } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    if (!val) { setCouponError("Invalid coupon code."); return; }
    const discount = val < 1 ? Math.round(total * val) : val;
    dispatch(applyCoupon({ code, discount }));
    setCouponError("");
  }

  const shipping = total >= 1500 ? 0 : SHIPPING;
  const discount = coupon.discount;
  const grandTotal = total + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center flex flex-col items-center">
        <div className="w-32 h-32 rounded-[3rem] bg-[#F9F9F9] flex items-center justify-center mb-10 shadow-inner">
          <ShoppingBag size={64} className="text-[#DDD]" />
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Your Basket is Empty</h1>
        <p className="max-w-xs mx-auto mb-10 text-lg text-[#999] font-medium">Add some organic goodness to your basket to continue.</p>
        <Link href="/category/all" className="h-16 px-12 rounded-2xl bg-[#2F6B3A] text-white font-black flex items-center justify-center gap-3 shadow-xl shadow-green-900/10 hover:scale-105 transition-all">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFCFC] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Your Basket</h1>
          <div className="flex items-center gap-2 text-[#999] font-black uppercase text-[10px] tracking-widest">
            <ShoppingBag size={14} />
            <span>{items.reduce((acc, i) => acc + i.qty, 0)} Items Selected</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="bg-white p-6 rounded-[2.5rem] border border-[#EDEDED] shadow-xl shadow-black/5 flex flex-col sm:flex-row gap-6 items-center">
                <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-[#F9F9F9] shrink-0 p-4">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <Link href={`/product/${item.slug}`} className="text-xl font-black text-[#333] hover:text-[#F58220] transition-colors">{item.name}</Link>
                  <p className="text-sm font-bold text-[#F58220] mt-1">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center bg-[#F9F9F9] rounded-xl h-11 w-28 overflow-hidden border border-[#EEE]">
                    <button onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty - 1 }))} disabled={item.qty <= 1} className="flex-1 h-full flex items-center justify-center hover:bg-white text-[#999]"><Minus size={14} /></button>
                    <span className="flex-1 text-center font-black text-sm">{item.qty}</span>
                    <button onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty + 1 }))} disabled={item.qty >= item.stock} className="flex-1 h-full flex items-center justify-center hover:bg-white text-[#999]"><Plus size={14} /></button>
                  </div>
                  <span className="text-sm font-black text-[#333]">{formatPrice(item.price * item.qty)}</span>
                </div>
                <button onClick={() => dispatch(removeFromCart({ id: item.id, variant: item.variant }))} className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="pt-8">
              <Link href="/category/all" className="flex items-center gap-2 text-xs font-black uppercase text-[#999] hover:text-[#F58220] transition-all">
                <ChevronLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Checkout Summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-[2.5rem] border border-[#EDEDED] shadow-2xl shadow-black/5 overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-black mb-8 text-[#333]">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <TicketPercent size={18} className="text-[#F58220]" />
                    <span className="text-xs font-black uppercase text-[#999] tracking-widest">Apply Promo Code</span>
                  </div>
                  <div className="flex gap-2">
                    <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Enter code" className="flex-1 h-12 bg-[#F9F9F9] border-none rounded-xl px-4 font-bold text-sm outline-none" />
                    <button onClick={applyCouponCode} className="h-12 px-6 bg-[#2F6B3A] text-white rounded-xl font-black text-xs uppercase shadow-lg shadow-green-900/10">Apply</button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-500 font-bold ml-2">{couponError}</p>}
                </div>

                <div className="space-y-4 pt-8 border-t border-[#F9F9F9] mb-8">
                  <div className="flex justify-between text-sm font-bold text-[#666]">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#666]">
                    <span>Estimated Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  {coupon.discount > 0 && (
                    <div className="flex justify-between text-sm font-black text-green-600">
                      <span>Discount ({coupon.code})</span>
                      <span>−{formatPrice(coupon.discount)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t-2 border-dashed border-[#EDEDED] mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase text-[#999]">Total Amount</span>
                    <span className="text-3xl font-black text-[#F58220]">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full h-16 bg-[#F58220] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Lock size={20} />
                  Checkout Now
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
