import type { Metadata } from "next";
import { CreditCard } from "lucide-react";

export const metadata: Metadata = { title: "Payments — Harvest" };

export default function PaymentsPage() {
  return (
    <div className="card p-8 text-center" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: "var(--primary-soft)" }}
        aria-hidden="true"
      >
        <CreditCard size={28} style={{ color: "var(--primary)" }} />
      </div>
      <h1
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
      >
        Payments
      </h1>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Your saved payment methods and transaction history will appear here.
      </p>
    </div>
  );
}
