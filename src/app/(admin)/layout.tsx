"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Package, Users, Tag,
  BarChart2, Settings, LogOut, Leaf, Bell, ChevronRight,
  CreditCard, Ticket, ChevronDown,
} from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useState } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin",            label: "Dashboard",    icon: LayoutDashboard },
      { href: "/admin/analytics",  label: "Analytics",    icon: BarChart2 },
    ],
  },
  {
    label: "Store",
    items: [
      { href: "/admin/orders",     label: "Orders",       icon: ShoppingBag, badge: "3" },
      { href: "/admin/products",   label: "Products",     icon: Package },
      { href: "/admin/categories", label: "Categories",   icon: Tag },
      { href: "/admin/customers",  label: "Customers",    icon: Users },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/admin/payments",   label: "Payments",     icon: CreditCard },
      { href: "/admin/coupons",    label: "Coupons",      icon: Ticket },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings",   label: "Settings",     icon: Settings },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentLabel = allItems.find((i) => pathname.startsWith(i.href) && (i.href !== "/admin" || pathname === "/admin"))?.label ?? "Admin";

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>

      {/* ── Sidebar ─────────────────────────────── */}
      <aside
        className="flex-shrink-0 flex flex-col transition-all duration-200"
        style={{
          width: sidebarOpen ? "232px" : "60px",
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-4 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--primary)" }}>
            <Leaf size={15} />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="font-bold text-sm leading-tight truncate" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Harvest Admin</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>Management Console</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-4 px-2">
          {navGroups.map((group) => (
            <div key={group.label}>
              {sidebarOpen && (
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 px-2" style={{ color: "var(--text-muted)" }}>
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map(({ href, label, icon: Icon, badge }) => {
                  const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      title={!sidebarOpen ? label : undefined}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        background: active ? "var(--primary-soft)" : "transparent",
                        color: active ? "var(--primary)" : "var(--text-muted)",
                      }}
                    >
                      <Icon size={16} className="flex-shrink-0" />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 truncate">{label}</span>
                          {badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0" style={{ background: "var(--danger)" }}>{badge}</span>
                          )}
                          {active && <ChevronRight size={12} className="flex-shrink-0" style={{ color: "var(--primary)" }} />}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Profile / collapse */}
        <div className="p-2 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
          {sidebarOpen ? (
            <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "var(--surface-2)" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--primary)" }}>A</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>Admin</p>
                <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>admin@harvest.com.bd</p>
              </div>
              <button style={{ color: "var(--text-muted)" }} aria-label="Logout"><LogOut size={13} /></button>
            </div>
          ) : (
            <button className="w-full flex items-center justify-center py-2 rounded-lg" style={{ color: "var(--text-muted)" }} aria-label="Logout">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 flex items-center justify-between px-5 flex-shrink-0 sticky top-0 z-20"
          style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronDown size={16} className={`transition-transform ${sidebarOpen ? "-rotate-90" : "rotate-90"}`} />
            </button>
            <h1 className="text-sm font-semibold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
              {currentLabel}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors">
              <Bell size={16} style={{ color: "var(--text-muted)" }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--danger)" }} />
            </button>

            <Link href="/" className="btn-sm btn-secondary text-xs">← View Shop</Link>
          </div>
        </header>

        <main className="flex-1 p-5 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
