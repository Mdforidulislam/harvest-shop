import Link from "next/link";
import Image from "next/image";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Orders" };

const statusColors: Record<string, string> = {
  pending: "badge-warning",
  processing: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-danger",
};

export default function OrdersPage() {
  return (
    <div className="space-y-5">
      {/* Page Header with track bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
          >
            Order Tracking
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Track your order progress and view details
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="GB-260424516070"
            className="input input-sm"
            style={{ minWidth: 200 }}
          />
          <button className="btn-sm btn-primary">Track</button>
        </div>
      </div>

      {/* Order Cards */}
      {fakeOrders.map((order) => {
        const steps = ["Placed", "Confirmed", "Packed", "In Courier", "Delivered"];
        const statusIndex: Record<string, number> = {
          pending: 0,
          processing: 1,
          packed: 2,
          shipped: 3,
          delivered: 4,
        };
        const currentStep = statusIndex[order.status] ?? 0;

        return (
          <div key={order.id} className="card p-5 space-y-4">
            {/* Card Top */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p
                  className="font-bold text-sm"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
                >
                  Order Timeline
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {order.id} · {formatDate(order.date)}
                </p>
              </div>
              <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
            </div>

            {/* Timeline Progress */}
            <div className="flex items-start justify-between relative">
              {/* Background line */}
              <div
                className="absolute top-4 left-4 right-4 h-0.5"
                style={{ background: "var(--border)" }}
              />
              {/* Active line */}
              <div
                className="absolute top-4 left-4 h-0.5 transition-all"
                style={{
                  background: "var(--primary)",
                  width: `${(currentStep / (steps.length - 1)) * 92}%`,
                }}
              />
              {steps.map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-1.5 relative z-10">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: i <= currentStep ? "var(--primary)" : "var(--surface-2)",
                      border: `2px solid ${i <= currentStep ? "var(--primary)" : "var(--border)"}`,
                      color: i <= currentStep ? "#fff" : "var(--text-muted)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-[10px] font-medium text-center"
                    style={{ color: i <= currentStep ? "var(--primary)" : "var(--text-muted)" }}
                  >
                    {label}
                  </p>
                  {i === currentStep && (
                    <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                      {formatDate(order.date)}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Product Summary */}
            <div
              className="pt-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className="text-sm font-semibold flex items-center gap-2"
                  style={{ color: "var(--text)" }}
                >
                  {/* Shopping bag icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Product Summary
                </p>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {order.items.length} Items
                </span>
              </div>

              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--text)" }}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Qty: {item.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold price-num" style={{ color: "var(--text)" }}>
                        {formatPrice(item.price * item.qty)}
                      </p>
                      <p className="text-[11px] price-num" style={{ color: "var(--text-muted)" }}>
                        {formatPrice(item.price)} / unit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div
              className="flex flex-wrap items-center justify-between gap-2 pt-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <p className="font-bold text-sm price-num" style={{ color: "var(--primary)" }}>
                Total: {formatPrice(order.total)}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="btn-sm btn-secondary"
                >
                  View Details
                </Link>
                {order.status === "delivered" && (
                  <button className="btn-sm btn-ghost text-xs">Reorder</button>
                )}
                {order.tracking && (
                  <a href="#" className="btn-sm btn-ghost text-xs">
                    Track Order
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}