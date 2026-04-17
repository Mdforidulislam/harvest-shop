"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { products } from "@/lib/fake-data";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function NewOrderPage() {
  const router = useRouter();
  const [productSearch, setProductSearch] = useState("");
  const [cart, setCart] = useState<{ product: typeof products[0]; qty: number }[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", district: "Dhaka", division: "Dhaka", payment: "COD", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  ).slice(0, 6);

  function addProduct(p: typeof products[0]) {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === p.id);
      if (existing) return prev.map((c) => c.product.id === p.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { product: p, qty: 1 }];
    });
    setProductSearch("");
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) => prev.map((c) => c.product.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c).filter((c) => c.qty > 0));
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((c) => c.product.id !== id));
  }

  const subtotal = cart.reduce((s, c) => s + (c.product.salePrice ?? c.product.price) * c.qty, 0);
  const shipping = subtotal > 1500 ? 0 : 60;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { router.push("/admin/orders"); }, 1200);
  }

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="btn-sm btn-ghost"><ArrowLeft size={14} /></Link>
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Create New Order</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manually create an order for a customer</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Left: customer + products */}
          <div className="lg:col-span-3 space-y-5">

            {/* Customer details */}
            <div className="card p-5 space-y-4">
              <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Customer Information</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Full Name *</label>
                  <input required className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Customer name" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Phone *</label>
                  <input required type="tel" className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="01700000000" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Email</label>
                <input type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="customer@email.com" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Street Address *</label>
                <input required className="input" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="House, road, area" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Division</label>
                  <select className="input" value={form.division} onChange={(e) => set("division", e.target.value)}>
                    {["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Barishal","Rangpur","Mymensingh"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>District</label>
                  <input className="input" value={form.district} onChange={(e) => set("district", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Order Notes</label>
                <textarea className="input h-16 resize-none py-2" value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Special instructions…" />
              </div>
            </div>

            {/* Add products */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Add Products</h2>
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products to add…"
                  className="input pl-9"
                />
              </div>
              {productSearch && (
                <div className="rounded-xl overflow-hidden mb-3" style={{ border: "1px solid var(--border)" }}>
                  {filteredProducts.length === 0 ? (
                    <p className="p-3 text-sm text-center" style={{ color: "var(--text-muted)" }}>No products found</p>
                  ) : filteredProducts.map((p) => (
                    <button key={p.id} type="button" onClick={() => addProduct(p)}
                      className="flex items-center gap-3 w-full p-3 text-left hover:bg-[var(--surface-2)] transition-colors"
                      style={{ borderBottom: "1px solid var(--border)" }}>
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--surface-2)" }}>
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="36px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{p.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatPrice(p.salePrice ?? p.price)}</p>
                      </div>
                      <Plus size={14} style={{ color: "var(--primary)" }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Cart items */}
              {cart.length === 0 ? (
                <div className="text-center py-8 rounded-xl" style={{ background: "var(--surface-2)" }}>
                  <ShoppingBag size={24} className="mx-auto mb-2" style={{ color: "var(--border)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No products added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map(({ product: p, qty }) => (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{p.name}</p>
                        <p className="text-xs font-bold" style={{ color: "var(--primary)" }}>{formatPrice((p.salePrice ?? p.price) * qty)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => updateQty(p.id, -1)} className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "var(--border)" }}><Minus size={11} /></button>
                        <span className="w-7 text-center text-sm font-bold" style={{ color: "var(--text)" }}>{qty}</span>
                        <button type="button" onClick={() => updateQty(p.id, 1)} className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "var(--border)" }}><Plus size={11} /></button>
                      </div>
                      <button type="button" onClick={() => removeItem(p.id)} style={{ color: "var(--danger)" }}><Trash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: summary */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card p-5 space-y-3">
              <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Payment Method</h2>
              {["COD", "bKash", "Nagad", "SSLCommerz", "Bank Transfer"].map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" value={m} checked={form.payment === m} onChange={() => set("payment", m)} className="accent-[var(--primary)]" />
                  <span className="text-sm" style={{ color: "var(--text)" }}>{m}</span>
                </label>
              ))}
            </div>

            <div className="card p-5 space-y-3">
              <h2 className="font-bold text-sm mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Summary</h2>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Items ({cart.reduce((s, c) => s + c.qty, 0)})</span>
                <span className="price-num" style={{ color: "var(--text)" }}>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Shipping</span>
                <span className="price-num" style={{ color: shipping === 0 ? "var(--success)" : "var(--text)" }}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text)" }}>Total</span>
                <span className="price-num" style={{ color: "var(--primary)" }}>{formatPrice(total)}</span>
              </div>
              <button type="submit" disabled={cart.length === 0 || submitting} className="btn-lg btn-primary w-full mt-2">
                {submitting ? "Creating…" : "Create Order"}
              </button>
              <Link href="/admin/orders" className="btn-lg btn-ghost w-full text-center block">Cancel</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
