"use client";

import { useState } from "react";
import {
  Calendar,
  Gift,
  Cake,
  Heart,
  Sparkles,
  Copy,
  Check,
  Clock,
  Tag,
  Plus,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type Occasion = "birthday" | "anniversary" | "festival" | "seasonal";

type Coupon = {
  id: string;
  code: string;
  title: string;
  discount: string;
  occasion: Occasion;
  expiresOn: string;
  daysLeft: number;
  minOrder?: number;
  isNew?: boolean;
};

const coupons: Coupon[] = [
  {
    id: "1",
    code: "BDAY25HARVEST",
    title: "Birthday Special",
    discount: "25% OFF",
    occasion: "birthday",
    expiresOn: "May 15, 2026",
    daysLeft: 17,
    minOrder: 500,
    isNew: true,
  },
  {
    id: "2",
    code: "ANNIV15LOVE",
    title: "Anniversary Gift",
    discount: "15% OFF",
    occasion: "anniversary",
    expiresOn: "Jun 02, 2026",
    daysLeft: 35,
    minOrder: 800,
  },
  {
    id: "3",
    code: "HARVEST2026",
    title: "Spring Harvest",
    discount: "₹200 OFF",
    occasion: "seasonal",
    expiresOn: "May 30, 2026",
    daysLeft: 32,
    minOrder: 1000,
  },
  {
    id: "4",
    code: "EIDMUBARAK10",
    title: "Eid Festival",
    discount: "10% OFF",
    occasion: "festival",
    expiresOn: "May 10, 2026",
    daysLeft: 12,
    minOrder: 300,
    isNew: true,
  },
];

interface OccasionMeta {
  icon: LucideIcon;
  label: string;
  color: string;
}

const occasionMeta: { [K in Occasion]: OccasionMeta } = {
  birthday: { icon: Cake, label: "Birthday", color: "#ec4899" },
  anniversary: { icon: Heart, label: "Anniversary", color: "#ef4444" },
  festival: { icon: Sparkles, label: "Festival", color: "#f59e0b" },
  seasonal: { icon: Gift, label: "Seasonal", color: "#10b981" },
};
export default function SpecialDayPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* clipboard API unavailable — silently ignore */
    }
  };

  const totalAvailable = coupons.length;
  const newCount = coupons.filter((c) => c.isNew).length;
  const expiringSoon = coupons.filter((c) => c.daysLeft <= 15).length;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
      {/* ───────────── Hero / Summary ───────────── */}
      <div
        className="card"
        style={{
          padding: "28px 32px",
          marginBottom: 24,
          background:
            "linear-gradient(135deg, var(--accent-soft) 0%, transparent 100%)",
          border: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "var(--accent)",
            opacity: 0.08,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--accent)", flexShrink: 0 }}
          >
            <Gift size={26} color="#fff" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                color: "var(--text)",
                marginBottom: 2,
              }}
            >
              My Special Day Coupons
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Personalised offers crafted just for your special moments
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          <StatCard
            icon={<Tag size={18} />}
            label="Available"
            value={totalAvailable}
            accent="var(--accent)"
          />
          <StatCard
            icon={<Sparkles size={18} />}
            label="New for You"
            value={newCount}
            accent="#f59e0b"
          />
          <StatCard
            icon={<Clock size={18} />}
            label="Expiring Soon"
            value={expiringSoon}
            accent="#ef4444"
          />
          <StatCard
            icon={<TrendingUp size={18} />}
            label="Total Saved"
            value="₹1,240"
            accent="#10b981"
          />
        </div>
      </div>

      {/* ───────────── Set Special Days ───────────── */}
      <div
        className="card"
        style={{
          padding: 20,
          marginBottom: 24,
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h2
            className="text-base font-semibold"
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              color: "var(--text)",
            }}
          >
            Your Special Dates
          </h2>
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <Plus size={14} /> Add Date
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 10,
          }}
        >
          <DateChip
            icon={<Cake size={16} />}
            label="Birthday"
            value="April 28"
            color="#ec4899"
          />
          <DateChip
            icon={<Heart size={16} />}
            label="Anniversary"
            value="June 02"
            color="#ef4444"
          />
          <DateChip
            icon={<Calendar size={16} />}
            label="Spouse Birthday"
            value="Not set"
            color="var(--text-muted)"
            muted
          />
        </div>
      </div>

      {/* ───────────── Coupons Grid ───────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <h2
          className="text-lg font-semibold"
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            color: "var(--text)",
          }}
        >
          Available Coupons{" "}
          <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
            ({totalAvailable})
          </span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            copied={copiedId === coupon.id}
            onCopy={() => handleCopy(coupon.code, coupon.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────────── Sub-components ───────────── */

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `${accent}15`,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--text)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function DateChip({
  icon,
  label,
  value,
  color,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  muted?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 10,
        border: muted ? "1px dashed var(--border)" : "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: muted ? "transparent" : `${color}15`,
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: muted ? "var(--text-muted)" : "var(--text)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function CouponCard({
  coupon,
  copied,
  onCopy,
}: {
  coupon: Coupon;
  copied: boolean;
  onCopy: () => void;
}) {
  const meta = occasionMeta[coupon.occasion];
  const Icon = meta.icon;
  const urgent = coupon.daysLeft <= 15;

  return (
    <div
      style={{
        position: "relative",
        background: "var(--card-bg, #fff)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent stripe */}
      <div
        style={{
          height: 6,
          background: `linear-gradient(90deg, ${meta.color}, ${meta.color}aa)`,
        }}
      />

      <div style={{ padding: 18 }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `${meta.color}15`,
                color: meta.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={18} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: meta.color,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {meta.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text)",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                {coupon.title}
              </div>
            </div>
          </div>
          {coupon.isNew && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 999,
                background: "#f59e0b",
                color: "#fff",
                letterSpacing: 0.5,
              }}
            >
              NEW
            </span>
          )}
        </div>

        {/* Discount */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "var(--text)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {coupon.discount}
        </div>
        {coupon.minOrder && (
          <div
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginBottom: 14,
            }}
          >
            Min. order ₹{coupon.minOrder}
          </div>
        )}

        {/* Coupon code box */}
        <div
          style={{
            position: "relative",
            border: "1.5px dashed var(--border)",
            borderRadius: 10,
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            background: "var(--accent-soft)",
            marginBottom: 12,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 10,
                color: "var(--text-muted)",
                marginBottom: 2,
              }}
            >
              COUPON CODE
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text)",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                letterSpacing: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {coupon.code}
            </div>
          </div>
          <button
            type="button"
            onClick={onCopy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              background: copied ? "#10b981" : "var(--accent)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>
            Expires {coupon.expiresOn}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontWeight: 600,
              color: urgent ? "#ef4444" : "var(--text-muted)",
            }}
          >
            <Clock size={12} />
            {coupon.daysLeft}d left
          </span>
        </div>
      </div>
    </div>
  );
}