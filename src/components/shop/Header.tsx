"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X, Phone, MapPin, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartCount, setDrawerOpen } from "@/features/cart/cartSlice";
import { selectWishlist } from "@/features/wishlist/wishlistSlice";
import { categories } from "@/lib/fake-data";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/shared/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/category/all" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistItems = useAppSelector(selectWishlist);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── Row 1: Top promotional bar ─────────────────── */}
      <div className="text-white py-2  hidden md:block" style={{ background: "var(--primary)" }}>
        <div className="page-container flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <Truck size={13} />
              Free Delivery on orders over ৳999
            </span>
            <span className="flex items-center gap-1.5 opacity-70">
              <MapPin size={13} />
              Dhaka, Bangladesh
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+8801700000000" className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <Phone size={13} /> +880 1700-000000
            </a>
          </div>
        </div>
      </div>

      {/* ── Row 2: Main header ─────────────────── */}
      <header
        className={cn(
          "sticky top-0  z-50 transition-all duration-300 bg-[var(--surface)] border-b border-[var(--border)]",
          scrolled ? "shadow-md py-2" : "py-3"
        )}
      >
        <div className="page-container flex items-center gap-4">

          {/* Left: mobile button + logo */}
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded border transition-colors border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <Menu size={20} />
            </button>

            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-xl shadow"
                style={{ background: "var(--primary)" }}
              >
                D
              </div>
              <div className="hidden sm:block leading-none">
                <span className="font-black text-xl tracking-tight text-[var(--primary)]">DROVO</span>
                <span className="block text-[9px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>.BD</span>
              </div>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="w-full max-w-2xl relative hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-11 pl-4 pr-12 rounded-lg border text-sm focus:outline-none transition-colors border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button
              className="absolute right-0 top-0 h-11 w-12 flex items-center justify-center rounded-r-lg text-white"
              style={{ background: "var(--accent)" }}
            >
              <Search size={18} />
            </button>
          </div>

          {/* Right: Action icons */}
          <div className="flex items-center gap-1 flex-1 justify-end">

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors group hover:bg-[var(--surface-2)]"
            >
              <div className="relative">
                <Heart size={22} className="text-[var(--text-muted)] group-hover:text-red-500 transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-[10px] font-medium leading-none text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">Wishlist</span>
            </Link>

            {/* My Account */}
            <Link
              href="/account"
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors group hover:bg-[var(--surface-2)]"
            >
              <User size={22} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
              <span className="hidden lg:block text-[10px] font-medium leading-none text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">My Account</span>
            </Link>

            {/* Cart */}
            <button
              onClick={() => dispatch(setDrawerOpen(true))}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors group relative hover:bg-[var(--surface-2)]"
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 rounded-full text-white text-[9px] font-black flex items-center justify-center px-0.5"
                    style={{ background: "var(--accent)" }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-[10px] font-medium leading-none text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">Cart</span>
            </button>

            {/* Dark mode toggle */}
            <ThemeToggle className="hidden md:flex ml-2" />
          </div>
        </div>

        {/* ── Row 3: Category nav ─────────────────── */}
        <div className="hidden lg:block border-t border-[var(--border)]" style={{ background: "var(--primary)" }}>
          <div className="page-container">
            <nav className="flex items-center gap-1">
              <Link
                href="/category/all"
                className="flex items-center gap-2 pr-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
              >
                All Categories
              </Link>
              <span className="text-white/20 text-sm">|</span>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="px-4 py-3 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-[110] shadow-2xl flex flex-col bg-[var(--surface)]"
            >
              <div className="flex justify-between items-center p-4 border-b" style={{ background: "var(--primary)" }}>
                <span className="font-black text-xl text-white tracking-tight">DROVO.BD</span>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-[var(--border)]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full h-10 pl-4 pr-10 rounded-lg border text-sm focus:outline-none border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] placeholder:text-[var(--text-muted)]"
                    />
                    <Search size={16} className="absolute right-3 top-3 text-[var(--text-muted)]" />
                  </div>
                </div>

                <nav className="p-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="p-4 border-t border-[var(--border)]">
                  <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[var(--text-muted)]">Categories</p>
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/category/${c.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-2)]">
                <a href="tel:+8801700000000" className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--primary)" }}>
                  <Phone size={16} style={{ color: "var(--accent)" }} /> +880 1700-000000
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
