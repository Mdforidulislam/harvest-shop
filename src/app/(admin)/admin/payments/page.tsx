import { CreditCard, TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Payments — Admin" };

const payments = [
  { id: "PAY-8801", orderId: "ORD-10042", customer: "Rabeya Khatun", amount: 2050,  method: "bKash",      status: "success",  date: "2026-04-10", txnId: "BK8801234" },
  { id: "PAY-8798", orderId: "ORD-10038", customer: "Rabeya Khatun", amount: 1509,  method: "COD",        status: "pending",  date: "2026-04-02", txnId: "COD-MANUAL" },
  { id: "PAY-8795", orderId: "ORD-10031", customer: "Arif Hossain",  amount: 495,   method: "SSLCommerz", status: "success",  date: "2026-03-22", txnId: "SSL5543221" },
  { id: "PAY-8790", orderId: "ORD-10028", customer: "Sonia Begum",   amount: 1800,  method: "COD",        status: "success",  date: "2026-03-14", txnId: "COD-MANUAL" },
  { id: "PAY-8785", orderId: "ORD-10021", customer: "Taher Ali",     amount: 900,   method: "bKash",      status: "refunded", date: "2026-03-05", txnId: "BK7792100" },
  { id: "PAY-8780", orderId: "ORD-10017", customer: "Farhana Ahmed", amount: 650,   method: "Nagad",      status: "success",  date: "2026-02-27", txnId: "NG4412890" },
  { id: "PAY-8775", orderId: "ORD-10005", customer: "Karim Miah",    amount: 2400,  method: "COD",        status: "pending",  date: "2026-02-10", txnId: "COD-MANUAL" },
  { id: "PAY-8770", orderId: "ORD-09998", customer: "Rahim Khan",    amount: 3200,  method: "SSLCommerz", status: "success",  date: "2026-02-02", txnId: "SSL4432190" },
];

const statusCfg = {
  success:  { cls: "badge-success", icon: CheckCircle, label: "Success" },
  pending:  { cls: "badge-warning", icon: Clock,       label: "Pending" },
  refunded: { cls: "badge-danger",  icon: XCircle,     label: "Refunded" },
};

const methodColor: Record<string, string> = {
  bKash: "#E2136E", Nagad: "#EF6D20", SSLCommerz: "#3E4095", COD: "var(--success)",
};

const totalRevenue  = payments.filter(p => p.status === "success").reduce((s, p) => s + p.amount, 0);
const totalPending  = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
const totalRefunded = payments.filter(p => p.status === "refunded").reduce((s, p) => s + p.amount, 0);

export default function PaymentsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Payment History</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{payments.length} transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Collected", value: formatPrice(totalRevenue),  icon: TrendingUp,   color: "var(--success)", bg: "#dcfce7" },
          { label: "Pending",         value: formatPrice(totalPending),   icon: Clock,        color: "var(--warning)", bg: "#fef3c7" },
          { label: "Refunded",        value: formatPrice(totalRefunded),  icon: CreditCard,   color: "var(--danger)",  bg: "#fee2e2" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
            </div>
            <p className="text-2xl font-bold price-num" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Method breakdown */}
      <div className="card p-5">
        <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Payment Methods</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(
            payments.reduce((acc, p) => {
              if (!acc[p.method]) acc[p.method] = { count: 0, total: 0 };
              acc[p.method].count++;
              if (p.status === "success") acc[p.method].total += p.amount;
              return acc;
            }, {} as Record<string, { count: number; total: number }>)
          ).map(([method, { count, total }]) => (
            <div key={method} className="p-3 rounded-xl text-center" style={{ background: "var(--surface-2)" }}>
              <p className="text-sm font-bold mb-1" style={{ color: methodColor[method] ?? "var(--text)" }}>{method}</p>
              <p className="text-lg font-bold price-num" style={{ color: "var(--text)" }}>{count}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatPrice(total)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                {["Payment ID", "Order", "Customer", "Amount", "Method", "Transaction", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => {
                const cfg = statusCfg[p.status as keyof typeof statusCfg];
                const Icon = cfg.icon;
                return (
                  <tr key={p.id} className="hover:bg-[var(--surface-2)] transition-colors" style={{ borderBottom: idx < payments.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: "var(--text)" }}>{p.id}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--primary)" }}>{p.orderId}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text)" }}>{p.customer}</td>
                    <td className="px-4 py-3 font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(p.amount)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ color: methodColor[p.method] ?? "var(--text)", background: "var(--surface-2)" }}>{p.method}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{p.txnId}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(p.date)}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${cfg.cls} text-[10px] inline-flex items-center gap-0.5`}>
                        <Icon size={9} /> {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
