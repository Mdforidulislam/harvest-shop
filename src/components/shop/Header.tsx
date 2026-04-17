"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartCount, setDrawerOpen } from "@/features/cart/cartSlice";
import { selectWishlist } from "@/features/wishlist/wishlistSlice";
import { categories } from "@/lib/fake-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/category/all", hasDropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const wishlist = useAppSelector(selectWishlist);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [shopDropdown, setShopDropdown] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="text-center text-xs py-2 px-4 font-medium" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>
        🌿 Free delivery on orders over ৳1500 &nbsp;|&nbsp; Use code <strong>FRESH10</strong> for 10% off
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-shadow duration-200",
          scrolled ? "shadow-md" : ""
        )}
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg font-bold" style={{ background: "var(--primary)" }}>H</div>
            <span className="font-display font-bold text-xl hidden sm:block" style={{ color: "var(--text)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Harvest<span style={{ color: "var(--primary)" }}>.</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="flex w-full rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
              <select className="text-xs px-3 border-r bg-transparent focus:outline-none" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                <option value="">All</option>
                {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search organic products…"
                className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none"
                style={{ color: "var(--text)" }}
              />
              <button className="px-3" style={{ color: "var(--primary)" }} aria-label="Search">
                <Search size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setShopDropdown(true)}
                  onMouseLeave={() => setShopDropdown(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text)" }}>
                    {link.label} <ChevronDown size={14} />
                  </button>
                  {shopDropdown && (
                    <div className="absolute top-full left-0 w-56 card py-2 z-50 mt-1">
                      {categories.map((c) => (
                        <Link key={c.id} href={`/category/${c.slug}`} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--surface-2)] transition-colors" style={{ color: "var(--text)" }}>
                          <span>{c.icon}</span> {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text)" }}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            <ThemeToggle />

            {/* Wishlist */}
            <Link href="/wishlist" className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.75} style={{ color: "var(--text-muted)" }} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ background: "var(--danger)" }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => dispatch(setDrawerOpen(true))}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={18} strokeWidth={1.75} style={{ color: "var(--text-muted)" }} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ background: "var(--primary)" }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            <Link href="/account" className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" aria-label="Account">
              <User size={18} strokeWidth={1.75} style={{ color: "var(--text-muted)" }} />
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <Search size={16} style={{ color: "var(--text-muted)" }} />
                <input placeholder="Search…" className="flex-1 bg-transparent text-sm focus:outline-none" style={{ color: "var(--text)" }} />
              </div>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium border-b" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                  {l.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {categories.map((c) => (
                  <Link key={c.id} href={`/category/${c.slug}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 p-2 rounded-lg text-xs" style={{ background: "var(--surface-2)", color: "var(--text)" }}>
                    <span>{c.icon}</span> {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
