"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useChartColors } from "@/hooks/useChartColors";
import { formatPrice } from "@/lib/utils";
import DeltaBadge from "./DeltaBadge";

export type ChartPoint = { date: string; value: number };

type ColorKey = "success" | "info" | "primary" | "accent" | "warning";

type Props = {
  title: string;
  subtitle: string;
  value: number;
  delta: number;
  goalGap: number;
  data: ChartPoint[];
  color: ColorKey;
};

export default function SalesChartCard({
  title, subtitle, value, delta, goalGap, data, color,
}: Props) {
  const c = useChartColors();
  const stroke = c[color] || `var(--${color})`;
  // Unique gradient id per colour key so two cards on the same page don't clash
  const gradId = `sg-${color}`;

  return (
    <div className="card p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            {subtitle}
          </p>
          <p
            className="font-bold text-base mt-0.5 truncate"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
          >
            {title}
          </p>
        </div>
        <DeltaBadge delta={delta} />
      </div>

      <div>
        <p
          className="text-2xl font-bold price-num leading-none"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          {formatPrice(value)}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Another {formatPrice(goalGap)} to goal
        </p>
      </div>

      {/* Area chart */}
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data} margin={{ top: 5, right: 4, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={stroke} stopOpacity={0.28} />
              <stop offset="95%" stopColor={stroke} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={c.border || "var(--border)"}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: c.textMuted || "var(--text-muted)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: c.textMuted || "var(--text-muted)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v))}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "11px",
              color: "var(--text)",
            }}
            formatter={(v) => [typeof v === "number" ? formatPrice(v) : v, "Sales"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={{ r: 4, fill: stroke, stroke: "var(--surface)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
