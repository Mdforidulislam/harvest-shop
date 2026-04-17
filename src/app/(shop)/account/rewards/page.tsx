import Link from "next/link";
import { Gift, Star, TrendingUp, CheckCircle, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rewards & Points — Harvest" };

const tiers = [
  { name: "Silver",  min: 0,    max: 199,  color: "#9ca3af", bg: "#f3f4f6",  perks: ["5% discount on orders", "Free shipping over ৳1500"] },
  { name: "Gold",    min: 200,  max: 499,  color: "#d97706", bg: "#fef3c7",  perks: ["10% discount on orders", "Free shipping over ৳999", "Early access to sales"] },
  { name: "Platinum",min: 500,  max: 999,  color: "#7c3aed", bg: "#ede9fe",  perks: ["15% discount on orders", "Always free shipping", "Priority support", "Birthday bonus"] },
  { name: "Diamond", min: 1000, max: Infinity, color: "#0ea5e9", bg: "#e0f2fe", perks: ["20% discount on orders", "Always free shipping", "Dedicated account manager", "Exclusive products"] },
];

const transactions = [
  { id: "t1", desc: "Order ORD-10042 completed",   pts: +120, date: "2026-04-10", type: "earn" },
  { id: "t2", desc: "Welcome bonus",                pts: +50,  date: "2026-01-15", type: "earn" },
  { id: "t3", desc: "Order ORD-10038 completed",   pts: +90,  date: "2026-04-02", type: "earn" },
  { id: "t4", desc: "Redeemed for ৳50 discount",  pts: -80,  date: "2026-03-10", type: "redeem" },
  { id: "t5", desc: "Referred a friend",            pts: +160, date: "2026-02-20", type: "earn" },
];

const currentPoints = 340;
const currentTier = tiers.find((t) => currentPoints >= t.min && currentPoints <= t.max)!;
const nextTier = tiers[tiers.indexOf(currentTier) + 1];
const progressPct = nextTier
  ? Math.round(((currentPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100)
  : 100;

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      {/* Points card */}
      <div className="card p-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, var(--primary) 0%, transparent 70%)" }} />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>Your Points Balance</p>
              <p className="text-4xl font-bold price-num" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                {currentPoints} <span className="text-lg font-normal" style={{ color: "var(--text-muted)" }}>pts</span>
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl text-sm font-bold" style={{ background: currentTier.bg, color: currentTier.color }}>
              {currentTier.name} Member
            </div>
          </div>

          {nextTier && (
            <>
              <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                <span>{currentPoints} pts</span>
                <span>{nextTier.name} at {nextTier.min} pts</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, background: currentTier.color }} />
              </div>
              <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                {nextTier.min - currentPoints} more points to reach <strong style={{ color: nextTier.color }}>{nextTier.name}</strong>
              </p>
            </>
          )}
        </div>
      </div>

      {/* How to earn */}
      <div className="card p-5">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>How to Earn Points</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "🛒", label: "Place an Order",   sub: "Earn 1 pt per ৳10 spent" },
            { icon: "⭐", label: "Write a Review",   sub: "Earn 20 pts per review"   },
            { icon: "👥", label: "Refer a Friend",   sub: "Earn 150 pts per referral" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{label}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier benefits */}
      <div className="card p-5">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Membership Tiers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tiers.map((tier) => {
            const active = tier.name === currentTier.name;
            const unlocked = currentPoints >= tier.min;
            return (
              <div key={tier.name} className="rounded-xl p-4" style={{ background: active ? tier.bg : "var(--surface-2)", border: active ? `2px solid ${tier.color}` : "2px solid transparent" }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold" style={{ color: tier.color }}>{tier.name}</p>
                  {unlocked ? <CheckCircle size={14} style={{ color: tier.color }} /> : <Lock size={12} style={{ color: "var(--text-muted)" }} />}
                </div>
                <p className="text-[10px] mb-2" style={{ color: "var(--text-muted)" }}>{tier.min}+ pts</p>
                <ul className="space-y-1">
                  {tier.perks.slice(0, 2).map((p) => (
                    <li key={p} className="text-[10px] flex items-start gap-1" style={{ color: unlocked ? "var(--text)" : "var(--text-muted)" }}>
                      <span style={{ color: tier.color }}>✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction history */}
      <div className="card p-5">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Points History</h2>
        <div className="space-y-2">
          {transactions.sort((a,b) => b.date.localeCompare(a.date)).map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: t.type === "earn" ? "var(--primary-soft)" : "#fee2e2" }}>
                {t.type === "earn"
                  ? <TrendingUp size={14} style={{ color: "var(--primary)" }} />
                  : <Gift size={14} style={{ color: "var(--danger)" }} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{t.desc}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.date}</p>
              </div>
              <span className="text-sm font-bold price-num" style={{ color: t.type === "earn" ? "var(--success)" : "var(--danger)" }}>
                {t.pts > 0 ? "+" : ""}{t.pts} pts
              </span>
            </div>
          ))}
        </div>

        {/* Redeem CTA */}
        <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Redeem your points</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>100 pts = ৳10 discount on your next order</p>
          </div>
          <Link href="/checkout" className="btn-sm btn-primary">Redeem Now</Link>
        </div>
      </div>
    </div>
  );
}
