import type { Metadata } from "next";
import { Calendar } from "lucide-react";

export const metadata: Metadata = { title: "Manage Special Day — Harvest" };

export default function SpecialDayPage() {
  return (
    <div className="card p-8 text-center" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: "var(--accent-soft)" }}
        aria-hidden="true"
      >
        <Calendar size={28} style={{ color: "var(--accent)" }} />
      </div>
      <h1
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
      >
        Manage Special Day
      </h1>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Set birthdays, anniversaries, and other special occasions so we can send you personalised offers.
      </p>
    </div>
  );
}
