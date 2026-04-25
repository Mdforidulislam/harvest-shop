import type { Metadata } from "next";
import { Trash2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = { title: "Delete Account — Harvest" };

export default function DeleteAccountPage() {
  return (
    <div className="card p-8 text-center" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: "var(--danger-soft)" }}
        aria-hidden="true"
      >
        <Trash2 size={28} style={{ color: "var(--danger)" }} />
      </div>
      <h1
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
      >
        Delete My Account
      </h1>
      <div
        className="flex items-start gap-3 text-left rounded-xl p-4 mb-5"
        style={{ background: "var(--danger-soft)", border: "1px solid var(--danger)" }}
        role="alert"
      >
        <AlertTriangle size={18} style={{ color: "var(--danger)", flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
        <p className="text-sm" style={{ color: "var(--danger)" }}>
          This action is permanent and cannot be undone. All your order history, saved addresses, and account data will be deleted.
        </p>
      </div>
      <button
        className="btn-md btn-danger w-full"
        aria-label="Permanently delete my account"
      >
        Delete Account Permanently
      </button>
    </div>
  );
}
