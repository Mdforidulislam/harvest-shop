import { TrendingUp, TrendingDown } from "lucide-react";

type Props = { delta: number };

export default function DeltaBadge({ delta }: Props) {
  const up = delta >= 0;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
      style={{
        background: up ? "var(--success-soft)" : "var(--danger-soft)",
        color: up ? "var(--success)" : "var(--danger)",
      }}
    >
      {up ? <TrendingUp size={10} aria-hidden="true" /> : <TrendingDown size={10} aria-hidden="true" />}
      {up ? "+" : ""}{delta}%
    </span>
  );
}
