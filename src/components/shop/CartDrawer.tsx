"use client";
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  selectCartItems, selectCartTotal, selectDrawerOpen,
  setDrawerOpen, removeFromCart, updateQty,
} from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectDrawerOpen);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => dispatch(setDrawerOpen(false))}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[110] h-full w-full max-w-md flex flex-col bg-white shadow-[0_0_100px_rgba(0,0,0,0.2)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-soft)] flex items-center justify-center text-[var(--primary)]">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                    Harvest Basket
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{items.length} Goodies Selected</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(setDrawerOpen(false))}
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--surface-2)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-none">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full gap-8 text-center"
                  >
                    <div className="w-32 h-32 rounded-[3.5rem] bg-[var(--surface-2)] flex items-center justify-center shadow-inner">
                      <ShoppingCart size={48} className="opacity-10 text-[var(--text)]" />
                    </div>
                    <div>
                      <p className="text-xl font-black mb-2 leading-tight">Your basket is empty of harvests.</p>
                      <p className="text-sm font-bold opacity-40 max-w-[200px] mx-auto">Start exploring our organic fields to find something special.</p>
                    </div>
                    <Link
                      href="/category/all"
                      onClick={() => dispatch(setDrawerOpen(false))}
                      className="h-14 px-10 rounded-2xl bg-[var(--primary)] text-white font-black flex items-center justify-center gap-2 shadow-2xl shadow-green-900/40 hover:scale-105 transition-all active:scale-95"
                    >
                      Explore Farm
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.variant}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 group"
                    >
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[var(--surface-2)] shadow-inner">
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" sizes="96px" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-sm font-black text-[var(--text)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-1">{item.name}</h3>
                            <button
                              onClick={() => dispatch(removeFromCart({ id: item.id, variant: item.variant }))}
                              className="text-[var(--danger)] hover:scale-110 transition-transform p-1 opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">{item.variant || "Natural Size"}</p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center bg-[var(--surface-2)] p-1 rounded-xl h-9 w-24 border border-black/5">
                            <button
                              onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty - 1 }))}
                              className="flex-1 h-full flex items-center justify-center hover:bg-white rounded-lg transition-all disabled:opacity-20"
                              disabled={item.qty <= 1}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-xs font-black">{item.qty}</span>
                            <button
                              onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty + 1 }))}
                              className="flex-1 h-full flex items-center justify-center hover:bg-white rounded-lg transition-all disabled:opacity-20"
                              disabled={item.qty >= item.stock}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-base font-black text-[var(--primary)]">{formatPrice(item.price * item.qty)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-black/5 bg-[var(--surface-2)]/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Subtotal Value</span>
                  <span className="text-2xl font-black text-[var(--text)]">{formatPrice(total)}</span>
                </div>

                <div className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-black/5 mb-6">
                  <Sparkles size={16} className="text-[var(--primary)]" />
                  <p className="text-[10px] font-bold opacity-60">You are eligible for <span className="font-black text-[var(--primary)]">Special Gifting</span> on this harvest.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/checkout"
                    onClick={() => dispatch(setDrawerOpen(false))}
                    className="group h-16 rounded-[1.5rem] bg-[var(--primary)] text-white font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-green-900/20 active:scale-[0.98] transition-all"
                  >
                    Plant Order <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => dispatch(setDrawerOpen(false))}
                    className="h-16 rounded-[1.5rem] bg-white border border-black/10 text-[var(--text)] font-black text-sm flex items-center justify-center hover:bg-[var(--surface-2)] transition-all"
                  >
                    View Basket Rituals
                  </Link>
                </div>
                <p className="text-[10px] text-center font-bold opacity-30 px-6 leading-relaxed">
                  Harvest ensures pesticide-free delivery within 48 hours for regular orders.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
