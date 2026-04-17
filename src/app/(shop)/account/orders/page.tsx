import Link from "next/link";
import Image from "next/image";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Orders" };

const statusColors: Record<string, string> = {
  pending: "badge-warning", processing: "badge-info",
  shipped: "badge-primary", delivered: "badge-success", cancelled: "badge-danger",
};

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>My Orders</h1>
      {fakeOrders.map((order) => (
        <div key={order.id} className="card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <p className="font-bold text-sm" style={{ color: "var(--text)" }}>{order.id}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Placed on {formatDate(order.date)} · Payment: {order.payment}</p>
            </div>
            <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
          </div>
          <div className="space-y-2 mb-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Qty: {item.qty} × {formatPrice(item.price)}</p>
                </div>
                <p className="text-sm font-bold price-num" style={{ color: "var(--text)" }}>{formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="font-bold text-sm price-num" style={{ color: "var(--primary)" }}>Total: {formatPrice(order.total)}</p>
            <div className="flex gap-2">
              <Link href={`/account/orders/${order.id}`} className="btn-sm btn-secondary">View Details</Link>
              {order.status === "delivered" && <button className="btn-sm btn-ghost text-xs">Reorder</button>}
              {order.tracking && <a href="#" className="btn-sm btn-ghost text-xs">Track Order</a>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
