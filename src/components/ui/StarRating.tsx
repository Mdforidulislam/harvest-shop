import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({ rating, count, size = 14, className }: { rating: number; count?: number; size?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={size}
            fill={s <= Math.round(rating) ? "var(--warning)" : "none"}
            color={s <= Math.round(rating) ? "var(--warning)" : "var(--border)"}
            strokeWidth={1.75}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>({count})</span>
      )}
    </div>
  );
}
