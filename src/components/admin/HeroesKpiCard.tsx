import Image from "next/image";
import DeltaBadge from "./DeltaBadge";

type Props = {
  title: string;
  value: number;
  delta: number;
  heroCount: number;
  avatarUrls: string[];
};

export default function HeroesKpiCard({ title, value, delta, heroCount, avatarUrls }: Props) {
  const shown = avatarUrls.slice(0, 4);
  const extra = heroCount - shown.length;

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
        <p className="text-xs font-semibold mb-2.5" style={{ color: "var(--text-muted)" }}>
          Today&apos;s Heroes
        </p>
        <div className="flex items-center">
          <div className="flex -space-x-2.5">
            {shown.map((url, i) => (
              <div
                key={i}
                className="relative w-8 h-8 rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: "var(--surface)" }}
              >
                <Image
                  src={url}
                  alt="Customer avatar"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ))}
          </div>
          {extra > 0 && (
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold -ml-2.5 flex-shrink-0"
              style={{
                borderColor: "var(--surface)",
                background: "var(--primary-soft)",
                color: "var(--primary)",
              }}
              aria-label={`${extra} more customers`}
            >
              +{extra}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
