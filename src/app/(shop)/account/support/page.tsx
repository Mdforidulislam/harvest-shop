import type { Metadata } from "next";
import { LifeBuoy } from "lucide-react";

export const metadata: Metadata = { title: "Support Tickets — Harvest" };

export default function SupportPage() {
  return (
    <div className="card p-8 text-center" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: "var(--primary-soft)" }}
        aria-hidden="true"
      >
        <LifeBuoy size={28} style={{ color: "var(--primary)" }} />
      </div>
      <h1
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
      >
        Support Tickets
      </h1>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Open or track your customer support tickets here. Our team typically responds within 24 hours.
      </p>
    </div>
  );
}
