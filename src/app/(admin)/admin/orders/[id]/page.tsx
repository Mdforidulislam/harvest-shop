"use client";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Package, Truck, MapPin, Edit2 } from "lucide-react";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";

const statusCfg = {
  pending:    { cls: "badge-warning", label: "Pending" },
  processing: { cls: "badge-primary", label: "Processing" },
  shipped:    { cls: "badge-info",    label: "Shipped" },
  delivered:  { cls: "badge-success", label: "Delivered" },
  cancelled:  { cls: "badge-danger",  label: "Cancelled" },
};

const steps = [
  { key: "pending",    label: "Order Placed",  icon: CheckCircle },
  { key: "processing", label: "Processing",    icon: Package },
  { key: "shipped",    label: "Shipped",       icon: Truck },
  { key: "delivered",  label: "Delivered",     icon: MapPin },
];
const stepIndex: Record<string, number> = { pending: 0, processing: 1, shipped: 2, delivered: 3 };

const allOrders = [
  ...fakeOrders,
  { id: "ORD-10028", date: "2026-03-14", status: "delivered" as const, items: fakeOrders[0].items, total: 1800, payment: "COD" },
  { id: "ORD-10021", date: "2026-03-05", status: "cancelled" as const, items: fakeOrders[1].items, total: 900,  payment: "bKash" },
];

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState(allOrders.find((o) => o.id === id) ?? allOrders[0]);
  const [editing, setEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(order.status);

  const cfg = statusCfg[order.status];
  const currentStep = stepIndex[order.status] ?? 0;
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 60;

  function saveStatus() {
    setOrder((o) => ({ ...o, status: newStatus as typeof o.status }));
    setEditing(false);
  }

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="btn-sm btn-ghost"><ArrowLeft size={14} /></Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{order.id}</h1>
            <span className={`badge ${cfg.cls}`}>{cfg.label}</span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Placed on {formatDate(order.date)} · {order.payment}</p>
        </div>
        <button onClick={() => setEditing(true)} className="btn-sm btn-secondary flex items-center gap-1.5">
          <Edit2 size={13} /> Update Status
        </button>
      </div>

      {/* Timeline */}
      {order.status !== "cancelled" && (
        <div className="card p-5">
          <h2 className="font-bold text-sm mb-5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Progress</h2>
          <div className="flex items-start justify-between relative">
            <div className="absolute top-4 left-4 right-4 h-0.5" style={{ background: "var(--border)" }} />
            <div className="absolute top-4 left-4 h-0.5 transition-all" style={{ background: "var(--primary)", width: `${(currentStep / (steps.length - 1)) * 100}%` }} />
            {steps.map((step, i) => (
              <div key={step.key} className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: i <= currentStep ? "var(--primary)" : "var(--surface-2)", border: `2px solid ${i <= currentStep ? "var(--primary)" : "var(--border)"}` }}>
                  <step.icon size={14} color={i <= currentStep ? "white" : "var(--text-muted)"} />
                </div>
                <p className="text-[10px] text-center font-medium w-16" style={{ color: i <= currentStep ? "var(--primary)" : "var(--text-muted)" }}>{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Items */}
        <div className="card p-5">
          <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Items</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--surface-2)" }}>
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Qty: {item.qty} × {formatPrice(item.price)}</p>
                </div>
                <p className="font-bold text-sm price-num flex-shrink-0" style={{ color: "var(--text)" }}>{formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex justify-between text-sm"><span style={{ color: "var(--text-muted)" }}>Subtotal</span><span className="price-num" style={{ color: "var(--text)" }}>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span style={{ color: "var(--text-muted)" }}>Shipping</span><span className="price-num" style={{ color: "var(--text)" }}>{formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-bold"><span style={{ color: "var(--text)" }}>Total</span><span className="price-num" style={{ color: "var(--primary)" }}>{formatPrice(order.total)}</span></div>
          </div>
        </div>

        {/* Shipping + Payment */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-bold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Shipping Address</h2>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Rabeya Khatun</p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              House 12, Road 5, Block B<br />Gulshan-2, Dhaka 1212, Bangladesh
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>📞 +880 1700-000000</p>
          </div>
          <div className="card p-5">
            <h2 className="font-bold text-sm mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Payment</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "var(--text)" }}>{order.payment}</span>
              <span className="badge badge-success text-xs">Paid</span>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{formatDate(order.date)}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn-md btn-secondary">Download Invoice</button>
        {order.status === "pending" && <button className="btn-md btn-danger" onClick={() => { setOrder((o) => ({ ...o, status: "cancelled" })); }}>Cancel Order</button>}
      </div>

      {/* Status modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-sm" style={{ background: "var(--surface)" }}>
            <h3 className="font-bold text-base mb-4" style={{ color: "var(--text)" }}>Update Status</h3>
            <div className="space-y-2 mb-5">
              {Object.entries(statusCfg).map(([s, c]) => (
                <label key={s} className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer" style={{ background: newStatus === s ? "var(--primary-soft)" : "var(--surface-2)" }}>
                  <input type="radio" checked={newStatus === s} onChange={() => setNewStatus(s as typeof order.status)} className="accent-[var(--primary)]" />
                  <span className={`badge ${c.cls} text-xs`}>{c.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={saveStatus} className="btn-md btn-primary flex-1">Save</button>
              <button onClick={() => setEditing(false)} className="btn-md btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
