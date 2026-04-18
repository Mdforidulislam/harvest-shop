"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown, Sparkles, MapPin, Phone, Truck, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCartCount, setDrawerOpen } from "@/features/cart/cartSlice";
import { selectWishlist } from "@/features/wishlist/wishlistSlice";
import { categories } from "@/lib/fake-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/category/all", hasDropdown: true },
  { label: "The Wisdom", href: "/blog" },
  { label: "Our Roots", href: "/about" },
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
      {/* Top Bar - High Contrast for both modes */}
      <div className="bg-[#1A1A1A] text-white py-2.5 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[#6BB36F] animate-pulse">
              <Sparkles size={12} fill="currentColor" />
              Ramadan Special: Up to 25% Off
            </span>
            <span className="opacity-40 flex items-center gap-2">
              <MapPin size={12} />
              Based in Dhaka, Bangladesh
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+8801700000000" className="opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2">
              <Phone size={12} /> +880 1700-000000
            </a>
            <Link href="/help" className="opacity-40 hover:opacity-100 transition-opacity">Help Center</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 bg-[var(--surface)]",
          scrolled ? "py-2 shadow-2xl shadow-black/5" : "py-4 md:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4 md:gap-12">

          {/* Menu Button (Mobile) */}
          <button onClick={() => setMobileOpen(true)} className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface-2)] active:scale-95 transition-all text-[var(--text)]">
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white text-xl md:text-2xl font-black shadow-lg shadow-[var(--primary)]/20 group-hover:rotate-6 transition-transform">H</div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-black text-lg md:text-2xl tracking-tighter text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>HARVEST</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--primary)]">Organic Shop</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative group">
            <input
              type="text"
              placeholder="Search for pure honey, deshi ghee, nuts..."
              className="w-full h-12 px-6 pr-12 rounded-2xl bg-[var(--surface-2)] border border-transparent text-sm font-bold focus:bg-[var(--surface)] focus:border-[var(--primary)] outline-none transition-all placeholder:opacity-30 text-[var(--text)]"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-4 lg:gap-6">
            <Link href="/wishlist" className="relative flex flex-col items-center group w-10 h-10 md:w-12 md:h-12 items-center justify-center">
              <Heart size={20} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-all" />
              {wishlistItems.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-[var(--surface)]" />}
            </Link>

            <button onClick={() => dispatch(setDrawerOpen(true))} className="relative flex flex-col items-center group w-10 h-10 md:w-12 md:h-12 items-center justify-center">
              <ShoppingCart size={20} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-all" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#F58220] text-white text-[9px] font-black flex items-center justify-center border-2 border-[var(--surface)]">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden md:block w-px h-6 bg-[var(--border)] mx-2" />

            <ThemeToggle className="hidden md:flex" />

            <Link href="/account" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-[var(--primary)]/10 hover:-translate-y-0.5 transition-all">
              <User size={14} /> Account
            </Link>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden lg:block border-t border-[var(--border)] mt-4 py-3 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-none">
            <nav className="flex items-center justify-center gap-10 whitespace-nowrap">
              <Link href="/category/all" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] hover:opacity-80 transition-all">
                <LayoutGrid size={14} /> All Categories
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="text-[10px] font-black uppercase tracking-widest text-[var(--text)] hover:text-[#F58220] transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-[var(--surface)] z-[110] shadow-2xl p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                <Link href="/" className="font-black text-2xl tracking-tighter text-[var(--text)]">HARVEST</Link>
                <button onClick={() => setMobileOpen(false)} className="w-10 h-10 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--text)]"><X size={20} /></button>
              </div>
              <div className="space-y-6 mb-12">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-3xl font-black text-[var(--text)] hover:text-[var(--primary)] transition-colors">{link.label}</Link>
                ))}
              </div>
              <div className="pt-8 border-t border-[var(--border)] space-y-4">
                <ThemeToggle />
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Support Line</p>
                <p className="text-xl font-black text-[var(--text)]">+880 1700-000000</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
