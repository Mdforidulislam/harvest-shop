"use client";
import { useState, useRef, useEffect } from "react";
import StarRating from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/lib/fake-data";

type Tab = "Description" | "Reviews" | "Video";

interface Props {
  description: string;
  specs: Record<string, string>;
  reviews: Review[];
  videoUrl?: string;
}

export default function ProductTabs({ description, specs, reviews, videoUrl }: Props) {
  const tabs: Tab[] = [
    "Description",
    ...(videoUrl ? (["Video"] as Tab[]) : []),
    "Reviews",
  ];

  const [active, setActive] = useState<Tab>("Description");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabBarRef = useRef<HTMLDivElement>(null);

  const avgRating =
    reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  function scrollToSection(tab: Tab) {
    setActive(tab);
    const el = sectionRefs.current[tab];
    const tabBar = tabBarRef.current;
    if (!el || !tabBar) return;
    const tabBarBottom = tabBar.getBoundingClientRect().bottom + window.scrollY;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elTop - tabBarBottom - 16, behavior: "smooth" });
  }

  // Update active tab based on scroll position
  useEffect(() => {
    function onScroll() {
      const tabBarHeight = tabBarRef.current?.offsetHeight ?? 60;
      for (const tab of [...tabs].reverse()) {
        const el = sectionRefs.current[tab];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= tabBarHeight + 32) {
          setActive(tab);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tabs]);

  return (
    <div>
      {/* Sticky tab bar */}
      <div
        ref={tabBarRef}
        className="sticky top-0 z-20 flex gap-0 border-b overflow-x-auto scrollbar-none"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className="relative px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors"
            style={{
              color: active === tab ? "var(--primary)" : "var(--text-muted)",
              borderBottom: active === tab ? "2px solid var(--accent)" : "2px solid transparent",
              background: "none",
            }}
          >
            {tab === "Reviews" ? (
              <>
                Customer Reviews
                {reviews.length > 0 && (
                  <span
                    className="ml-1.5 text-[10px] font-black px-1.5 py-0.5 rounded-full"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    {reviews.length}
                  </span>
                )}
              </>
            ) : tab === "Video" ? "Product Video" : tab}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>

        {/* Description Section */}
        <div
          ref={(el) => { sectionRefs.current["Description"] = el; }}
          className="py-8 px-1"
        >
          <h2
            className="text-base font-black mb-1"
            style={{ color: "var(--text)" }}
          >
            Product Details
          </h2>
          <div
            className="w-10 h-0.5 mb-5 rounded"
            style={{ background: "var(--accent)" }}
          />

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>

          {Object.keys(specs).length > 0 && (
            <div>
              <h3
                className="text-sm font-black mb-1"
                style={{ color: "var(--text)" }}
              >
                Key Features
              </h3>
              <div
                className="w-8 h-0.5 mb-4 rounded"
                style={{ background: "var(--accent)" }}
              />
              <ul className="space-y-1.5">
                {Object.entries(specs).map(([k, v]) => (
                  <li
                    key={k}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    <span>
                      <span className="font-semibold" style={{ color: "var(--text)" }}>{k}:</span>{" "}
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Video Section */}
        {videoUrl && (
          <div
            ref={(el) => { sectionRefs.current["Video"] = el; }}
            className="py-8 px-1"
          >
            <h2
              className="text-base font-black mb-1"
              style={{ color: "var(--text)" }}
            >
              Video
            </h2>
            <div
              className="w-10 h-0.5 mb-5 rounded"
              style={{ background: "var(--accent)" }}
            />
            <div
              className="relative w-full rounded-xl overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                src={videoUrl}
                title="Product video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div
          ref={(el) => { sectionRefs.current["Reviews"] = el; }}
          className="py-8 px-1"
        >
          <h2
            className="text-base font-black mb-1"
            style={{ color: "var(--text)" }}
          >
            Customer Reviews
          </h2>
          <div
            className="w-10 h-0.5 mb-5 rounded"
            style={{ background: "var(--accent)" }}
          />

          {/* Rating summary row */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-5xl font-black" style={{ color: "var(--text)" }}>
                  {avgRating.toFixed(1)}
                </div>
                <StarRating rating={avgRating} size={15} />
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>

              {/* Star breakdown bars */}
              <div className="flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                  const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs w-4 text-right" style={{ color: "var(--text-muted)" }}>
                        {star}
                      </span>
                      <div
                        className="w-28 h-2 rounded-full overflow-hidden"
                        style={{ background: "var(--border)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: "var(--accent)" }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {Math.round(pct)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="self-start sm:self-auto px-5 py-2.5 rounded-lg text-sm font-bold border transition-all hover:opacity-80"
              style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
            >
              Write a Review
            </button>
          </div>

          {/* Review list */}
          {reviews.length > 0 ? (
            <div className="space-y-5">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="flex gap-3 pb-5 border-b last:border-b-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden border shrink-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {r.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.avatar} alt={r.author} className="w-full h-full object-cover" />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-sm font-black"
                        style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
                      >
                        {r.author.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
                        {r.author}
                      </span>
                      {r.verified && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
                        >
                          Verified
                        </span>
                      )}
                      <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
                        {formatDate(r.date)}
                      </span>
                    </div>
                    <StarRating rating={r.rating} size={13} />
                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {r.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>

      </div>
    </div>
  );
}