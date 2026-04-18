"use client";
import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin, Sparkles, ShoppingBag, Receipt, ArrowRight, Home, BadgeCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";

function OrderSuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("id") ?? "ORD-774829";

  const steps = [
    { icon: CheckCircle, label: "Order Placed", done: true, time: "Just now" },
    { icon: Package, label: "Harvesting", done: false, time: "Pending" },
    { icon: Truck, label: "Transit", done: false, time: "Est. Friday" },
    { icon: MapPin, label: "Harvested", done: false, time: "Est. Saturday" },
  ];

  return (
    <div className="bg-[#FCFCFC] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20 md:py-32">

        {/* Success Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 rounded-3xl bg-[#2F6B3A] flex items-center justify-center mx-auto shadow-2xl shadow-green-900/20 mb-10"
          >
            <CheckCircle size={48} className="text-white" strokeWidth={3} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Successfully <span className="text-[#2F6B3A]">Placed!</span>
          </motion.h1>

          <p className="text-lg text-[#666] font-medium max-w-xl mx-auto leading-relaxed">
            Fantastic choice! We&apos;ve received your order and our harvesters are already at work to package your goodness.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-[2.5rem] border border-[#EDEDED] shadow-xl shadow-black/5 overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-[#F9F9F9] mb-12">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-2">Order Reference</p>
                <h2 className="text-2xl font-black text-[#F58220] tracking-tight">{orderId}</h2>
              </div>
              <div className="flex items-center gap-3 bg-[#2F6B3A]/5 px-6 py-3 rounded-2xl border border-[#2F6B3A]/10">
                <BadgeCheck size={20} className="text-[#2F6B3A]" />
                <span className="text-xs font-black uppercase tracking-widest text-[#2F6B3A]">Payment Verified</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative flex justify-between gap-4">
              <div className="absolute top-6 left-8 right-8 h-1 bg-[#F9F9F9] z-0 hidden md:block" />
              {steps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${step.done ? "bg-[#2F6B3A] text-white shadow-xl shadow-green-900/20" : "bg-[#F9F9F9] text-[#999]"}`}>
                    <step.icon size={20} strokeWidth={2.5} />
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-widest text-center mb-1 ${step.done ? "text-[#2F6B3A]" : "text-[#999]"}`}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/category/all" className="h-16 px-12 rounded-2xl bg-[#F58220] text-white font-black flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20 hover:scale-105 transition-all">
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>
          <Link href="/" className="h-16 px-12 rounded-2xl bg-white border-2 border-[#EDEDED] text-[#333] font-black flex items-center justify-center gap-3 hover:bg-[#F9F9F9] transition-all">
            <Home size={20} />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-40 text-center font-black animate-pulse text-[#2F6B3A]">PREPARING YOUR SUCCESS...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
