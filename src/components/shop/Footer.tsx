import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const quickLinks = [
  { label: "Shop All", href: "/category/all" },
  { label: "Best Sellers", href: "/category/all?sort=popular" },
  { label: "New Arrivals", href: "/category/all?sort=new" },
  { label: "Flash Deals", href: "/category/all?sale=true" },
  { label: "Compare", href: "/compare" },
];

const customerLinks = [
  { label: "My Account", href: "/account" },
  { label: "Order Tracking", href: "/account/orders" },
  { label: "Returns & Refund", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg font-bold" style={{ background: "var(--primary)" }}>H</div>
              <span className="font-bold text-xl" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                Harvest<span style={{ color: "var(--primary)" }}>.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              Pure, organic food products sourced directly from Bangladesh's finest farms. No chemicals, no compromise.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: YoutubeIcon, label: "YouTube" },
                { Icon: TwitterIcon, label: "X / Twitter" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--primary-soft)]" aria-label={label} style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Customer Service</h4>
            <ul className="space-y-2">
              {customerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                123 Organic Lane, Gulshan-1, Dhaka 1212, Bangladesh
              </li>
              <li>
                <a href="tel:+8801700000000" className="flex gap-2 text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text-muted)" }}>
                  <Phone size={15} style={{ color: "var(--primary)" }} />+880 1700-000000
                </a>
              </li>
              <li>
                <a href="mailto:hello@harvest.com.bd" className="flex gap-2 text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text-muted)" }}>
                  <Mail size={15} style={{ color: "var(--primary)" }} />hello@harvest.com.bd
                </a>
              </li>
            </ul>
            <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
              <strong style={{ color: "var(--text)" }}>Hours:</strong> Sat–Thu, 9am–8pm
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 Harvest. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>We accept:</span>
            {["bKash", "Nagad", "Visa", "Mastercard", "COD"].map((m) => (
              <span key={m} className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
