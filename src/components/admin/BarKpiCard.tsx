"use client";
import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";
import { useChartColors } from "@/hooks/useChartColors";
import { formatPrice } from "@/lib/utils";
import DeltaBadge from "./DeltaBadge";

export type BarDataPoint = { day: string; value: number };

type Props = {
  title: string;
  value: number;
  delta: number;
  data: BarDataPoint[];
};

export default function BarKpiCard({ title, value, delta, data }: Props) {
  const c = useChartColors();
  const barFill = c.primary || "var(--primary)";

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div>
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

      <ResponsiveContainer width="100%" height={80}>
        <BarChart data={data} barSize={10} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 11,
              color: "var(--text)",
            }}
            formatter={(v) => [typeof v === "number" ? formatPrice(v) : v, "Sales"]}
          />
          <Bar dataKey="value" fill={barFill} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
