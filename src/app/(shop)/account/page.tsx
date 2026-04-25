import Link from "next/link";
import { fakeOrders } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import StatCard from "@/components/shop/account/StatCard";
import WishlistPreview from "@/components/shop/account/WishlistPreview";
import type { Metadata } from "next";
import {
  ShoppingBag, Truck, ShoppingCart, Heart, CircleDollarSign,
  LifeBuoy, Package, CheckCircle, Clock,
} from "lucide-react";

export const metadata: Metadata = { title: "My Account — Harvest" };

const statusColors: Record<string, string> = {
  pending:    "badge-warning",
  processing: "badge-primary",
  shipped:    "badge-info",
  delivered:  "badge-success",
  cancelled:  "badge-danger",
};

const statusIcons: Record<string, typeof Clock> = {
  pending:    Clock,
  processing: Package,
  shipped:    Truck,
  delivered:  CheckCircle,
  cancelled:  Clock,
};

export default function AccountDashboardPage() {
  const totalOrders    = fakeOrders.length > 0 ? fakeOrders.length : 12;
  const runningOrders  = fakeOrders.filter(o => ["processing", "shipped"].includes(o.status)).length || 3;
  const amountSpent    = fakeOrders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0) || 8450;
  const recentOrders   = fakeOrders.slice(0, 5);

  const statCards = [
    {
      label: "Total Order Placed",
      value: totalOrders,
      icon: ShoppingBag,
      color: "var(--primary)",
      iconBg: "var(--primary-soft)",
    },
    {
      label: "Running Orders",
      value: runningOrders,
      icon: Truck,
      color: "var(--warning)",
      iconBg: "var(--warning-soft)",
    },
    {
      label: "Items in Cart",
      value: 4,
      icon: ShoppingCart,
      color: "var(--accent)",
      iconBg: "var(--accent-soft)",
    },
    {
      label: "Product in Wishlist's",
      value: 7,
      icon: Heart,
      color: "var(--danger)",
      iconBg: "var(--danger-soft)",
    },
    {
      label: "Amount Spent",
      value: formatPrice(amountSpent),
      icon: CircleDollarSign,
      color: "var(--success)",
      iconBg: "var(--success-soft)",
    },
    {
      label: "Opened Tickets",
      value: 2,
      icon: LifeBuoy,
      color: "var(--info)",
      iconBg: "var(--info-soft)",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ─── Stat Cards (3 × 2 grid) ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ─── Recent Orders ───────────────────────── */}
      <div className="card overflow-hidden">
        {/* Dark header bar */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ background: "var(--primary)" }}
        >
          <h2
            className="text-sm font-bold"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "white" }}
          >
            Recent Orders
          </h2>
          <Link
            href="/account/orders"
            className="btn-sm text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.15)", color: "white", borderRadius: 8 }}
          >
            All Orders
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          /* Horizontal scroll on narrow viewports */
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: 560 }}>
              <thead>
                <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                  {["Order ID", "Date", "Status", "Items", "Amount", "Action"].map((h) => (
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
                {recentOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status] ?? Clock;
                  return (
                    <tr
                      key={order.id}
                      style={{ borderBottom: "1px solid var(--border)" }}
                      className="transition-colors hover:bg-[var(--surface-2)]"
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-semibold" style={{ color: "var(--text)" }}>
                          {order.id}
                        </span>
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "var(--text-muted)" }}>
                        {formatDate(order.date)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`badge ${statusColors[order.status]} inline-flex items-center gap-1`}>
                          <StatusIcon size={9} aria-hidden="true" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "var(--text-muted)" }}>
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold price-num" style={{ color: "var(--primary)" }}>
                          {formatPrice(order.total)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/account/orders/${order.id}`}
                          className="btn-sm btn-secondary text-xs"
                        >
                          Order Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <ShoppingBag
              size={36}
              className="mx-auto mb-3"
              style={{ color: "var(--border)" }}
              aria-hidden="true"
            />
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              No orders yet
            </p>
            <Link href="/category/all" className="btn-sm btn-primary mt-3 inline-flex">
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* ─── Wishlist Items (client — reads Redux) ── */}
      <WishlistPreview />
    </div>
  );
}
