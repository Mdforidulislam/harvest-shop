"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Copy, Ticket, CheckCircle } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";

type Coupon = {
  id: string; code: string; type: "percent" | "fixed"; value: number;
  minOrder: number; maxUses: number; used: number;
  expiry: string; active: boolean; desc: string;
};

const initial: Coupon[] = [
  { id: "cp1", code: "FRESH10",   type: "percent", value: 10, minOrder: 500,  maxUses: 500, used: 142, expiry: "2026-06-30", active: true,  desc: "10% off all orders" },
  { id: "cp2", code: "WELCOME50", type: "fixed",   value: 50, minOrder: 300,  maxUses: 200, used: 198, expiry: "2026-12-31", active: true,  desc: "৳50 off for new users" },
  { id: "cp3", code: "HONEY20",   type: "percent", value: 20, minOrder: 800,  maxUses: 100, used: 87,  expiry: "2026-05-15", active: true,  desc: "20% off honey products" },
  { id: "cp4", code: "EID2026",   type: "percent", value: 15, minOrder: 1000, maxUses: 300, used: 0,   expiry: "2026-04-22", active: false, desc: "Eid special discount" },
  { id: "cp5", code: "FREESHIP",  type: "fixed",   value: 60, minOrder: 600,  maxUses: 150, used: 63,  expiry: "2026-07-01", active: true,  desc: "Free shipping coupon" },
];

const blank: Omit<Coupon, "id" | "used"> = {
  code: "", type: "percent", value: 10, minOrder: 500, maxUses: 100, expiry: "", active: true, desc: "",
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons]   = useState<Coupon[]>(initial);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copied, setCopied]     = useState<string | null>(null);
  const [form, setForm]         = useState<Omit<Coupon, "id" | "used">>({ ...blank });

  const set = (k: keyof typeof form, v: string | number | boolean) => setForm((p) => ({ ...p, [k]: v }));

  function openEdit(c: Coupon) {
    setEditId(c.id);
    setForm({ code: c.code, type: c.type, value: c.value, minOrder: c.minOrder, maxUses: c.maxUses, expiry: c.expiry, active: c.active, desc: c.desc });
    setShowForm(true);
  }

  function openAdd() {
    setEditId(null);
    setForm({ ...blank });
    setShowForm(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editId) {
      setCoupons((p) => p.map((c) => c.id === editId ? { ...c, ...form } : c));
    } else {
      setCoupons((p) => [...p, { id: `cp${Date.now()}`, used: 0, ...form }]);
    }
    setShowForm(false);
    setEditId(null);
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  }

  function toggleActive(id: string) {
    setCoupons((p) => p.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Coupons</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{coupons.filter(c => c.active).length} active coupons</p>
        </div>
        <button onClick={openAdd} className="btn-md btn-primary flex items-center gap-2">
          <Plus size={15} /> Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Coupons",  value: coupons.length,                              color: "var(--primary)", bg: "var(--primary-soft)" },
          { label: "Active",         value: coupons.filter(c => c.active).length,        color: "var(--success)", bg: "#dcfce7" },
          { label: "Total Uses",     value: coupons.reduce((s, c) => s + c.used, 0),     color: "var(--accent)",  bg: "var(--accent-soft)" },
          { label: "Discount Given", value: `${coupons.filter(c=>c.type==="percent").length}% / ৳ types`, color: "var(--info)", bg: "#dbeafe" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="card p-4 text-center">
            <p className="text-xl font-bold price-num" style={{ color, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Coupon cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {coupons.map((c) => {
          const usagePct = Math.min(100, Math.round((c.used / c.maxUses) * 100));
          const expired  = new Date(c.expiry) < new Date();
          return (
            <div key={c.id} className="card p-4" style={{ opacity: !c.active || expired ? 0.65 : 1 }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-soft)" }}>
                    <Ticket size={15} style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm font-mono tracking-wide" style={{ color: "var(--text)" }}>{c.code}</span>
                      <button onClick={() => copyCode(c.code)} className="w-5 h-5 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                        {copied === c.code ? <CheckCircle size={12} style={{ color: "var(--success)" }} /> : <Copy size={11} />}
                      </button>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{c.desc}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(c)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)]" style={{ color: "var(--text-muted)" }}><Edit2 size={12} /></button>
                  <button onClick={() => setDeleteId(c.id)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50" style={{ color: "var(--danger)" }}><Trash2 size={12} /></button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-accent text-sm font-bold">
                  {c.type === "percent" ? `${c.value}% OFF` : `৳${c.value} OFF`}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>min ৳{c.minOrder}</span>
                {expired ? (
                  <span className="ml-auto badge badge-danger text-[10px]">Expired</span>
                ) : (
                  <span className="ml-auto text-[10px]" style={{ color: "var(--text-muted)" }}>Exp: {formatDate(c.expiry)}</span>
                )}
              </div>

              {/* Usage bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] mb-1" style={{ color: "var(--text-muted)" }}>
                  <span>{c.used} used</span><span>{c.maxUses} max</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full" style={{ width: `${usagePct}%`, background: usagePct > 80 ? "var(--danger)" : "var(--primary)" }} />
                </div>
              </div>

              {/* Toggle */}
              <button onClick={() => toggleActive(c.id)} className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors ${c.active ? "hover:bg-red-50" : "hover:bg-green-50"}`}
                style={{ color: c.active ? "var(--danger)" : "var(--success)", border: `1px solid ${c.active ? "var(--danger)" : "var(--success)"}` }}>
                {c.active ? "Deactivate" : "Activate"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Create/Edit modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-md overflow-y-auto max-h-[90vh]" style={{ background: "var(--surface)" }}>
            <h3 className="font-bold text-base mb-5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
              {editId ? "Edit Coupon" : "Create Coupon"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Coupon Code *</label>
                <input required className="input font-mono uppercase" value={form.code} onChange={(e) => set("code", e.target.value.toUpperCase())} placeholder="SAVE20" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Description</label>
                <input className="input" value={form.desc} onChange={(e) => set("desc", e.target.value)} placeholder="Brief description" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Discount Type</label>
                  <select className="input" value={form.type} onChange={(e) => set("type", e.target.value as "percent" | "fixed")}>
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Value *</label>
                  <input required type="number" min="1" className="input" value={form.value} onChange={(e) => set("value", Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Min Order (৳)</label>
                  <input type="number" min="0" className="input" value={form.minOrder} onChange={(e) => set("minOrder", Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Max Uses</label>
                  <input type="number" min="1" className="input" value={form.maxUses} onChange={(e) => set("maxUses", Number(e.target.value))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Expiry Date *</label>
                <input required type="date" className="input" value={form.expiry} onChange={(e) => set("expiry", e.target.value)} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="accent-[var(--primary)] w-4 h-4" />
                <span className="text-sm" style={{ color: "var(--text)" }}>Active (visible to customers)</span>
              </label>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="btn-md btn-primary flex-1">{editId ? "Save Changes" : "Create Coupon"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-md btn-ghost flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-sm text-center" style={{ background: "var(--surface)" }}>
            <h3 className="font-bold mb-1" style={{ color: "var(--text)" }}>Delete Coupon?</h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => { setCoupons(p => p.filter(c => c.id !== deleteId)); setDeleteId(null); }} className="btn-md btn-danger flex-1">Delete</button>
              <button onClick={() => setDeleteId(null)} className="btn-md btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
