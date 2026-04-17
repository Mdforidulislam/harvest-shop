import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin, ArrowLeft } from "lucide-react";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import { use } from "react";

type Props = { params: Promise<{ id: string }> };

const steps = [
  { key: "placed", label: "Order Placed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: MapPin },
];

const statusIndex: Record<string, number> = { pending: 0, processing: 1, shipped: 2, delivered: 3 };

export default function OrderDetailPage({ params }: Props) {
  const { id } = use(params);
  const order = fakeOrders.find((o) => o.id === id) ?? fakeOrders[0];
  const currentStep = statusIndex[order.status] ?? 0;
  const shipping = 60;
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/account/orders" className="btn-sm btn-ghost"><ArrowLeft size={14} /></Link>
        <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order {order.id}</h1>
        <span className={`badge ${order.status === "delivered" ? "badge-success" : order.status === "shipped" ? "badge-primary" : "badge-warning"}`}>{order.status}</span>
      </div>

      {/* Timeline */}
      <div className="card p-5">
        <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Progress</h2>
        <div className="flex items-start justify-between relative">
          <div className="absolute top-4 left-4 right-4 h-0.5" style={{ background: "var(--border)" }} />
          <div className="absolute top-4 left-4 h-0.5 transition-all" style={{ background: "var(--primary)", width: `${(currentStep / (steps.length - 1)) * 100}%` }} />
          {steps.map((step, i) => (
            <div key={step.key} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= currentStep ? "text-white" : ""}`} style={{ background: i <= currentStep ? "var(--primary)" : "var(--surface-2)", border: `2px solid ${i <= currentStep ? "var(--primary)" : "var(--border)"}` }}>
                <step.icon size={14} color={i <= currentStep ? "white" : "var(--text-muted)"} />
              </div>
              <p className="text-[10px] text-center font-medium" style={{ color: i <= currentStep ? "var(--primary)" : "var(--text-muted)" }}>{step.label}</p>
            </div>
          ))}
        </div>
        {order.tracking && (
          <div className="mt-4 p-3 rounded-lg text-sm" style={{ background: "var(--primary-soft)" }}>
            <span className="font-semibold" style={{ color: "var(--primary)" }}>Tracking ID: </span>
            <span style={{ color: "var(--text)" }}>{order.tracking}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Items */}
        <div className="card p-5">
          <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Items Ordered</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--surface-2)]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Qty: {item.qty}</p>
                </div>
                <span className="font-bold text-sm price-num" style={{ color: "var(--text)" }}>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
              <span className="price-num" style={{ color: "var(--text)" }}>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Shipping</span>
              <span className="price-num" style={{ color: "var(--text)" }}>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span style={{ color: "var(--text)" }}>Total</span>
              <span className="price-num" style={{ color: "var(--primary)" }}>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="card p-5">
          <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Shipping Info</h2>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Rabeya Khatun</p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>House 12, Road 5, Block B<br />Gulshan-2, Dhaka 1212</p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Phone: +880 1700-000000</p>
          <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>Payment</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{order.payment} · {formatDate(order.date)}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button className="btn-md btn-secondary">Download Invoice</button>
        {order.status === "pending" && <button className="btn-md btn-danger">Cancel Order</button>}
        {order.status === "delivered" && <button className="btn-md btn-ghost">Reorder</button>}
      </div>
    </div>
  );
}
