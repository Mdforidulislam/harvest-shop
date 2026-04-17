import Link from "next/link";
import { Leaf } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="flex items-center justify-center py-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: "var(--primary)" }}>
            <Leaf size={18} />
          </div>
          <span className="font-bold text-2xl" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            Harvest<span style={{ color: "var(--primary)" }}>.</span>
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </div>

      <p className="text-center text-xs pb-6" style={{ color: "var(--text-muted)" }}>
        © 2026 Harvest. All rights reserved.
      </p>
    </div>
  );
}
