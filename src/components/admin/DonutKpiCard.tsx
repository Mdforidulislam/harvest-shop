"use client";
import { PieChart, Pie, Cell } from "recharts";
import { useChartColors } from "@/hooks/useChartColors";
import { formatPrice } from "@/lib/utils";
import DeltaBadge from "./DeltaBadge";

export type DonutSegment = {
  label: string;
  value: number;
  color: "primary" | "accent" | "info" | "warning" | "success";
};

type Props = {
  title: string;
  value: number;
  delta: number;
  segments: DonutSegment[];
};

export default function DonutKpiCard({ title, value, delta, segments }: Props) {
  const c = useChartColors();

  const cellColors = segments.map((s) => c[s.color] || `var(--${s.color})`);
  const pieData = segments.map((s) => ({ name: s.label, value: s.value }));

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            {title}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <p
              className="text-2xl font-bold price-num leading-none"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
            >
              {formatPrice(value)}
            </p>
            <DeltaBadge delta={delta} />
          </div>
        </div>
        {/* Fixed-size donut — no ResizeObserver needed */}
        <PieChart width={88} height={88} aria-hidden="true">
          <Pie
            data={pieData}
            cx={40}
            cy={40}
            innerRadius={24}
            outerRadius={40}
            dataKey="value"
            strokeWidth={2}
            stroke={c.surface || "var(--surface)"}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={cellColors[i]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Legend */}
      <div
        className="space-y-2 pt-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: cellColors[i] }}
                aria-hidden="true"
              />
              <span style={{ color: "var(--text-muted)" }}>{seg.label}</span>
            </div>
            <span className="font-semibold price-num" style={{ color: "var(--text)" }}>
              {formatPrice(seg.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
