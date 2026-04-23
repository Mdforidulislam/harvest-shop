"use client";
import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin, ShoppingBag, Home, BadgeCheck } from "lucide-react";
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
    <div className="bg-[var(--bg)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20 md:py-32">

        {/* Success Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-green-900/20 mb-10"
            style={{ background: "var(--cta-green)" }}
          >
            <CheckCircle size={48} className="text-white" strokeWidth={3} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Successfully <span style={{ color: "var(--cta-green)" }}>Placed!</span>
          </motion.h1>

          <p className="text-lg text-[var(--text-muted)] font-medium max-w-xl mx-auto leading-relaxed">
            Fantastic choice! We&apos;ve received your order and our harvesters are already at work to package your goodness.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-[var(--surface)] rounded-[2.5rem] border border-[var(--border)] shadow-xl shadow-black/5 overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-[var(--border)] mb-12">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Order Reference</p>
                <h2 className="text-2xl font-black text-[var(--accent)] tracking-tight">{orderId}</h2>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: "color-mix(in srgb, var(--cta-green) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--cta-green) 15%, transparent)" }}>
                <BadgeCheck size={20} style={{ color: "var(--cta-green)" }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--cta-green)" }}>Payment Verified</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative flex justify-between gap-4">
              <div className="absolute top-6 left-8 right-8 h-1 bg-[var(--surface-2)] z-0 hidden md:block" />
              {steps.map((step) => (
                <div key={step.label} className="flex flex-col items-center flex-1 relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500"
                    style={step.done
                      ? { background: "var(--cta-green)", color: "white", boxShadow: "0 20px 40px color-mix(in srgb, var(--cta-green) 30%, transparent)" }
                      : { background: "var(--surface-2)", color: "var(--text-muted)" }
                    }
                  >
                    <step.icon size={20} strokeWidth={2.5} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-center mb-1" style={{ color: step.done ? "var(--cta-green)" : "var(--text-muted)" }}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/category/all" className="h-16 px-12 rounded-2xl bg-[var(--accent)] text-white font-black flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20 hover:scale-105 transition-all">
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>
          <Link href="/" className="h-16 px-12 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)] text-[var(--text)] font-black flex items-center justify-center gap-3 hover:bg-[var(--surface-2)] transition-all">
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
    <Suspense fallback={<div className="py-40 text-center font-black animate-pulse" style={{ color: "var(--cta-green)" }}>PREPARING YOUR SUCCESS...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
