"use client";
import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export type OrderRow = {
  id: string;
  name: string;
  sku: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
};

export type OrderCategory = {
  key: string;
  label: string;
  emoji: string;
  rows: OrderRow[];
};

type Props = { categories: OrderCategory[] };

export default function RecentOrdersCard({ categories }: Props) {
  const [activeKey, setActiveKey] = useState(categories[0]?.key ?? "");
  const active = categories.find((c) => c.key === activeKey);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h2
          className="font-bold text-base"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          Recent Orders
        </h2>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]"
          style={{ color: "var(--text-muted)" }}
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Category tabs */}
      <div
        className="flex items-center gap-1 px-4 py-3 overflow-x-auto scrollbar-none"
        style={{ borderBottom: "1px solid var(--border)" }}
        role="tablist"
        aria-label="Order categories"
      >
        {categories.map((cat) => {
          const isActive = cat.key === activeKey;
          return (
            <button
              key={cat.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(cat.key)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: isActive ? "var(--primary)" : "transparent",
                color: isActive ? "white" : "var(--text-muted)",
                border: isActive ? "none" : "1px solid var(--border)",
              }}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto" role="tabpanel">
        <table className="w-full text-sm" style={{ minWidth: 480 }}>
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
              {["Item", "Quantity", "Price", "Total"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {active?.rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-[var(--surface-2)]"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <Image
                        src={row.image}
                        alt={row.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: "var(--text)" }}>{row.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>#{row.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5" style={{ color: "var(--text-muted)" }}>
                  ×{row.quantity}
                </td>
                <td className="px-5 py-3.5 price-num" style={{ color: "var(--text)" }}>
                  {formatPrice(row.price)}
                </td>
                <td className="px-5 py-3.5 font-bold price-num" style={{ color: "var(--primary)" }}>
                  {formatPrice(row.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
