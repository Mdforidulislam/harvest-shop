import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, DollarSign } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analytics — Admin" };

const monthlyRevenue = [
  { month: "Oct", revenue: 42000, orders: 48 },
  { month: "Nov", revenue: 55000, orders: 63 },
  { month: "Dec", revenue: 78000, orders: 91 },
  { month: "Jan", revenue: 61000, orders: 72 },
  { month: "Feb", revenue: 69000, orders: 80 },
  { month: "Mar", revenue: 84000, orders: 97 },
  { month: "Apr", revenue: 93000, orders: 108 },
];

const topCategories = [
  { name: "Raw Honey",    revenue: 38500, pct: 31, color: "var(--warning)" },
  { name: "Pure Ghee",   revenue: 29200, pct: 24, color: "var(--accent)" },
  { name: "Mustard Oil", revenue: 21800, pct: 18, color: "var(--primary)" },
  { name: "Mixed Nuts",  revenue: 18400, pct: 15, color: "var(--info)" },
  { name: "Dates",       revenue: 14900, pct: 12, color: "var(--success)" },
];

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Analytics</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Store performance overview</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Monthly Revenue",  value: formatPrice(93000), change: "+10.7%", up: true,  icon: DollarSign, color: "var(--primary)", bg: "var(--primary-soft)" },
          { label: "Monthly Orders",   value: "108",              change: "+11.3%", up: true,  icon: ShoppingBag,color: "var(--accent)",  bg: "var(--accent-soft)" },
          { label: "New Customers",    value: "64",               change: "+8.1%",  up: true,  icon: Users,      color: "var(--info)",    bg: "#dbeafe" },
          { label: "Avg Order Value",  value: formatPrice(861),   change: "-1.2%",  up: false, icon: Package,    color: "var(--warning)", bg: "#fef3c7" },
        ].map(({ label, value, change, up, icon: Icon, color, bg }) => (
          <div key={label} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: up ? "#dcfce7" : "#fee2e2", color: up ? "var(--success)" : "var(--danger)" }}>
                {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {change}
              </span>
            </div>
            <p className="text-xl font-bold price-num" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Revenue bar chart */}
        <div className="lg:col-span-2 card p-5">
          <h2 className="font-bold text-base mb-5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Monthly Revenue</h2>
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlyRevenue.map((m) => {
              const height = Math.round((m.revenue / maxRevenue) * 100);
              const isLast = m.month === monthlyRevenue[monthlyRevenue.length - 1].month;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="relative w-full flex flex-col justify-end" style={{ height: "160px" }}>
                    <div
                      className="w-full rounded-t-lg transition-all duration-300 group-hover:opacity-90 relative"
                      style={{
                        height: `${height}%`,
                        background: isLast ? "var(--primary)" : "var(--primary-soft)",
                        minHeight: "8px",
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold whitespace-nowrap" style={{ color: "var(--text)" }}>
                        {formatPrice(m.revenue)}
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: isLast ? "var(--primary)" : "var(--text-muted)" }}>{m.month}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{m.orders}</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "var(--primary)" }} /><span className="text-xs" style={{ color: "var(--text-muted)" }}>Current month</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "var(--primary-soft)" }} /><span className="text-xs" style={{ color: "var(--text-muted)" }}>Previous months</span></div>
            <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>Numbers = orders</span>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="card p-5">
          <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Revenue by Category</h2>
          <div className="space-y-3">
            {topCategories.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{c.name}</span>
                  <span className="text-xs font-bold price-num" style={{ color: c.color }}>{c.pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
                <p className="text-[10px] mt-0.5 text-right" style={{ color: "var(--text-muted)" }}>{formatPrice(c.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order status breakdown */}
      <div className="card p-5">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Order Status (Last 30 days)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Delivered",  count: 74,  pct: 69, color: "var(--success)", bg: "#dcfce7" },
            { label: "Shipped",    count: 12,  pct: 11, color: "var(--info)",    bg: "#dbeafe" },
            { label: "Processing", count: 14,  pct: 13, color: "var(--primary)", bg: "var(--primary-soft)" },
            { label: "Pending",    count: 5,   pct: 5,  color: "var(--warning)", bg: "#fef3c7" },
            { label: "Cancelled",  count: 3,   pct: 3,  color: "var(--danger)",  bg: "#fee2e2" },
          ].map(({ label, count, pct, color, bg }) => (
            <div key={label} className="flex flex-col items-center p-4 rounded-xl text-center" style={{ background: bg }}>
              <p className="text-2xl font-bold" style={{ color, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{count}</p>
              <p className="text-xs font-semibold mt-1" style={{ color }}>{label}</p>
              <p className="text-[10px]" style={{ color }}>{pct}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
