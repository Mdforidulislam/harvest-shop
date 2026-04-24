import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import { use } from "react";

type Props = { params: Promise<{ id: string }> };

const steps = ["Placed", "Confirmed", "Packed", "In Courier", "Delivered"];

const statusIndex: Record<string, number> = {
  pending: 0,
  processing: 1,
  packed: 2,
  shipped: 3,
  delivered: 4,
};

const statusColors: Record<string, string> = {
  pending: "badge-warning",
  processing: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-danger",
};

export default function OrderDetailPage({ params }: Props) {
  const { id } = use(params);
  const order = fakeOrders.find((o) => o.id === id) ?? fakeOrders[0];
  const currentStep = statusIndex[order.status] ?? 0;
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = order.total - subtotal;
  const totalPaid = 0; // adjust from your data model
  const amountDue = order.total - totalPaid;

  return (
    <div className="space-y-5">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <Link href="/account/orders" className="btn-sm btn-ghost">
          <ArrowLeft size={14} />
        </Link>
        <div>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
          >
            Order Tracking
          </h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Track your order progress and view details
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <input
            type="text"
            defaultValue={order.id}
            className="input input-sm"
            style={{ minWidth: 200 }}
          />
          <button className="btn-sm btn-primary">Track</button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Timeline card */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="font-semibold text-sm flex items-center gap-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
              >
                {/* Clock icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Order Timeline
              </h2>
              <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
            </div>

            {/* Steps */}
            <div className="flex items-start justify-between relative">
              <div
                className="absolute top-4 left-4 right-4 h-0.5"
                style={{ background: "var(--border)" }}
              />
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
          </div>

          {/* Product Summary card */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="font-semibold text-sm flex items-center gap-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Product Summary
              </h2>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {order.items.length} Items
              </span>
            </div>

            <div className="space-y-4">
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
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>
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
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* Order Summary */}
          <div className="card p-5">
            <h2
              className="font-semibold text-sm mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
            >
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                <span className="price-num font-medium" style={{ color: "var(--text)" }}>
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--text-muted)" }}>Delivery Fee</span>
                <span className="price-num font-medium" style={{ color: "var(--text)" }}>
                  + {formatPrice(deliveryFee)}
                </span>
              </div>
            </div>

            <div
              className="mt-3 pt-3 flex justify-between items-center"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span className="font-bold text-sm" style={{ color: "var(--text)" }}>
                Grand Total
              </span>
              <span className="font-bold text-base price-num" style={{ color: "var(--text)" }}>
                {formatPrice(order.total)}
              </span>
            </div>

            <div
              className="mt-3 pt-3 space-y-2 text-sm"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="flex justify-between">
                <span style={{ color: "var(--success, #16a34a)", fontWeight: 500 }}>
                  Total Paid
                </span>
                <span
                  className="price-num font-medium"
                  style={{ color: "var(--success, #16a34a)" }}
                >
                  {formatPrice(totalPaid)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--danger, #dc2626)", fontWeight: 500 }}>
                  Amount Due
                </span>
                <span
                  className="price-num font-bold"
                  style={{ color: "var(--danger, #dc2626)" }}
                >
                  {formatPrice(amountDue)}
                </span>
              </div>
            </div>

            {/* Payment status */}
            <div
              className="mt-4 pt-4 flex flex-col items-center gap-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <p
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Payment Status
              </p>
              <span
                className="badge"
                style={{
                  background: totalPaid >= order.total ? "#dcfce7" : "#fef3c7",
                  color: totalPaid >= order.total ? "#166534" : "#92400e",
                  padding: "5px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {totalPaid >= order.total ? "Paid" : "Unpaid"}
              </span>

              {amountDue > 0 && (
                <button
                  className="w-full mt-1 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "var(--text)", border: "none", cursor: "pointer" }}
                >
                  Pay Remaining Amount
                </button>
              )}
            </div>
          </div>

          {/* Shipping Details */}
          <div className="card p-5">
            <h2
              className="font-semibold text-sm mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
            >
              Shipping Details
            </h2>

            <div className="space-y-3">
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Customer
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  Rabeya Khatun
                </p>
              </div>

              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Phone
                </p>
                <p
                  className="text-sm font-mono px-2 py-0.5 rounded"
                  style={{
                    color: "var(--primary)",
                    background: "var(--primary-soft)",
                    display: "inline-block",
                  }}
                >
                  +880 1700-000000
                </p>
              </div>

              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Delivery Address
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                  House 12, Road 5, Block B
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Gulshan-2, Dhaka 1212
                </p>
              </div>

              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Payment Method
                </p>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  {order.payment}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <button className="btn-md btn-secondary flex-1">Download Invoice</button>
            {order.status === "pending" && (
              <button className="btn-md btn-danger flex-1">Cancel Order</button>
            )}
            {order.status === "delivered" && (
              <button className="btn-md btn-ghost flex-1">Reorder</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}