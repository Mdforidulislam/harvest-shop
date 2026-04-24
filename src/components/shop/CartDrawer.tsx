"use client";
import { X, ShoppingCart, Plus, Minus, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  selectCartItems, selectCartTotal, selectDrawerOpen,
  setDrawerOpen, removeFromCart, updateQty,
} from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";

// Mock related products — replace with real data/props as needed
const relatedProducts = [
  { id: "r1", name: "Sundarban Honey 15g X 24 pcs (BOX)", price: 768, image: "/images/honey-box.jpg" },
  { id: "r2", name: "Pure Deshi Ghee 500ml", price: 950, image: "/images/ghee-500.jpg" },
  { id: "r3", name: "Organic Mustard Oil 1L", price: 420, image: "/images/mustard-1l.jpg" },
  { id: "r4", name: "Ajwa Dates 500g", price: 1100, image: "/images/dates-500.jpg" },
];

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectDrawerOpen);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const sliderRef = useRef<HTMLDivElement>(null);

  function slideLeft() {
    sliderRef.current?.scrollBy({ left: -180, behavior: "smooth" });
  }
  function slideRight() {
    sliderRef.current?.scrollBy({ left: 180, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50"
            onClick={() => dispatch(setDrawerOpen(false))}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[110] h-full w-full flex flex-col"
            style={{ maxWidth: 420, background: "#fff" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "#e5e7eb" }}
            >
              <span
                className="text-sm font-black uppercase tracking-widest"
                style={{ color: "#111" }}
              >
                SHOPPING CART
              </span>
              <button
                onClick={() => dispatch(setDrawerOpen(false))}
                className="flex items-center gap-1 text-sm font-bold transition-opacity hover:opacity-70"
                style={{ color: "#111" }}
              >
                Close <ArrowRight size={15} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <ShoppingCart size={48} style={{ color: "#ccc" }} />
                  <p className="text-sm font-bold" style={{ color: "#888" }}>
                    Your cart is empty
                  </p>
                  <Link
                    href="/category/all"
                    onClick={() => dispatch(setDrawerOpen(false))}
                    className="px-6 py-2 rounded text-sm font-bold text-white"
                    style={{ background: "#e07a2a" }}
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.variant}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex items-center gap-3 px-4 py-3 border-b"
                      style={{ borderColor: "#f0f0f0" }}
                    >
                      {/* Product image */}
                      <div
                        className="relative shrink-0 rounded"
                        style={{ width: 64, height: 64, background: "#f9f9f9", border: "1px solid #eee" }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-bold leading-tight line-clamp-1 mb-2"
                          style={{ color: "#111" }}
                        >
                          {item.name.length > 22 ? item.name.slice(0, 22) + ".." : item.name}
                        </p>

                        {/* Qty controls + price */}
                        <div className="flex items-center gap-1.5">
                          {/* Minus */}
                          <button
                            onClick={() =>
                              dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty - 1 }))
                            }
                            disabled={item.qty <= 1}
                            className="w-6 h-6 flex items-center justify-center border rounded text-xs font-bold transition-colors hover:bg-gray-100 disabled:opacity-30"
                            style={{ borderColor: "#ddd", color: "#333" }}
                          >
                            -
                          </button>

                          {/* Qty */}
                          <span
                            className="w-6 text-center text-xs font-black"
                            style={{ color: "#111" }}
                          >
                            {item.qty}
                          </span>

                          {/* Plus */}
                          <button
                            onClick={() =>
                              dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty + 1 }))
                            }
                            disabled={item.qty >= item.stock}
                            className="w-6 h-6 flex items-center justify-center border rounded text-xs font-bold transition-colors hover:bg-gray-100 disabled:opacity-30"
                            style={{ borderColor: "#ddd", color: "#333" }}
                          >
                            +
                          </button>

                          <span className="text-xs" style={{ color: "#555" }}>
                            × {formatPrice(item.price)} ={" "}
                            <span className="font-black" style={{ color: "#111" }}>
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id, variant: item.variant }))
                        }
                        className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-red-50"
                        style={{ color: "#aaa" }}
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {/* You May Also Like */}
              {items.length > 0 && (
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-black" style={{ color: "#111" }}>
                        You May Also Like
                      </p>
                      <div
                        className="h-0.5 w-10 mt-0.5 rounded"
                        style={{ background: "#e07a2a" }}
                      />
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={slideLeft}
                        className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:bg-orange-50"
                        style={{ borderColor: "#e07a2a", color: "#e07a2a" }}
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button
                        onClick={slideRight}
                        className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:bg-orange-50"
                        style={{ borderColor: "#e07a2a", color: "#e07a2a" }}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Slider */}
                  <div
                    ref={sliderRef}
                    className="flex gap-3 overflow-x-auto scrollbar-none pb-2"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {relatedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="shrink-0 rounded-lg border flex flex-col"
                        style={{
                          width: 150,
                          borderColor: "#eee",
                          background: "#fff",
                          scrollSnapAlign: "start",
                        }}
                      >
                        <div
                          className="relative rounded-t-lg overflow-hidden"
                          style={{ height: 90, background: "#f9f9f9" }}
                        >
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-contain p-2"
                            sizes="150px"
                          />
                        </div>
                        <div className="p-2 flex flex-col gap-1.5">
                          <p
                            className="text-[11px] font-semibold leading-tight line-clamp-2"
                            style={{ color: "#222" }}
                          >
                            {p.name}
                          </p>
                          <p className="text-xs font-black" style={{ color: "#333" }}>
                            ৳{p.price.toLocaleString()}.00
                          </p>
                          <button
                            className="w-full py-1 rounded text-[11px] font-bold text-white transition-opacity hover:opacity-80"
                            style={{ background: "#e07a2a" }}
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-4 py-4 border-t"
                style={{ borderColor: "#e5e7eb", background: "#fff" }}
              >
                {/* Total */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black" style={{ color: "#111" }}>
                    Total:
                  </span>
                  <span className="text-base font-black" style={{ color: "#111" }}>
                    ৳{total.toLocaleString()}.00
                  </span>
                </div>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={() => dispatch(setDrawerOpen(false))}
                  className="block w-full py-3.5 rounded text-center text-sm font-black text-white tracking-widest uppercase transition-opacity hover:opacity-90"
                  style={{ background: "#e07a2a" }}
                >
                  CHECKOUT
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}