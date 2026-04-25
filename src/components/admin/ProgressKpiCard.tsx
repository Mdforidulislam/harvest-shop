import DeltaBadge from "./DeltaBadge";

type Props = {
  title: string;
  value: number;
  delta: number;
  current: number;
  goal: number;
};

export default function ProgressKpiCard({ title, value, delta, current, goal }: Props) {
  const pct = Math.min(Math.round((current / goal) * 100), 100);
  const remaining = (goal - current).toLocaleString("en-BD");

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
            className="text-2xl font-bold leading-none"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
          >
            {value.toLocaleString("en-BD")}
          </p>
          <DeltaBadge delta={delta} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span style={{ color: "var(--text-muted)" }}>
            {remaining} to Goal
          </span>
          <span
            className="font-bold"
            style={{ color: "var(--primary)" }}
          >
            {pct}%
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "var(--surface-2)" }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: "var(--primary)", transition: "width 0.6s ease" }}
          />
        </div>
        <p className="text-[10px] mt-1.5" style={{ color: "var(--text-muted)" }}>
          Goal: {goal.toLocaleString("en-BD")}
        </p>
      </div>
    </div>
  );
}
