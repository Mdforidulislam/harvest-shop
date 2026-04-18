"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Package, Users, Tag,
  BarChart2, Settings, LogOut, Leaf, Bell, ChevronRight,
  CreditCard, Ticket, ChevronDown, Menu, X, ArrowUpRight,
  Search, Sparkles
} from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Intelligence",
    items: [
      { href: "/admin", label: "Workbench", icon: LayoutDashboard },
      { href: "/admin/analytics", label: "Performance", icon: BarChart2 },
    ],
  },
  {
    label: "The Market",
    items: [
      { href: "/admin/orders", label: "Harvest Hub", icon: ShoppingBag, badge: "3" },
      { href: "/admin/products", label: "Catalogue", icon: Package },
      { href: "/admin/categories", label: "Sections", icon: Tag },
      { href: "/admin/customers", label: "Audience", icon: Users },
    ],
  },
  {
    label: "Treasury",
    items: [
      { href: "/admin/payments", label: "Ledgers", icon: CreditCard },
      { href: "/admin/coupons", label: "Incentives", icon: Ticket },
    ],
  },
  {
    label: "Configuration",
    items: [
      { href: "/admin/settings", label: "Preferences", icon: Settings },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentItem = allItems.find((i) => pathname === i.href || (i.href !== "/admin" && pathname.startsWith(i.href)));

  return (
    <div className="min-h-screen flex bg-[var(--bg)] selection:bg-[var(--primary-soft)] selection:text-[var(--primary)]">

      {/* ── Sidebar ─────────────────────────────── */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="flex-shrink-0 flex flex-col transition-all duration-300 z-[100] h-screen sticky top-0 bg-[var(--surface)] border-r border-[var(--border)] group/sidebar"
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-6 gap-4 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-[var(--primary)] shadow-xl shadow-[var(--primary)]/20 flex-shrink-0 group-hover/sidebar:rotate-6 transition-transform">
            <Leaf size={24} strokeWidth={2.5} />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col leading-none"
              >
                <span className="font-black text-xl tracking-tighter text-[var(--text)] uppercase" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Harvest</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">Console</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Flow */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-10 scrollbar-none">
          {navGroups.map((group) => (
            <div key={group.label}>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-black uppercase tracking-[.3em] mb-6 px-4"
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-2">
                {group.items.map(({ href, label, icon: Icon, badge }) => {
                  const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group/item relative overflow-hidden",
                        active
                          ? "bg-[var(--primary)] text-white shadow-2xl shadow-[var(--primary)]/20"
                          : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                      )}
                    >
                      <Icon size={18} className={cn("flex-shrink-0", active ? "text-white" : "group-hover/item:text-[var(--primary)] transition-colors")} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex-1 whitespace-nowrap"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {badge && sidebarOpen && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-lg text-[9px] font-black",
                          active ? "bg-white/20 text-white" : "bg-[var(--danger)] text-white"
                        )}>{badge}</span>
                      )}
                      {active && sidebarOpen && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-full" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Console Foot */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className={cn(
            "flex items-center gap-4 p-4 rounded-[2rem] transition-all overflow-hidden",
            sidebarOpen ? "bg-[var(--surface-2)]" : "bg-transparent"
          )}>
            <div className="w-10 h-10 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-sm shadow-lg flex-shrink-0">A</div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
                  <p className="font-black text-xs text-[var(--text)] truncate">Administrator</p>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] truncate opacity-60">System Root</p>
                </motion.div>
              )}
            </AnimatePresence>
            {sidebarOpen && <button className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"><LogOut size={16} /></button>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full mt-4 h-12 rounded-2xl border-2 border-dashed border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.aside>

      {/* ── Main Viewport ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Superior Header */}
        <header
          className={cn(
            "h-24 flex items-center justify-between px-10 flex-shrink-0 sticky top-0 z-[90] transition-all duration-500",
            scrolled ? "bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-2xl shadow-black/[0.02]" : "bg-transparent"
          )}
        >
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-1">
                <Sparkles size={10} fill="currentColor" /> System Online
              </div>
              <h2 className="text-xl font-black text-[var(--text)] tracking-tight">
                {currentItem?.label ?? "Control Panel"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input placeholder="Search Console..." className="w-64 h-11 pl-12 pr-4 rounded-xl bg-[var(--surface-2)] border-none text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all" />
            </div>

            <div className="w-px h-6 bg-[var(--border)]" />

            <ThemeToggle />

            <button className="relative w-11 h-11 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-all">
              <Bell size={18} />
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--danger)] border-2 border-[var(--surface)]" />
            </button>

            <Link href="/" className="h-11 px-6 rounded-xl bg-[var(--surface-2)] text-[var(--text)] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[var(--primary)] hover:text-white transition-all group">
              Exit to Shop <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </header>

        {/* Central Stage */}
        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
