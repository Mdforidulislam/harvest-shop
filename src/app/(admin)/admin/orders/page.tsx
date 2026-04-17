"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Plus, Eye, Edit2, Truck, CheckCircle, Clock, Package, X, ChevronDown } from "lucide-react";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";

type Status = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const statusCfg: Record<string, { cls: string; icon: typeof Clock; label: string; color: string }> = {
  pending:    { cls: "badge-warning",  icon: Clock,        label: "Pending",    color: "var(--warning)" },
  processing: { cls: "badge-primary",  icon: Package,      label: "Processing", color: "var(--primary)" },
  shipped:    { cls: "badge-info",     icon: Truck,        label: "Shipped",    color: "var(--info)" },
  delivered:  { cls: "badge-success",  icon: CheckCircle,  label: "Delivered",  color: "var(--success)" },
  cancelled:  { cls: "badge-danger",   icon: X,            label: "Cancelled",  color: "var(--danger)" },
};

// Expand fake orders for demo
const allOrders = [
  ...fakeOrders,
  { id: "ORD-10028", date: "2026-03-14", status: "delivered" as const, items: fakeOrders[0].items, total: 1800, payment: "COD" },
  { id: "ORD-10021", date: "2026-03-05", status: "cancelled" as const, items: fakeOrders[1].items, total: 900,  payment: "bKash" },
  { id: "ORD-10017", date: "2026-02-27", status: "delivered" as const, items: fakeOrders[2].items, total: 650,  payment: "SSLCommerz" },
  { id: "ORD-10005", date: "2026-02-10", status: "pending"   as const, items: fakeOrders[0].items, total: 2400, payment: "COD" },
];

export default function AdminOrdersPage() {
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState<Status>("all");
  const [editOrder, setEditOrder] = useState<typeof allOrders[0] | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [orders, setOrders]   = useState(allOrders);

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
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Orders</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{orders.length} total orders</p>
        </div>
        <Link href="/admin/orders/new" className="btn-md btn-primary flex items-center gap-2">
          <Plus size={15} /> New Order
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: "var(--surface-2)" }}>
        {(["all", ...Object.keys(statusCfg)] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
            style={{
              background: status === s ? "var(--surface)" : "transparent",
              color: status === s ? "var(--text)" : "var(--text-muted)",
              boxShadow: status === s ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: status === s ? "var(--primary-soft)" : "var(--border)", color: status === s ? "var(--primary)" : "var(--text-muted)" }}>
              {counts[s as keyof typeof counts] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID…"
          className="input pl-9 w-full max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                {["Order ID", "Customer", "Items", "Total", "Payment", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-sm" style={{ color: "var(--text-muted)" }}>No orders found</td></tr>
              ) : filtered.map((order, idx) => {
                const cfg = statusCfg[order.status];
                const Icon = cfg.icon;
                return (
                  <tr key={order.id} className="transition-colors hover:bg-[var(--surface-2)]" style={{ borderBottom: idx < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/${order.id}`} className="font-semibold hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text)" }}>{order.id}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--primary)" }}>R</div>
                        <span className="text-xs" style={{ color: "var(--text)" }}>Rabeya Khatun</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex -space-x-1.5">
                        {order.items.slice(0, 3).map((item, i) => (
                          <div key={i} className="relative w-7 h-7 rounded-md overflow-hidden border" style={{ borderColor: "var(--surface)" }}>
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="28px" />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>+{order.items.length - 3}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(order.total)}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{order.payment}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(order.date)}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${cfg.cls} text-[10px] inline-flex items-center gap-0.5`}>
                        <Icon size={9} /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/admin/orders/${order.id}`} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" style={{ color: "var(--text-muted)" }}><Eye size={13} /></Link>
                        <button onClick={() => { setEditOrder(order); setNewStatus(order.status); }} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" style={{ color: "var(--text-muted)" }}><Edit2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update status modal */}
      {editOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-sm" style={{ background: "var(--surface)" }}>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Update Order Status</h3>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{editOrder.id}</p>
            <div className="space-y-2 mb-5">
              {Object.entries(statusCfg).map(([s, cfg]) => (
                <label key={s} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors" style={{ background: newStatus === s ? "var(--primary-soft)" : "var(--surface-2)" }}>
                  <input type="radio" name="status" value={s} checked={newStatus === s} onChange={() => setNewStatus(s)} className="accent-[var(--primary)]" />
                  <span className={`badge ${cfg.cls} text-xs`}>{cfg.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={handleUpdateStatus} className="btn-md btn-primary flex-1">Update</button>
              <button onClick={() => setEditOrder(null)} className="btn-md btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
