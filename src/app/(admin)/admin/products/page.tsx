"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Edit2, Trash2, Eye, Star, Package, Filter, MoreHorizontal, Download, Share2 } from "lucide-react";
import { products, categories } from "@/lib/fake-data";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [productList, setProductList] = useState(products);

  const filtered = productList.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || p.categorySlug === category;
    return matchSearch && matchCategory;
  });

  function confirmDelete() {
    if (deleteId) setProductList((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20">

      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Catalogue Repository</h1>
          <p className="text-[var(--text-muted)] font-medium">Manage your organic inventory, curate categories, and monitor stock health.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 rounded-2xl border border-[var(--border)] flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-all">
            <Download size={14} /> Sync Catalog
          </button>
          <Link href="/admin/products/new" className="h-12 px-8 rounded-2xl bg-[var(--primary)] text-white flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-[var(--primary-hover)] transition-all shadow-xl shadow-[var(--primary)]/10">
            <Plus size={16} /> New Harvest
          </Link>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center bg-[var(--surface)] p-6 rounded-[2.5rem] border border-[var(--border)]">

        <div className="relative w-full xl:w-96">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID or SKU..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[var(--surface-2)] border-none text-sm font-bold focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

        <div className="h-8 w-px bg-[var(--border)] hidden xl:block" />

        <div className="flex gap-4">
          <div className="relative">
            <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 pl-10 pr-10 rounded-xl bg-[var(--surface-2)] border-none text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[var(--primary)] outline-none appearance-none"
            >
              <option value="all">All Sections</option>
              {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="ml-auto hidden xl:flex items-center gap-3">
          <button className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-all"><Share2 size={18} /></button>
          <button className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-all"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      {/* Main Table Interface */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product Snapshot</th>
                <th>Category</th>
                <th>Pricing</th>
                <th>Stock Level</th>
                <th>Customer Interest</th>
                <th>Campaigns</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-24">
                  <Package size={48} className="mx-auto mb-4 text-[var(--border)]" />
                  <p className="text-lg font-black text-[var(--text-muted)]">No harvests found in this section.</p>
                </td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="group">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] group-hover:border-[var(--primary)] transition-colors">
                        <Image src={p.images[0]} alt={p.name} fill className="object-contain p-2" sizes="56px" />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-black text-sm text-[var(--text)] line-clamp-1">{p.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge-premium badge-premium-primary">{p.category}</span>
                  </td>
                  <td>
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-black text-sm text-[var(--accent)]">{formatPrice(p.salePrice ?? p.price)}</span>
                      {p.salePrice && <span className="text-[10px] line-through text-[var(--text-muted)] opacity-50">{formatPrice(p.price)}</span>}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-2 w-32">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                        <span>{p.stock > 0 ? "Inventory" : "Sold Out"}</span>
                        <span className={p.stock > 10 ? "text-[var(--success)]" : "text-[var(--danger)]"}>{p.stock}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}
                          className={`h-full rounded-full ${p.stock > 10 ? "bg-[var(--success)]" : "bg-[var(--danger)]"}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-2)] w-fit">
                      <Star size={12} fill="#FFB400" className="text-[#FFB400]" />
                      <span className="text-xs font-black text-[var(--text)]">{p.rating}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">({p.reviewCount})</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1.5 min-w-[120px]">
                      {p.featured && <span className="text-[8px] font-black uppercase tracking-widest border border-[var(--accent)] text-[var(--accent)] px-2 py-0.5 rounded">Featured</span>}
                      {p.isNew && <span className="text-[8px] font-black uppercase tracking-widest border border-[var(--primary)] text-[var(--primary)] px-2 py-0.5 rounded">New Harvest</span>}
                      {p.isBestSeller && <span className="text-[8px] font-black uppercase tracking-widest border border-blue-500 text-blue-500 px-2 py-0.5 rounded">Top Seller</span>}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <Link href={`/product/${p.slug}`} target="_blank" className="action-btn-p" title="Global View"><Eye size={16} /></Link>
                      <Link href={`/admin/products/${p.id}/edit`} className="action-btn-p" title="Edit Metadata"><Edit2 size={16} /></Link>
                      <button onClick={() => setDeleteId(p.id)} className="action-btn-p action-btn-p-danger" title="Purge Product"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-card p-12 w-full max-w-sm text-center shadow-2xl"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-red-50 flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-[var(--text)]">Purge Harvest?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-10">This record will be permanently removed from the central catalogue repository.</p>
              <div className="flex gap-3">
                <button onClick={confirmDelete} className="h-14 flex-1 rounded-2xl bg-red-500 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-red-500/10 hover:bg-red-600 transition-all">Yes, Purge</button>
                <button onClick={() => setDeleteId(null)} className="h-14 flex-1 rounded-2xl bg-[var(--surface-2)] text-[var(--text)] font-black uppercase text-xs tracking-widest hover:bg-[var(--border)] transition-all">Dismiss</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
