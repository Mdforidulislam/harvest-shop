"use client";
import { X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={() => dispatch(setDrawerOpen(false))} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-sm flex flex-col shadow-lg animate-slide-in" style={{ background: "var(--surface)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} style={{ color: "var(--primary)" }} />
            <h2 className="font-semibold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
              Your Cart ({items.length})
            </h2>
          </div>
          <button onClick={() => dispatch(setDrawerOpen(false))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" aria-label="Close">
            <X size={16} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingCart size={48} style={{ color: "var(--border)" }} />
              <p className="font-medium" style={{ color: "var(--text-muted)" }}>Your cart is empty</p>
              <Link href="/category/all" onClick={() => dispatch(setDrawerOpen(false))} className="btn-md btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex gap-3 p-3 rounded-lg" style={{ background: "var(--surface-2)" }}>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1" style={{ color: "var(--text)" }}>{item.name}</p>
                  {item.variant && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.variant}</p>}
                  <p className="text-sm font-bold mt-1 price-num" style={{ color: "var(--primary)" }}>{formatPrice(item.price * item.qty)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                      <button
                        onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty - 1 }))}
                        className="w-6 h-6 flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]"
                        disabled={item.qty <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-medium" style={{ color: "var(--text)" }}>{item.qty}</span>
                      <button
                        onClick={() => dispatch(updateQty({ id: item.id, variant: item.variant, qty: item.qty + 1 }))}
                        className="w-6 h-6 flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]"
                        disabled={item.qty >= item.stock}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart({ id: item.id, variant: item.variant }))}
                      className="w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-red-50"
                      aria-label="Remove"
                    >
                      <Trash2 size={12} style={{ color: "var(--danger)" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <span className="font-bold text-base price-num" style={{ color: "var(--text)" }}>{formatPrice(total)}</span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Shipping calculated at checkout</p>
            <Link href="/checkout" onClick={() => dispatch(setDrawerOpen(false))} className="btn-lg btn-primary w-full justify-center">
              Proceed to Checkout
            </Link>
            <Link href="/cart" onClick={() => dispatch(setDrawerOpen(false))} className="btn-md btn-secondary w-full justify-center text-sm">
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
