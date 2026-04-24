import { CheckCircle } from "lucide-react";

const DEFAULT_BULLETS = [
  "100% Pure & Natural — No additives or preservatives",
  "Lab Tested Quality — Verified by certified laboratories",
  "Direct from Source — Shortest supply chain for freshness",
  "Eco-friendly Packaging — Recyclable materials used",
  "Secure & Fast Delivery — Dhaka 24h, nationwide 3–5 days",
  "7-Day Easy Return — Hassle-free return policy",
];

interface Props {
  bullets?: string[];
}

export default function ProductInfoCard({ bullets }: Props) {
  const items = bullets && bullets.length > 0 ? bullets : DEFAULT_BULLETS;

  return (
    <div
      className="rounded-xl p-5 h-fit"
      style={{
        background: "var(--surface)",
        border: "1.5px dashed var(--border)",
      }}
    >
      <h3
        className="text-xs font-black uppercase tracking-widest mb-4"
        style={{ color: "var(--primary)" }}
      >
        Why Choose Us
      </h3>
      <ul className="flex flex-col gap-3.5">
        {items.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle
              size={15}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--success)" }}
            />
            <span
              className="text-sm leading-snug"
              style={{ color: "var(--text-muted)" }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
