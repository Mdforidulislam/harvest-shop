"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, MapPin, Heart, Star,
  Lock, LogOut, User, ChevronRight, Bell, Gift,
} from "lucide-react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/account",           label: "Dashboard",       icon: LayoutDashboard },
      { href: "/account/orders",    label: "My Orders",       icon: Package,  badge: "1" },
    ],
  },
  {
    label: "Shopping",
    items: [
      { href: "/account/wishlist",  label: "Wishlist",        icon: Heart },
      { href: "/account/rewards",   label: "Rewards & Points",icon: Gift },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/account/profile",   label: "Edit Profile",    icon: User },
      { href: "/account/addresses", label: "Addresses",       icon: MapPin },
      { href: "/account/reviews",   label: "My Reviews",      icon: Star },
      { href: "/account/security",  label: "Change Password", icon: Lock },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentLabel = allItems.find((i) => i.href === pathname)?.label ?? "Account";

  return (
    <div className="flex min-h-[calc(100vh-64px)]" style={{ background: "var(--bg)" }}>

      {/* ── Sidebar ─────────────────────────────── */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col sticky top-16 self-start"
        style={{
          height: "calc(100vh - 64px)",
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Profile block */}
        <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: "var(--primary)" }}
            >
              R
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                Rabeya Khatun
              </p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                rabeya@email.com
              </p>
            </div>
          </div>
          {/* Loyalty pill */}
          <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
            <span>🌿 Gold Member</span>
            <span className="font-bold">340 pts</span>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1 px-2"
                style={{ color: "var(--text-muted)" }}
              >
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(({ href, label, icon: Icon, badge }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        background: active ? "var(--primary-soft)" : "transparent",
                        color: active ? "var(--primary)" : "var(--text-muted)",
                      }}
                    >
                      <Icon size={14} />
                      <span className="flex-1">{label}</span>
                      {badge && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                          style={{ background: "var(--warning)" }}
                        >
                          {badge}
                        </span>
                      )}
                      {active && <ChevronRight size={11} style={{ color: "var(--primary)" }} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
          <button
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium w-full transition-colors hover:bg-red-50"
            style={{ color: "var(--danger)" }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-14 flex items-center justify-between px-6 flex-shrink-0 sticky top-16 z-10"
          style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <h1
            className="text-sm font-semibold"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
          >
            {currentLabel}
          </h1>
          <div className="flex items-center gap-2">
            <button
              className="relative w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--surface-2)" }}
            >
              <Bell size={14} style={{ color: "var(--text-muted)" }} />
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--danger)" }}
              />
            </button>
            <Link href="/category/all" className="btn-sm btn-secondary text-xs">
              ← Continue Shopping
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
