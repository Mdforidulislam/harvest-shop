"use client";

const SSL_BADGE_SRC = "https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png";

export default function FooterBottomBar() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-white/10">
      <div className="page-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left: Copyright */}
        <p className="text-xs text-white/50">
          Copyright © {year} DROVO.BD — All Rights Reserved
        </p>

        {/* Right: Verified by SSLCommerz */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SSL_BADGE_SRC}
          alt="Verified by SSLCommerz"
          className="h-28 w-auto object-contain"
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
            const fallback = el.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "inline-flex";
          }}
        />
        <span
          className="hidden text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded text-white"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          Verified by SSLCommerz
        </span>

      </div>
    </div>
  );
}
