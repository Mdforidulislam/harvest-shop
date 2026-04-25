import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  iconBg: string;
};

export default function StatCard({ label, value, icon: Icon, color, iconBg }: Props) {
  return (
    <div className="card flex items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <p
          className="text-3xl font-bold leading-none"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color }}
        >
          {value}
        </p>
        <p className="text-xs font-medium mt-2" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
      </div>
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 52, height: 52, borderRadius: "50%", background: iconBg }}
        aria-hidden="true"
      >
        <Icon size={24} style={{ color }} />
      </div>
    </div>
  );
}
