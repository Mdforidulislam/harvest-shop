"use client";
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, DollarSign, Calendar, Filter, Download, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

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
  { name: "Raw Honey", revenue: 38500, pct: 31, color: "#F58220" },
  { name: "Pure Ghee", revenue: 29200, pct: 24, color: "#6BB36F" },
  { name: "Mustard Oil", revenue: 21800, pct: 18, color: "#3B82F6" },
  { name: "Mixed Nuts", revenue: 18400, pct: 15, color: "#8B5CF6" },
  { name: "Dates", revenue: 14900, pct: 12, color: "#10B981" },
];

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

export default function AnalyticsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">

      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Performance Matrix</h1>
          <p className="text-[var(--text-muted)] font-medium">Deep dive into your farm's digital ecosystem performance and sales velocity.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-all">
            <Calendar size={14} /> Last 30 Days
          </button>
          <button className="h-12 px-8 rounded-2xl bg-[var(--primary)] text-white flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--primary-hover)] transition-all shadow-xl shadow-[var(--primary)]/10">
            <Download size={14} /> Export Insight
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: formatPrice(93000), change: "+12.4%", up: true, icon: DollarSign, color: "var(--primary)" },
          { label: "Active Orders", value: "108", change: "+8.2%", up: true, icon: ShoppingBag, color: "var(--accent)" },
          { label: "New Harvesters", value: "64", change: "+15.7%", up: true, icon: Users, color: "#3B82F6" },
          { label: "Yield Per Basket", value: formatPrice(861), change: "-2.1%", up: false, icon: Package, color: "#EF4444" },
        ].map(({ label, value, change, up, icon: Icon, color }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="admin-card p-8 group hover:border-[var(--primary)] transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--surface-2)] group-hover:bg-[var(--primary-soft)] transition-colors" style={{ color }}>
                <Icon size={24} />
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${up ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {change}
              </span>
            </div>
            <p className="text-3xl font-black text-[var(--text)] tracking-tighter mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{value}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-60">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* Dynamic Charting Component */}
        <div className="xl:col-span-8 admin-card p-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl font-black text-[var(--text)] tracking-tight">Revenue Velocity</h2>
            <div className="flex gap-2">
              <button className="h-8 px-4 rounded-lg bg-[var(--surface-2)] text-[9px] font-black uppercase tracking-widest text-[var(--text)]">Weekly</button>
              <button className="h-8 px-4 rounded-lg bg-[var(--primary)] text-white text-[9px] font-black uppercase tracking-widest">Monthly</button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 h-64 md:h-80 px-4">
            {monthlyRevenue.map((m, idx) => {
              const height = Math.round((m.revenue / maxRevenue) * 100);
              const isLast = idx === monthlyRevenue.length - 1;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full flex flex-col justify-end h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: idx * 0.1, duration: 1, ease: [0.33, 1, 0.68, 1] }}
                      className={`w-full max-w-[40px] mx-auto rounded-t-xl group-hover:scale-x-110 transition-transform relative ${isLast ? "bg-[var(--primary)]" : "bg-[var(--surface-2)] group-hover:bg-[var(--primary-soft)]"}`}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-xs font-black bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded-lg shadow-xl z-20">
                        {formatPrice(m.revenue)}
                      </div>
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isLast ? "text-[var(--primary)]" : "text-[var(--text-muted)] opacity-40"}`}>{m.month}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[var(--border)]">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[var(--primary)]" /><span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Target Achieved</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[var(--surface-2)]" /><span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Standard Flow</span></div>
          </div>
        </div>

        {/* Category Share */}
        <div className="xl:col-span-4 admin-card p-10">
          <h2 className="text-xl font-black text-[var(--text)] tracking-tight mb-10">Market Share</h2>
          <div className="space-y-8">
            {topCategories.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-[var(--text)]">{c.name}</span>
                  <span className="text-xs font-black" style={{ color: c.color }}>{c.pct}%</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--surface-2)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                    className="h-full rounded-full"
                    style={{ background: c.color }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[9px] font-black text-[var(--text-muted)] opacity-40 uppercase tracking-[0.2em]">{formatPrice(c.revenue)} Yield</span>
                  <ArrowUpRight size={12} className="text-[var(--text-muted)] opacity-20" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-[2.5rem] bg-[var(--primary-soft)] border-2 border-dashed border-[var(--primary)] text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-2">Insight AI</p>
            <p className="text-xs font-bold text-[var(--text)] leading-relaxed">Raw Honey continues to dominate the quarterly harvest share with +8% year-on-year velocity.</p>
          </div>
        </div>
      </div>

      {/* Real-time Velocity Breakdown */}
      <div className="admin-card p-10">
        <h2 className="text-xl font-black text-[var(--text)] tracking-tight mb-10">Logistical Flow Breakdown</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { label: "Delivered", count: 74, pct: 69, color: "var(--success)", bg: "rgba(16, 185, 129, 0.05)" },
            { label: "In Transit", count: 12, pct: 11, color: "#3B82F6", bg: "rgba(59, 130, 246, 0.05)" },
            { label: "Processing", count: 14, pct: 13, color: "var(--primary)", bg: "var(--primary-soft)" },
            { label: "Pending", count: 5, pct: 5, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.05)" },
            { label: "Retracted", count: 3, pct: 3, color: "#EF4444", bg: "rgba(239, 68, 68, 0.05)" },
          ].map(({ label, count, pct, color, bg }, idx) => (
            <motion.div
              key={label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 + 0.8 }}
              className="flex flex-col items-center p-8 rounded-[2.5rem] text-center transition-all hover:scale-105 active:scale-95 cursor-default group"
              style={{ background: bg }}
            >
              <p className="text-4xl font-black mb-1 group-hover:scale-110 transition-transform" style={{ color, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{count}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color }}>{label}</p>
              <div className="w-8 h-1 rounded-full opacity-20" style={{ background: color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
