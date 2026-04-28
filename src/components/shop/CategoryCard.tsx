"use client";
import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/fake-data";

export default function CategoryCard({ cat }: { cat: Category }) {
  return (
    <Link
      href={`/category/${cat.slug}`}
      className="group/card flex flex-col items-center gap-3 py-3 px-1 rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.04] bg-[var(--surface)] px-4 py-4"
    >
      {/* Circle: soft gray bg, image zooms on hover, shadow lifts */}
      <div
        className={[
          "relative shrink-0 rounded-full overflow-hidden",
          // Identical fixed sizes across all cards at every breakpoint
          "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
          // Hover: shadow lift scoped to this card only
          "transition-shadow duration-200",
          "group-hover/card:shadow-[0_8px_28px_rgba(4,43,80,0.16)]",
        ].join(" ")}
        style={{ background: "var(--primary-soft)" }}
      >
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes="(max-width: 639px) 80px, (max-width: 767px) 96px, 112px"
          className="object-cover transition-transform duration-300 group-hover/card:scale-110"
        />
      </div>

      {/* Label: single line, bold, CSS-variable color */}
      <span
        className={[
          "text-[16px] font-bold leading-none whitespace-nowrap text-center",
          "transition-colors duration-200",
          "text-[var(--text)] group-hover/card:text-[var(--primary)]",
        ].join(" ")}
      >
        {cat.name}
      </span>
    </Link>
  );
}
