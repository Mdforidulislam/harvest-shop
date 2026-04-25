import type { Metadata } from "next";
import { Star } from "lucide-react";

export const metadata: Metadata = { title: "Reviews — Harvest Admin" };

export default function ReviewsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          Reviews
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Home &rsaquo; Reviews
        </p>
      </div>
      <div
        className="card p-12 flex flex-col items-center text-center"
        style={{ maxWidth: 480, margin: "0 auto" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "var(--warning-soft)" }}
          aria-hidden="true"
        >
          <Star size={28} style={{ color: "var(--warning)" }} />
        </div>
        <h2
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          Product Reviews
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Customer reviews and ratings management will appear here.
        </p>
      </div>
    </div>
  );
}
