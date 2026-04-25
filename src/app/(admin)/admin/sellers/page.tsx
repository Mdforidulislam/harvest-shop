import type { Metadata } from "next";
import { Store } from "lucide-react";

export const metadata: Metadata = { title: "Sellers — Harvest Admin" };

export default function SellersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          Sellers
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Home &rsaquo; Sellers
        </p>
      </div>
      <div
        className="card p-12 flex flex-col items-center text-center"
        style={{ maxWidth: 480, margin: "0 auto" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "var(--primary-soft)" }}
          aria-hidden="true"
        >
          <Store size={28} style={{ color: "var(--primary)" }} />
        </div>
        <h2
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          Seller Management
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Registered sellers and vendor profiles will be managed here.
        </p>
      </div>
    </div>
  );
}
