import type { Metadata } from "next";
import { Paintbrush } from "lucide-react";

export const metadata: Metadata = { title: "Appearance — Harvest Admin" };

export default function AppearancePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          Appearance
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Home &rsaquo; Appearance
        </p>
      </div>
      <div
        className="card p-12 flex flex-col items-center text-center"
        style={{ maxWidth: 480, margin: "0 auto" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "var(--accent-soft)" }}
          aria-hidden="true"
        >
          <Paintbrush size={28} style={{ color: "var(--accent)" }} />
        </div>
        <h2
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          Theme &amp; Appearance
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Storefront theme, colour palette, banner management, and layout settings will appear here.
        </p>
      </div>
    </div>
  );
}
