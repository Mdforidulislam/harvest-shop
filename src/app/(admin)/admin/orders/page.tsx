"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Plus, Eye, Edit2, Truck, CheckCircle, Clock, Package, X, ChevronDown, MoreHorizontal, Download, Filter } from "lucide-react";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Status = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const statusCfg: Record<string, { badge: string; icon: typeof Clock; label: string }> = {
  pending: { badge: "badge-premium-warning", icon: Clock, label: "Pending" },
  processing: { badge: "badge-premium-primary", icon: Package, label: "Processing" },
  shipped: { badge: "badge-premium-info", icon: Truck, label: "Shipped" },
  delivered: { badge: "badge-premium-success", icon: CheckCircle, label: "Delivered" },
  cancelled: { badge: "badge-premium-danger", icon: X, label: "Cancelled" },
};

const allOrders = [
  ...fakeOrders,
  { id: "ORD-10028", date: "2026-03-14", status: "delivered" as const, items: fakeOrders[0].items, total: 1800, payment: "COD" },
  { id: "ORD-10021", date: "2026-03-05", status: "cancelled" as const, items: fakeOrders[1].items, total: 900, payment: "bKash" },
  { id: "ORD-10017", date: "2026-02-27", status: "delivered" as const, items: fakeOrders[2].items, total: 650, payment: "SSLCommerz" },
  { id: "ORD-10005", date: "2026-02-10", status: "pending" as const, items: fakeOrders[0].items, total: 2400, payment: "COD" },
];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>("all");
  const [editOrder, setEditOrder] = useState<typeof allOrders[0] | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [orders, setOrders] = useState(allOrders);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" || o.status === status;
    return matchSearch && matchStatus;
  });

  function handleUpdateStatus() {
    if (!editOrder || !newStatus) return;
    setOrders((prev) => prev.map((o) => o.id === editOrder.id ? { ...o, status: newStatus as typeof o.status } : o));
    setEditOrder(null);
  }

  const counts = { all: orders.length, ...Object.fromEntries(Object.keys(statusCfg).map((s) => [s, orders.filter((o) => o.status === s).length])) };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20">

      {/* Header with Stats Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Order Management</h1>
          <p className="text-[var(--text-muted)] font-medium">Monitor and manage your customer harvests from the field to their doorstep.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 rounded-2xl border border-[var(--border)] flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-all">
            <Download size={14} /> Export CSV
          </button>
          <Link href="/admin/orders/new" className="h-12 px-8 rounded-2xl bg-[var(--primary)] text-white flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-[var(--primary-hover)] transition-all shadow-xl shadow-[var(--primary)]/10">
            <Plus size={16} /> Create Order
          </Link>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center bg-[var(--surface)] p-6 rounded-[2rem] border border-[var(--border)]">

        {/* Search */}
        <div className="relative w-full xl:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID or customer..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[var(--surface-2)] border-none text-sm font-bold focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

        <div className="h-8 w-px bg-[var(--border)] hidden xl:block" />

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {(["all", ...Object.keys(statusCfg)] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${status === s ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20" : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"}`}
            >
              <span className="uppercase tracking-widest">{s}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${status === s ? "bg-white/20" : "bg-[var(--surface-2)]"}`}>{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto hidden xl:flex items-center gap-3">
          <button className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-all"><Filter size={18} /></button>
          <button className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-all"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Details</th>
                <th>Purchased Items</th>
                <th>Transaction</th>
                <th>Method</th>
                <th>Date Placed</th>
                <th>Harvest Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-20 text-[var(--text-muted)] font-medium">No orders matching your criteria were found.</td></tr>
              ) : filtered.map((order) => {
                const cfg = statusCfg[order.status];
                const Icon = cfg.icon;
                return (
                  <tr key={order.id} className="group">
                    <td>
                      <Link href={`/admin/orders/${order.id}`} className="font-black text-[var(--primary)] hover:underline">{order.id}</Link>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--primary-soft)] flex items-center justify-center text-[var(--primary)] font-black text-xs uppercase">R</div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[var(--text)]">Rabeya Khatun</span>
                          <span className="text-[10px] text-[var(--text-muted)]">rabeya@example.com</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, i) => (
                          <div key={i} className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-[var(--surface)] shadow-sm bg-[var(--surface-2)]">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="36px" />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black border-2 border-[var(--surface)] bg-[var(--surface-2)] text-[var(--text-muted)]">+{order.items.length - 3}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="font-black text-sm text-[var(--text)]">{formatPrice(order.total)}</span>
                    </td>
                    <td>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-[var(--surface-2)] text-[var(--text-muted)]">{order.payment}</span>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-[var(--text-muted)]">{formatDate(order.date)}</span>
                    </td>
                    <td>
                      <span className={`badge-premium ${cfg.badge}`}>
                        <Icon size={12} /> {cfg.label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/orders/${order.id}`} className="action-btn-p" title="View Details"><Eye size={16} /></Link>
                        <button onClick={() => { setEditOrder(order); setNewStatus(order.status); }} className="action-btn-p" title="Update Status"><Edit2 size={16} /></button>
                        <button className="action-btn-p action-btn-p-danger" title="More Options"><MoreHorizontal size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-6 py-4 bg-[var(--surface)] rounded-[1.5rem] border border-[var(--border)]">
        <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Showing {filtered.length} of {orders.length} entries</p>
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-xl border border-[var(--border)] text-xs font-black uppercase text-[var(--text-muted)] disabled:opacity-30" disabled>Previous</button>
          <button className="h-10 px-4 rounded-xl border border-[var(--border)] text-xs font-black uppercase text-[var(--text-muted)]">Next Page</button>
        </div>
      </div>

      {/* Update status modal */}
      <AnimatePresence>
        {editOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-card p-10 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-2xl font-black mb-1 text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Update Order Flow</h3>
              <p className="text-xs text-[var(--text-muted)] mb-8 uppercase tracking-[0.2em]">Order Registry: {editOrder.id}</p>

              <div className="grid grid-cols-1 gap-3 mb-10">
                {Object.entries(statusCfg).map(([s, cfg]) => (
                  <label
                    key={s}
                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 ${newStatus === s ? "border-[var(--primary)] bg-[var(--primary-soft)]" : "border-transparent bg-[var(--surface-2)]"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${newStatus === s ? "bg-[var(--primary)] text-white" : "bg-[var(--surface)] text-[var(--text-muted)]"}`}>
                        <cfg.icon size={20} />
                      </div>
                      <span className={`text-sm font-black uppercase tracking-widest ${newStatus === s ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}>{cfg.label}</span>
                    </div>
                    <input type="radio" name="status" value={s} checked={newStatus === s} onChange={() => setNewStatus(s)} className="sr-only" />
                    {newStatus === s && <CheckCircle size={20} className="text-[var(--primary)]" />}
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={handleUpdateStatus} className="h-14 flex-1 rounded-2xl bg-[var(--primary)] text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-[var(--primary)]/20 hover:bg-[var(--primary-hover)] transition-all">Apply Status</button>
                <button onClick={() => setEditOrder(null)} className="h-14 flex-1 rounded-2xl bg-[var(--surface-2)] text-[var(--text)] font-black uppercase text-xs tracking-widest hover:bg-[var(--border)] transition-all">Dismiss</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
