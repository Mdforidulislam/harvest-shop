"use client";
import { ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartCount, selectCartTotal, setDrawerOpen } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";

export default function FloatingCart() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <button
      onClick={() => dispatch(setDrawerOpen(true))}
      aria-label={`Cart, ${cartCount} items, total ${formatPrice(cartTotal)}`}
      className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-[90] flex-col items-center rounded-l-xl overflow-hidden shadow-lg hover:-translate-x-1 hover:shadow-xl transition-all duration-200 focus:outline-none"
      style={{ border: "1px solid var(--border)", borderRight: "none" }}
    >
      {/* Top block: brand bg, icon + count */}
      <div
        className="w-14 flex flex-col items-center justify-center gap-1 py-3 px-2"
        style={{ background: "var(--primary)" }}
      >
        <ShoppingBag size={20} className="text-white" />
        <span className="text-[10px] font-black text-white leading-none whitespace-nowrap">
          {cartCount} Items
        </span>
      </div>

      {/* Bottom block: surface bg, total */}
      <div
        className="w-14 flex items-center justify-center py-2 px-1"
        style={{ background: "var(--surface)" }}
      >
        <span
          className="text-[10px] font-black leading-none whitespace-nowrap"
          style={{ color: "var(--accent)" }}
        >
          {formatPrice(cartTotal)}
        </span>
      </div>
    </button>
  );
}
