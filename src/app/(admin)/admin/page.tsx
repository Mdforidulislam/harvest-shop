import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp, TrendingDown, ShoppingBag, Users, Package,
  DollarSign, ArrowRight, Eye, CheckCircle, Clock, Truck,
} from "lucide-react";
import { fakeOrders, products } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard — Harvest" };

const stats = [
  {
    label: "Total Revenue",
    value: "৳1,84,250",
    change: "+18.2%",
    up: true,
    icon: DollarSign,
    color: "var(--primary)",
    bg: "var(--primary-soft)",
    sub: "vs last month",
  },
  {
    label: "Total Orders",
    value: "342",
    change: "+12.5%",
    up: true,
    icon: ShoppingBag,
    color: "var(--accent)",
    bg: "var(--accent-soft)",
    sub: "vs last month",
  },
  {
    label: "Total Customers",
    value: "1,284",
    change: "+8.1%",
    up: true,
    icon: Users,
    color: "var(--info)",
    bg: "#dbeafe",
    sub: "vs last month",
  },
  {
    label: "Active Products",
    value: "87",
    change: "-2",
    up: false,
    icon: Package,
    color: "var(--warning)",
    bg: "#fef3c7",
    sub: "2 out of stock",
  },
];

const statusConfig: Record<string, { label: string; cls: string; icon: typeof Clock }> = {
  pending:    { label: "Pending",    cls: "badge-warning",  icon: Clock },
  processing: { label: "Processing", cls: "badge-primary",  icon: Package },
  shipped:    { label: "Shipped",    cls: "badge-info",     icon: Truck },
  delivered:  { label: "Delivered",  cls: "badge-success",  icon: CheckCircle },
  cancelled:  { label: "Cancelled",  cls: "badge-danger",   icon: Clock },
};

const topProducts = products.slice(0, 5).map((p, i) => ({
  ...p,
  sold: [142, 117, 98, 84, 73][i],
  revenue: formatPrice(p.price * [142, 117, 98, 84, 73][i]),
}));

export default function AdminDashboardPage() {
  const recentOrders = fakeOrders.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
          Good morning, Admin 👋
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon, color, bg, sub }) => (
          <div key={label} className="card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full`}
                style={{ background: up ? "#dcfce7" : "#fee2e2", color: up ? "var(--success)" : "var(--danger)" }}>
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {change}
              </span>
            </div>
            <p className="text-2xl font-bold price-num mb-0.5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
              {value}
            </p>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Recent Orders</h3>
            <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--primary)" }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const cfg = statusConfig[order.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl transition-colors" style={{ background: "var(--surface-2)" }}>
                  <div className="flex -space-x-2 flex-shrink-0">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div key={i} className="relative w-9 h-9 rounded-lg overflow-hidden border-2" style={{ borderColor: "var(--surface)" }}>
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="36px" />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{order.id}</p>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                      {order.items.length} item{order.items.length > 1 ? "s" : ""} · {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold price-num" style={{ color: "var(--text)" }}>{formatPrice(order.total)}</p>
                    <span className={`badge ${cfg.cls} text-[10px] gap-0.5`}>
                      <StatusIcon size={9} /> {cfg.label}
                    </span>
                  </div>
                  <button className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--border)] transition-colors" style={{ color: "var(--text-muted)" }}>
                    <Eye size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Top Products</h3>
            <Link href="/admin/products" className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--primary)" }}>
              All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold w-4 text-center flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                  {idx + 1}
                </span>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--surface-2)" }}>
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>{p.name}</p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{p.sold} sold</p>
                </div>
                <p className="text-xs font-bold price-num flex-shrink-0" style={{ color: "var(--primary)" }}>{p.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-5">
        <h3 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Add Product", href: "/admin/products/new", color: "var(--primary)", bg: "var(--primary-soft)" },
            { label: "View Orders", href: "/admin/orders", color: "var(--accent)", bg: "var(--accent-soft)" },
            { label: "Manage Users", href: "/admin/customers", color: "var(--info)", bg: "#dbeafe" },
            { label: "Site Settings", href: "/admin/settings", color: "var(--text-muted)", bg: "var(--surface-2)" },
          ].map(({ label, href, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl text-center text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: bg, color }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
