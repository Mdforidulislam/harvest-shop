"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Tag } from "lucide-react";
import { categories as initialCategories } from "@/lib/fake-data";

type Cat = { id: string; name: string; nameBn: string; slug: string; icon: string; image: string; count: number };

export default function AdminCategoriesPage() {
  const [cats, setCats]       = useState<Cat[]>(initialCategories);
  const [editing, setEditing] = useState<Cat | null>(null);
  const [adding, setAdding]   = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm]       = useState({ name: "", nameBn: "", slug: "", icon: "🌿", image: "" });

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  function openEdit(c: Cat) {
    setEditing(c);
    setForm({ name: c.name, nameBn: c.nameBn, slug: c.slug, icon: c.icon, image: c.image });
    setAdding(false);
  }

  function openAdd() {
    setEditing(null);
    setForm({ name: "", nameBn: "", slug: "", icon: "🌿", image: "" });
    setAdding(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      setCats((p) => p.map((c) => c.id === editing.id ? { ...c, ...form } : c));
    } else {
      setCats((p) => [...p, { id: `c${Date.now()}`, ...form, count: 0 }]);
    }
    setEditing(null);
    setAdding(false);
  }

  function confirmDelete() {
    if (deleteId) setCats((p) => p.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Categories</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{cats.length} product categories</p>
        </div>
        <button onClick={openAdd} className="btn-md btn-primary flex items-center gap-2">
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cats.map((c) => (
          <div key={c.id} className="card overflow-hidden group">
            <div className="relative h-28 overflow-hidden" style={{ background: "var(--surface-2)" }}>
              <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="300px" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              <span className="absolute top-2 left-2 text-2xl">{c.icon}</span>
              <div className="absolute bottom-2 right-2 flex gap-1">
                <button onClick={() => openEdit(c)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/90 hover:bg-white transition-colors" style={{ color: "var(--text)" }}>
                  <Edit2 size={12} />
                </button>
                <button onClick={() => setDeleteId(c.id)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/90 hover:bg-red-50 transition-colors" style={{ color: "var(--danger)" }}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="font-bold text-sm" style={{ color: "var(--text)" }}>{c.name}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{c.nameBn} · {c.count} products</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>/{c.slug}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit form modal */}
      {(adding || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-md" style={{ background: "var(--surface)" }}>
            <h3 className="font-bold text-base mb-5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
              {editing ? "Edit Category" : "New Category"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Name (EN) *</label>
                  <input required className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Raw Honey" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Name (BN)</label>
                  <input className="input" value={form.nameBn} onChange={(e) => set("nameBn", e.target.value)} placeholder="মধু" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Slug *</label>
                  <input required className="input" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="raw-honey" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Icon (Emoji)</label>
                  <input className="input text-xl" value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="🍯" maxLength={2} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Image URL</label>
                <input className="input" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://…" />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="btn-md btn-primary flex-1">{editing ? "Save Changes" : "Add Category"}</button>
                <button type="button" onClick={() => { setEditing(null); setAdding(false); }} className="btn-md btn-ghost flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-sm text-center" style={{ background: "var(--surface)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "#fee2e2" }}>
              <Tag size={20} style={{ color: "var(--danger)" }} />
            </div>
            <h3 className="font-bold mb-1" style={{ color: "var(--text)" }}>Delete Category?</h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>Products in this category won't be deleted but will become uncategorized.</p>
            <div className="flex gap-2">
              <button onClick={confirmDelete} className="btn-md btn-danger flex-1">Delete</button>
              <button onClick={() => setDeleteId(null)} className="btn-md btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
