"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Package, Heart, Tag, MapPin, CreditCard,
  Star, LifeBuoy, User, Calendar, Lock, Trash2, LogOut,
  ChevronRight, Menu, X, Phone, Mail,
} from "lucide-react";

const navItems = [
  { href: "/account",             label: "Dashboard",          icon: LayoutDashboard },
  { href: "/account/orders",      label: "My Orders",          icon: Package         },
  { href: "/account/wishlist",    label: "Wishlist's",         icon: Heart           },
  { href: "/account/coupons",     label: "Promo / Coupon",     icon: Tag             },
  { href: "/account/addresses",   label: "Address",            icon: MapPin          },
  { href: "/account/payments",    label: "Payments",           icon: CreditCard      },
  { href: "/account/reviews",     label: "Product Reviews",    icon: Star            },
  { href: "/account/profile",     label: "Manage Profile",     icon: User            },
  { href: "/account/security",    label: "Change Password",    icon: Lock            },
  { href: "/account/delete",      label: "Delete My Account",  icon: Trash2          },
];

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  return local.slice(0, 2) + "***@" + domain;
}

function maskPhone(phone: string): string {
  return phone.slice(0, 7) + "****" + phone.slice(-2);
}

const USER = { name: "Rabeya Khatun", email: "rabeya@email.com", phone: "+8801700000000", initials: "R" };

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const SidebarNav = () => (
    <>
      {/* Profile card — dark primary bg, overlaps the banner on desktop */}
      <div
        style={{
          background: "var(--primary)",
          borderRadius: 14,
          margin: "16px 12px 8px",
          padding: "18px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center font-bold text-xl flex-shrink-0"
            style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
            aria-hidden="true"
          >
            {USER.initials}
          </div>
          <div className="min-w-0">
            <p
              className="font-bold text-sm truncate"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "white" }}
            >
              {USER.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Mail size={10} style={{ color: "rgba(255,255,255,0.6)", flexShrink: 0 }} aria-hidden="true" />
              <p className="truncate" style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>
                {maskEmail(USER.email)}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Phone size={10} style={{ color: "rgba(255,255,255,0.6)", flexShrink: 0 }} aria-hidden="true" />
              <p className="truncate" style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>
                {maskPhone(USER.phone)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2"
        aria-label="Account navigation"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          const isDangerous = href === "/account/delete";
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all"
              style={{
                background: active ? "var(--primary)" : "transparent",
                color: active ? "white" : isDangerous ? "var(--danger)" : "var(--text-muted)",
              }}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                size={16}
                style={{
                  color: active ? "white" : isDangerous ? "var(--danger)" : "var(--text-muted)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span className="flex-1 truncate">{label}</span>
              {active && (
                <ChevronRight size={13} style={{ color: "white", flexShrink: 0 }} aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "10px 8px", flexShrink: 0 }}>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all hover:opacity-80"
          style={{ color: "var(--danger)", background: "transparent" }}
          aria-label="Sign out of your account"
        >
          <LogOut size={16} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div style={{ background: "var(--bg)", minHeight: "calc(100vh - 64px)" }}>

      {/* ── Banner (full width) ─────────────────── */}
      <div
        style={{
          height: 200,
          background: "linear-gradient(135deg, var(--primary) 0%, var(--account-banner-end) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Inner wrapper keeps hamburger aligned with the page-container edges */}
        <div className="page-container h-full flex items-start justify-end pt-4">
          <button
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.18)" }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-account-drawer"
          >
            <Menu size={20} style={{ color: "white" }} />
          </button>
        </div>

        {/* Decorative shapes */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} aria-hidden="true" />
        <div style={{ position: "absolute", bottom: -70, left: "18%", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} aria-hidden="true" />
        <div style={{ position: "absolute", top: 24, right: "28%", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.09)", pointerEvents: "none" }} aria-hidden="true" />
        <div style={{ position: "absolute", top: 80, left: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} aria-hidden="true" />
      </div>

      {/* ── Mobile backdrop ─────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer ───────────────────────── */}
      <aside
        id="mobile-account-drawer"
        className={`fixed lg:hidden flex flex-col z-50 top-0 left-0 h-screen overflow-y-auto scrollbar-thin transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: 280,
          background: "var(--surface)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
        }}
        aria-label="Account navigation"
        aria-hidden={!drawerOpen}
      >
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <span
            className="font-bold text-sm"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
          >
            Account Menu
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--surface-2)" }}
            aria-label="Close menu"
          >
            <X size={15} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>
        <SidebarNav />
      </aside>

      {/* ── Desktop: sidebar + content ──────────── */}
      {/* page-container matches the shop's global max-width; position:relative + z-index:1 lifts this above the banner so the sidebar overlap works */}
      <div className="page-container flex items-start" style={{ position: "relative", zIndex: 1 }}>

        {/* Desktop sidebar — sticky, pulled up 90px to overlap banner */}
        <aside
          className="hidden lg:flex flex-col flex-shrink-0"
          style={{
            width: 280,
            background: "var(--surface)",
            borderRight: "1px solid var(--border)",
            position: "sticky",
            top: 64,
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            marginTop: -90,
            zIndex: 10,
          }}
          aria-label="Account navigation"
        >
          <SidebarNav />
        </aside>

        {/* Right content area */}
        <main className="flex-1 p-4 lg:p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
