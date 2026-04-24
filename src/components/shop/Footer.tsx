"use client";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { footerData } from "@/lib/footer.data";

export default function Footer() {
  const { brand, contact, socials, appDownloads, linkColumns, paymentMethods, verifiedBadge, copyrightName } = footerData;
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--surface)", color: "var(--text)", borderTop: "1px solid var(--border)" }}>

      {/* ── Top Section ────────────────────────────────── */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8">

          {/* Column 1: Brand — full-width on tablet, normal on desktop */}
          <div className="md:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl"
                style={{ background: "var(--accent)", color: "white" }}
              >
                D
              </div>
              <div className="leading-none">
                <span className="font-black text-xl tracking-tight" style={{ color: "var(--text)" }}>{brand.name}</span>
                <span className="font-bold text-sm" style={{ color: "var(--accent)" }}>{brand.wordmark}</span>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "var(--text-muted)" }}>
              {brand.description}
            </p>

            {/* Contact */}
            <ul className="space-y-2.5 mb-5">
              <li>
                <p className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                  <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  {contact.address}
                </p>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-100"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <Phone size={15} style={{ color: "var(--accent)" }} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 text-sm transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <Mail size={15} style={{ color: "var(--accent)" }} />
                  {contact.email}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-3 mb-6">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2–5: Link columns */}
          {linkColumns.map((col) => (
            <nav key={col.heading} aria-label={col.ariaLabel}>
              <h4
                className="font-bold text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--accent)" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="page-container py-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center justify-between gap-4">

            {/* Copyright */}
            <p className="text-xs whitespace-nowrap shrink-0 order-1" style={{ color: "var(--text-muted)" }}>
              Copyright © {year} {copyrightName} — All Rights Reserved
            </p>

        

            {/* SSL badge */}
            <div className="shrink-0 order-2 sm:order-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={verifiedBadge.src}
                alt={verifiedBadge.alt}
                className="h-28 w-auto object-contain"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const fb = el.nextElementSibling as HTMLElement | null;
                  if (fb) fb.style.display = "inline-flex";
                }}
              />
              <span
                className="hidden text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded"
                style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
              >
                {verifiedBadge.alt}
              </span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
