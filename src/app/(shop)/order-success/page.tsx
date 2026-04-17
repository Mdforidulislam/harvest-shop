"use client";
import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("id") ?? "ORD-00000";

  const steps = [
    { icon: CheckCircle, label: "Order Placed", done: true },
    { icon: Package, label: "Processing", done: false },
    { icon: Truck, label: "Shipped", done: false },
    { icon: MapPin, label: "Delivered", done: false },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "var(--primary-soft)" }}>
        <CheckCircle size={40} style={{ color: "var(--primary)" }} />
      </div>
      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Placed Successfully!</h1>
      <p className="mb-1" style={{ color: "var(--text-muted)" }}>Thank you for shopping with Harvest.</p>
      <p className="text-sm font-medium mb-8" style={{ color: "var(--primary)" }}>Order ID: {orderId}</p>

      {/* Status stepper */}
      <div className="card p-6 mb-8 text-left">
        <h2 className="font-semibold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Status</h2>
        <div className="flex justify-between">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step.done ? "bg-[var(--primary)]" : "bg-[var(--surface-2)]"}`}>
                <step.icon size={16} color={step.done ? "white" : "var(--text-muted)"} />
              </div>
              <p className="text-[10px] text-center" style={{ color: step.done ? "var(--primary)" : "var(--text-muted)" }}>{step.label}</p>
              {i < steps.length - 1 && (
                <div className="absolute" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 mb-6 text-left">
        <p className="text-sm" style={{ color: "var(--text)" }}>
          <strong>Estimated Delivery:</strong> 2–3 business days<br />
          <strong>Payment:</strong> Cash on Delivery<br />
          <strong>Tracking:</strong> Will be sent via SMS once shipped.
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Link href="/account/orders" className="btn-md btn-secondary">View Orders</Link>
        <Link href="/category/all" className="btn-md btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
