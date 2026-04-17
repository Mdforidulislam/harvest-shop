"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, Upload, Loader2 } from "lucide-react";
import { categories } from "@/lib/fake-data";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [tags, setTags]     = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState({
    name: "", nameBn: "", category: "honey", price: "", salePrice: "",
    stock: "", shortDesc: "", description: "", featured: false, isNew: false, isBestSeller: false,
  });

  const set = (k: keyof typeof form, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  function addTag(e: React.KeyboardEvent) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags((p) => [...new Set([...p, tagInput.trim().toLowerCase()])]);
      setTagInput("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => router.push("/admin/products"), 1200);
  }

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="btn-sm btn-ghost"><ArrowLeft size={14} /></Link>
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Add New Product</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Fill in the product details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Main info */}
          <div className="lg:col-span-2 space-y-5">

            {/* Basic info */}
            <div className="card p-5 space-y-4">
              <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Basic Information</h2>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Product Name (English) *</label>
                <input required className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Sundarban Pure Honey 500g" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Product Name (Bengali)</label>
                <input className="input" value={form.nameBn} onChange={(e) => set("nameBn", e.target.value)} placeholder="বাংলায় নাম" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Short Description *</label>
                <textarea required className="input h-16 resize-none py-2" value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} placeholder="Brief one-line description shown on product cards" maxLength={150} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Full Description *</label>
                <textarea required className="input h-28 resize-none py-2" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Detailed product description, sourcing info, benefits…" />
              </div>
            </div>

            {/* Images */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Product Images</h2>
              <div className="grid grid-cols-4 gap-3">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[var(--primary)] transition-colors" style={{ border: "2px dashed var(--border)" }}>
                    <Upload size={16} style={{ color: "var(--text-muted)" }} />
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{i === 0 ? "Main" : `Alt ${i}`}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>PNG, JPG, WEBP. Max 2MB each. First image is the main photo.</p>
            </div>

            {/* Tags */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Tags</h2>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="Type a tag and press Enter"
                className="input mb-2"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
                      #{t}
                      <button type="button" onClick={() => setTags((p) => p.filter((tag) => tag !== t))}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar options */}
          <div className="space-y-5">
            {/* Pricing */}
            <div className="card p-5 space-y-3">
              <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Pricing & Stock</h2>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Price (৳) *</label>
                <input required type="number" min="0" className="input" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Sale Price (৳)</label>
                <input type="number" min="0" className="input" value={form.salePrice} onChange={(e) => set("salePrice", e.target.value)} placeholder="Leave blank if no sale" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Stock Quantity *</label>
                <input required type="number" min="0" className="input" value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="0" />
              </div>
            </div>

            {/* Category */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Category</h2>
              <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>

            {/* Badges */}
            <div className="card p-5">
              <h2 className="font-bold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Labels</h2>
              <div className="space-y-2">
                {([["featured", "Featured"], ["isNew", "New Arrival"], ["isBestSeller", "Best Seller"]] as const).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!form[key]} onChange={(e) => set(key, e.target.checked)} className="w-4 h-4 accent-[var(--primary)]" />
                    <span className="text-sm" style={{ color: "var(--text)" }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button type="submit" disabled={saving} className="btn-lg btn-primary w-full flex items-center justify-center gap-2">
                {saving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : <><Plus size={15} /> Add Product</>}
              </button>
              <Link href="/admin/products" className="btn-lg btn-ghost w-full text-center block">Cancel</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
