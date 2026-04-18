"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles, Send, ArrowRight } from "lucide-react";

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg>
);

const footLinks = {
  roots: [
    { label: "Our Story", href: "/about" },
    { label: "The Wisdom Blog", href: "/blog" },
    { label: "Farmer Networks", href: "/farmers" },
    { label: "Community", href: "/community" },
  ],
  harvests: [
    { label: "Raw Honey", href: "/category/honey" },
    { label: "Organic Ghee", href: "/category/ghee" },
    { label: "Sundarban Wax", href: "/category/wax" },
    { label: "Seasonals", href: "/category/seasonal" },
  ],
  protection: [
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Terms of Harvest", href: "/terms" },
    { label: "Privacy Core", href: "/privacy" },
    { label: "Refund Rituals", href: "/refund" },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-2)] text-[var(--text)] pt-24 pb-12 overflow-hidden border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid lg:grid-cols-12 gap-16 mb-24 pb-24 border-b border-[var(--border)]">
          <div className="lg:col-span-12 xl:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-[var(--primary)]/20 transition-transform group-hover:rotate-6">H</div>
              <span className="font-black text-3xl tracking-tighter uppercase text-[var(--text)]">HARVEST</span>
            </Link>
            <p className="text-xl font-bold text-[var(--text-muted)] leading-relaxed mb-10 max-w-sm">
              Cultivating the intersection of traditional purity and modern wellness directly from the hearts of Bangladeshi farms.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: YoutubeIcon, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] transition-all hover:bg-[var(--primary)] hover:text-white hover:-translate-y-1 group group-hover:shadow-xl" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7">
            <div className="bg-[var(--surface)] p-8 md:p-12 rounded-[3.5rem] border border-[var(--border)] relative overflow-hidden group shadow-2xl shadow-black/5">
              <h3 className="text-3xl font-black mb-4 relative z-10 tracking-tighter">Stay Connected to <span className="text-[var(--primary)]">The Roots.</span></h3>
              <p className="text-lg font-medium text-[var(--text-muted)] mb-8 relative z-10">Exclusive access to seasonal harvests and farm insights.</p>

              <form className="relative flex flex-col md:flex-row gap-3 relative z-10" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Enlighten us with your email..." className="flex-1 h-14 rounded-2xl px-6 bg-[var(--surface-2)] border border-[var(--border)] font-bold text-sm outline-none focus:border-[var(--primary)] transition-all" />
                <button className="h-14 px-8 rounded-2xl bg-[var(--primary)] text-white font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[var(--primary-hover)] transition-all flex items-center justify-center gap-2">
                  Subscribe <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-8">Contacts</h4>
            <ul className="space-y-6">
              <li className="flex gap-3 text-sm font-bold text-[var(--text-muted)]"><MapPin size={18} /> Road 12, Block J, Gulshan-2</li>
              <li className="flex gap-3 text-sm font-black text-[var(--primary)]">+880 1700-000000</li>
              <li className="flex gap-3 text-sm font-bold text-[var(--text-muted)]"><Mail size={18} /> purity@harvest.com.bd</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-50 mb-8">The Roots</h4>
            <ul className="space-y-4">
              {footLinks.roots.map(l => <li key={l.label}><Link href={l.href} className="text-sm font-black text-[var(--text)] hover:text-[var(--primary)] transition-all">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-50 mb-8">Harvests</h4>
            <ul className="space-y-4">
              {footLinks.harvests.map(l => <li key={l.label}><Link href={l.href} className="text-sm font-black text-[var(--text)] hover:text-[var(--primary)] transition-all">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-50 mb-8">Protection</h4>
            <ul className="space-y-4">
              {footLinks.protection.map(l => <li key={l.label}><Link href={l.href} className="text-sm font-black text-[var(--text)] hover:text-[var(--primary)] transition-all">{l.label}</Link></li>)}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          <p className="text-[10px] font-black uppercase tracking-widest">© 2026 Harvest Organic. All Harvests Reserved.</p>
          <div className="flex gap-6">
            {["SSL Secure", "bKash", "Nagad", "Visa", "Mastercard"].map(p => <span key={p} className="text-[9px] font-black uppercase tracking-widest">{p}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
