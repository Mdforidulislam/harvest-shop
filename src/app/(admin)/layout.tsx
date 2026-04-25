"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart2,
  Star, CreditCard, Store, Zap, Paintbrush, Settings,
  ChevronDown, ChevronRight, Menu, X, Bell, LogOut,
  Leaf, Search, UserCircle,
} from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

/* ── Navigation definition ──────────────────────────── */

type NavChild = { href: string; label: string };
type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  expandable?: boolean;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  { href: "/admin",              label: "Dashboard",   icon: LayoutDashboard },
  {
    href: "/admin/products",     label: "Products",    icon: Package, expandable: true,
    children: [
      { href: "/admin/products",     label: "All Products" },
      { href: "/admin/products/new", label: "New Product"  },
    ],
  },
  {
    href: "/admin/orders",       label: "Orders",      icon: ShoppingCart, expandable: true,
    children: [
      { href: "/admin/orders",     label: "All Orders" },
      { href: "/admin/orders/new", label: "New Order"  },
    ],
  },
  { href: "/admin/customers",    label: "Customers",    icon: Users       },
  { href: "/admin/analytics",    label: "Statistics",   icon: BarChart2   },
  { href: "/admin/reviews",      label: "Reviews",      icon: Star        },
  { href: "/admin/payments",     label: "Transactions", icon: CreditCard  },
  { href: "/admin/sellers",      label: "Sellers",      icon: Store       },
  { href: "/admin/coupons",      label: "Hot offers",   icon: Zap         },
  {
    href: "/admin/appearance",   label: "Appearance",  icon: Paintbrush, expandable: true,
    children: [
      { href: "/admin/appearance",  label: "Theme"  },
      { href: "/admin/settings",    label: "Layout" },
    ],
  },
  { href: "/admin/settings",     label: "Settings",    icon: Settings    },
];

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/admin") return pathname === "/admin";
  return pathname.startsWith(item.href);
}

/* ── Layout ─────────────────────────────────────────── */

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-expand the parent of the active route on mount / navigation
  useEffect(() => {
    NAV_ITEMS.forEach((item) => {
      if (item.expandable && isItemActive(item, pathname)) {
        setExpanded((prev) => (prev.includes(item.href) ? prev : [...prev, item.href]));
      }
    });
  }, [pathname]);

  const toggleExpand = (href: string) =>
    setExpanded((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );

  /* ── Sidebar contents (shared desktop + mobile drawer) ── */
  const SidebarContents = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="h-16 flex items-center px-5 gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
          style={{ background: "var(--primary)" }}
        >
          <Leaf size={18} strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {(sidebarOpen || mobileOpen) && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="leading-none overflow-hidden"
            >
              <span
                className="font-black text-base tracking-tight block"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
              >
                Harvest
              </span>
              <span
                className="text-[9px] font-black uppercase tracking-[0.25em] block"
                style={{ color: "var(--primary)" }}
              >
                Console
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section label */}
      <div className="px-4 pt-5 pb-2 flex-shrink-0">
        <AnimatePresence>
          {(sidebarOpen || mobileOpen) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.3em]"
              style={{ color: "var(--text-muted)" }}
            >
              Manage listings
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto scrollbar-none px-3 pb-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isItemActive(item, pathname);
          const isExpanded = expanded.includes(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href}>
              {/* Parent item */}
              <button
                onClick={() => {
                  if (item.expandable) toggleExpand(item.href);
                  else {
                    setMobileOpen(false);
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  active && !item.expandable
                    ? "text-white shadow-lg"
                    : "hover:bg-[var(--surface-2)]"
                )}
                style={{
                  background:
                    active && !item.expandable ? "var(--primary)" : "transparent",
                  color:
                    active && !item.expandable ? "white" : "var(--text-muted)",
                }}
                aria-current={active && !item.expandable ? "page" : undefined}
                aria-expanded={item.expandable ? isExpanded : undefined}
              >
                {/* If not expandable, wrap with Link */}
                {!item.expandable ? (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 w-full"
                    tabIndex={-1}
                  >
                    <Icon
                      size={17}
                      className="flex-shrink-0"
                      style={{ color: active ? "white" : "var(--text-muted)" }}
                      aria-hidden="true"
                    />
                    <AnimatePresence>
                      {(sidebarOpen || mobileOpen) && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.12 }}
                          className="flex-1 text-left whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                ) : (
                  <>
                    <Icon
                      size={17}
                      className="flex-shrink-0"
                      style={{ color: active ? "var(--primary)" : "var(--text-muted)" }}
                      aria-hidden="true"
                    />
                    <AnimatePresence>
                      {(sidebarOpen || mobileOpen) && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.12 }}
                          className="flex-1 text-left whitespace-nowrap overflow-hidden"
                          style={{ color: active ? "var(--primary)" : "var(--text-muted)" }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {(sidebarOpen || mobileOpen) && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                        aria-hidden="true"
                      >
                        <ChevronRight
                          size={14}
                          style={{ color: "var(--text-muted)" }}
                        />
                      </motion.div>
                    )}
                  </>
                )}
              </button>

              {/* Sub-items */}
              <AnimatePresence>
                {item.expandable && isExpanded && (sidebarOpen || mobileOpen) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden ml-5 mt-0.5 space-y-0.5"
                    style={{ paddingLeft: "0.5rem", borderLeft: "2px solid var(--border)" }}
                  >
                    {item.children?.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{
                            background: childActive ? "var(--primary-soft)" : "transparent",
                            color: childActive ? "var(--primary)" : "var(--text-muted)",
                          }}
                          aria-current={childActive ? "page" : undefined}
                        >
                          <ChevronRight
                            size={11}
                            style={{ color: childActive ? "var(--primary)" : "var(--border)" }}
                            aria-hidden="true"
                          />
                          {child.label}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer: user + collapse */}
      <div
        className="p-3 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl transition-all overflow-hidden",
            sidebarOpen || mobileOpen ? "bg-[var(--surface-2)]" : "bg-transparent"
          )}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
            style={{ background: "var(--primary)" }}
          >
            A
          </div>
          <AnimatePresence>
            {(sidebarOpen || mobileOpen) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p
                  className="font-bold text-xs truncate"
                  style={{ color: "var(--text)" }}
                >
                  Administrator
                </p>
                <p
                  className="text-[10px] truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  System Root
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {(sidebarOpen || mobileOpen) && (
            <button
              className="flex-shrink-0 transition-colors hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
              aria-label="Sign out"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="hidden lg:flex w-full mt-2 h-9 rounded-xl items-center justify-center transition-all border"
          style={{
            borderColor: "var(--border)",
            borderStyle: "dashed",
            color: "var(--text-muted)",
          }}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Desktop sidebar (sticky) ───────────────── */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-hidden z-[100]"
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
        aria-label="Main navigation"
      >
        <SidebarContents />
      </motion.aside>

      {/* ── Mobile drawer overlay ──────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] lg:hidden"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer sidebar ──────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-screen z-[120] lg:hidden overflow-hidden"
            style={{
              width: 240,
              background: "var(--surface)",
              borderRight: "1px solid var(--border)",
              boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
            }}
            aria-label="Navigation drawer"
          >
            <SidebarContents />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main viewport ──────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top header ─────────────────────────────── */}
        <header
          className={cn(
            "h-16 flex items-center justify-between px-5 lg:px-8 flex-shrink-0 sticky top-0 z-[90] transition-all duration-300",
            scrolled
              ? "bg-[var(--surface)]/90 backdrop-blur-xl shadow-sm"
              : "bg-[var(--surface)]"
          )}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Left: mobile hamburger + logo mark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]"
              style={{ color: "var(--text-muted)" }}
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>
            {/* Circular brand mark */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md"
              style={{ background: "var(--primary)" }}
              aria-hidden="true"
            >
              <Leaf size={16} strokeWidth={2.5} />
            </div>
          </div>

          {/* Center: global search */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search…"
                className="w-full h-9 pl-10 pr-4 rounded-full text-xs outline-none transition-all"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
                aria-label="Global search"
              />
            </div>
          </div>

          {/* Right: bell + theme + user avatar */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Notification bell */}
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]"
              style={{ color: "var(--text-muted)" }}
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span
                className="absolute top-2 right-2 w-2 h-2 rounded-full border-2"
                style={{ background: "var(--danger)", borderColor: "var(--surface)" }}
                aria-hidden="true"
              />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User avatar + chevron */}
            <button
              className="flex items-center gap-1.5 pl-1 pr-2 h-9 rounded-xl transition-colors hover:bg-[var(--surface-2)]"
              aria-label="Account menu"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                style={{ background: "var(--primary)" }}
                aria-hidden="true"
              >
                A
              </div>
              <ChevronDown size={12} style={{ color: "var(--text-muted)" }} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* ── Page content ───────────────────────────── */}
        <main className="flex-1 p-5 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
