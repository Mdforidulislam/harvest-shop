"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Edit2, Trash2, Eye, Star, Package } from "lucide-react";
import { products, categories } from "@/lib/fake-data";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("all");
  const [deleteId, setDeleteId]     = useState<string | null>(null);
  const [productList, setProductList] = useState(products);

  const filtered = productList.filter((p) => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || p.categorySlug === category;
    return matchSearch && matchCategory;
  });

  function confirmDelete() {
    if (deleteId) setProductList((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Products</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{productList.length} products in catalog</p>
        </div>
        <Link href="/admin/products/new" className="btn-md btn-primary flex items-center gap-2">
          <Plus size={15} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className="input pl-9 w-60" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input w-44">
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                {["Product", "Category", "Price", "Stock", "Rating", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12">
                  <Package size={32} className="mx-auto mb-2" style={{ color: "var(--border)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No products found</p>
                </td></tr>
              ) : filtered.map((p, idx) => (
                <tr key={p.id} className="hover:bg-[var(--surface-2)] transition-colors" style={{ borderBottom: idx < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--surface-2)" }}>
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm line-clamp-1" style={{ color: "var(--text)" }}>{p.name}</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge badge-primary text-[10px]">{p.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-sm price-num" style={{ color: "var(--primary)" }}>{formatPrice(p.salePrice ?? p.price)}</p>
                    {p.salePrice && <p className="text-xs line-through price-num" style={{ color: "var(--text-muted)" }}>{formatPrice(p.price)}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge text-[10px] ${p.stock > 10 ? "badge-success" : p.stock > 0 ? "badge-warning" : "badge-danger"}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={11} fill="var(--warning)" color="var(--warning)" />
                      <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{p.rating}</span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>({p.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {p.featured && <span className="badge badge-accent text-[10px]">Featured</span>}
                      {p.isNew && <span className="badge badge-primary text-[10px]">New</span>}
                      {p.isBestSeller && <span className="badge badge-success text-[10px]">Best Seller</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/product/${p.slug}`} target="_blank" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" style={{ color: "var(--text-muted)" }}><Eye size={13} /></Link>
                      <Link href={`/admin/products/${p.id}/edit`} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" style={{ color: "var(--text-muted)" }}><Edit2 size={13} /></Link>
                      <button onClick={() => setDeleteId(p.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors" style={{ color: "var(--danger)" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-sm text-center" style={{ background: "var(--surface)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "#fee2e2" }}>
              <Trash2 size={20} style={{ color: "var(--danger)" }} />
            </div>
            <h3 className="font-bold text-base mb-1" style={{ color: "var(--text)" }}>Delete Product?</h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>This action cannot be undone.</p>
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
