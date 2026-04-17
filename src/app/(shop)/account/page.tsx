import Link from "next/link";
import Image from "next/image";
import {
  Package, MapPin, Heart, Clock, Star, ShoppingBag,
  ArrowRight, CheckCircle, Truck, Edit3, Gift,
} from "lucide-react";
import { fakeOrders, products } from "@/lib/fake-data";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

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
  const recentOrders = fakeOrders.slice(0, 3);
  const wishlistPreview = products.slice(0, 4);

  return (
    <div className="space-y-6">

      {/* ─── Profile Card ─────────────────────────── */}
      <div className="card overflow-hidden">
        {/* Cover banner */}
        <div className="h-24 relative" style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white border-4 shadow-lg"
                style={{ background: "var(--primary)", borderColor: "var(--surface)" }}>
                R
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ background: "var(--success)", borderColor: "var(--surface)" }}>
                <CheckCircle size={10} color="white" />
              </div>
            </div>

            <div className="flex-1 min-w-0 sm:pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                  Rabeya Khatun
                </h1>
                <span className="badge badge-success text-[10px]">Verified</span>
                <span className="badge badge-accent text-[10px]">Gold Member</span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>rabeya@email.com · Member since Jan 2024</p>
            </div>

            <Link href="/account/profile" className="btn-sm btn-secondary flex items-center gap-1.5 self-start sm:self-auto">
              <Edit3 size={13} /> Edit Profile
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Package,  label: "Orders",    value: "12",  color: "var(--primary)", bg: "var(--primary-soft)", href: "/account/orders" },
              { icon: Clock,    label: "Pending",   value: "1",   color: "var(--warning)", bg: "#fef3c7",             href: "/account/orders" },
              { icon: Heart,    label: "Wishlist",  value: "5",   color: "var(--danger)",  bg: "#fee2e2",             href: "/wishlist" },
              { icon: Star,     label: "Reviews",   value: "8",   color: "var(--accent)",  bg: "var(--accent-soft)",  href: "/account/reviews" },
            ].map(({ icon: Icon, label, value, color, bg, href }) => (
              <Link key={label} href={href} className="flex flex-col items-center justify-center p-3 rounded-xl transition-transform hover:-translate-y-0.5" style={{ background: bg }}>
                <Icon size={16} style={{ color }} />
                <p className="text-lg font-bold mt-1 price-num" style={{ color }}>{value}</p>
                <p className="text-[10px] font-medium" style={{ color }}>{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Loyalty Banner ───────────────────────── */}
      <div className="card p-5 flex items-center gap-4" style={{ background: "linear-gradient(90deg, var(--primary-soft), var(--accent-soft))" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary)" }}>
          <Gift size={18} color="white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            Gold Member — 340 points
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div className="h-full rounded-full" style={{ width: "68%", background: "var(--primary)" }} />
            </div>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>160 pts to Platinum</span>
          </div>
        </div>
        <Link href="/account/rewards" className="btn-sm btn-primary flex-shrink-0">View Rewards</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ─── Recent Orders ─────────────────────── */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Recent Orders</h2>
            <Link href="/account/orders" className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--primary)" }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const StatusIcon = statusIcons[order.status];
              return (
                <Link key={order.id} href={`/account/orders/${order.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl group transition-colors hover:bg-[var(--surface-2)]"
                  style={{ border: "1px solid var(--border)" }}>
                  <div className="flex -space-x-2 flex-shrink-0">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div key={i} className="relative w-10 h-10 rounded-lg overflow-hidden border-2" style={{ borderColor: "var(--surface)" }}>
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold border-2" style={{ background: "var(--surface-2)", borderColor: "var(--surface)", color: "var(--text-muted)" }}>
                        +{order.items.length - 2}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{order.id}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(order.date)} · {order.items.length} items</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(order.total)}</p>
                    <span className={`badge ${statusColors[order.status]} text-[10px] inline-flex items-center gap-0.5`}>
                      <StatusIcon size={9} /> {order.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          {recentOrders.length === 0 && (
            <div className="text-center py-8">
              <ShoppingBag size={32} className="mx-auto mb-2" style={{ color: "var(--border)" }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No orders yet</p>
              <Link href="/category/all" className="btn-sm btn-primary mt-3 inline-flex">Start Shopping</Link>
            </div>
          )}
        </div>

        {/* ─── Wishlist Preview ──────────────────── */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Saved Items</h2>
            <Link href="/wishlist" className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--primary)" }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {wishlistPreview.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`}
                className="group rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                style={{ border: "1px solid var(--border)" }}>
                <div className="relative aspect-square overflow-hidden" style={{ background: "var(--surface-2)" }}>
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="160px" />
                  {p.salePrice && (
                    <span className="absolute top-2 left-2 badge badge-danger text-[10px]">Sale</span>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-semibold line-clamp-1" style={{ color: "var(--text)" }}>{p.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {p.salePrice ? (
                      <>
                        <span className="text-xs font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(p.salePrice)}</span>
                        <span className="text-[10px] line-through price-num" style={{ color: "var(--text-muted)" }}>{formatPrice(p.price)}</span>
                      </>
                    ) : (
                      <span className="text-xs font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(p.price)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Quick Links ──────────────────────────── */}
      <div className="card p-5">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "My Orders",        href: "/account/orders",    icon: Package,  color: "var(--primary)",  bg: "var(--primary-soft)" },
            { label: "Saved Addresses",  href: "/account/addresses", icon: MapPin,   color: "var(--info)",     bg: "#dbeafe" },
            { label: "My Reviews",       href: "/account/reviews",   icon: Star,     color: "var(--warning)",  bg: "#fef3c7" },
            { label: "Edit Profile",     href: "/account/profile",   icon: Edit3,    color: "var(--accent)",   bg: "var(--accent-soft)" },
          ].map(({ label, href, icon: Icon, color, bg }) => (
            <Link key={label} href={href}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl text-center transition-transform hover:-translate-y-0.5"
              style={{ background: bg }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "white" }}>
                <Icon size={16} style={{ color }} />
              </div>
              <p className="text-xs font-semibold" style={{ color }}>{label}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
