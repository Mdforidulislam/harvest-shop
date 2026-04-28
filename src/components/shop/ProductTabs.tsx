"use client";
import { useState, useRef, useEffect } from "react";
import StarRating from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";

type Tab = "Description" | "Reviews" | "Video";

// Local Review type — guaranteed match with demo data
interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  avatar?: string;
  comment: string;
}

interface Props {
  description?: string;
  specs?: Record<string, string>;
  reviews?: Review[];
  videoUrl?: string;
}

// ============ DEMO DATA ============
const DEMO_DESCRIPTION = `Shosti Pure Cow Ghee — a timeless taste of Bangladeshi heritage, lovingly crafted in the heart of Pabna, a region celebrated for centuries for producing some of the finest dairy in the country. Every jar is the result of generations of artisanal expertise, where fresh, full-cream cow's milk is slow-simmered using traditional clay-pot methods that preserve the natural aroma, golden color, and deep nutty flavor of authentic ghee.

Unlike mass-produced alternatives, Shosti Ghee contains no preservatives, no additives, and no shortcuts — just pure, wholesome goodness in its most natural form. Whether you're preparing a festive polao, a fragrant biryani, or simply drizzling a spoonful over hot steamed rice, Shosti transforms everyday meals into memorable experiences. Rich in essential vitamins, healthy fats, and beneficial compounds, it's not just a cooking ingredient — it's a tradition you can taste, trust, and share with your family.`;

const DEMO_SPECS: Record<string, string> = {
  "100% Pure & Natural": "Premium cow ghee with absolutely no additives, preservatives, or artificial flavoring.",
  "Traditional Craftsmanship": "Slow-simmered from fresh full-cream milk using time-honored clay-pot techniques.",
  "Rich in Nutrients": "Naturally packed with vitamins A, D, E & K to support overall wellness.",
  "Health Benefits": "Contains CLA and Butyric Acid that aid digestion, boost immunity, and support heart health.",
  "Versatile in the Kitchen": "Perfect for polao, biryani, bharta, sweets, or simply drizzled over hot rice.",
  "Premium Packaging": "Sealed in airtight glass jars to lock in freshness and extend shelf life.",
};

const DEMO_USAGE: Record<string, string> = {
  "Cooking": "Use as a primary cooking medium, finishing oil, or natural flavor enhancer.",
  "Storage": "Keep in a cool, dry place inside an airtight container away from direct sunlight.",
  "Refrigeration": "Refrigeration is not required when the jar is properly sealed.",
  "Hygiene": "Always use a clean, dry spoon to maintain purity and prevent contamination.",
};

const DEMO_VIDEO = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const DEMO_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Ariful Islam",
    rating: 5,
    date: "2025-03-15",
    verified: true,
    comment:
      "Authentic taste, just like my grandmother used to make. The aroma fills the entire kitchen when I cook with it. The glass jar packaging feels premium and keeps the ghee fresh for months. Highly recommended for anyone who values traditional quality.",
  },
  {
    id: "r2",
    author: "Fatima Rahman",
    rating: 5,
    date: "2025-03-08",
    verified: true,
    comment:
      "I've tried many ghee brands, but Shosti is by far the best. You can really taste the difference — pure, rich, and natural. My biryani has never tasted better. Will definitely order again.",
  },
  {
    id: "r3",
    author: "Sakib Ahmed",
    rating: 4,
    date: "2025-02-28",
    verified: false,
    comment:
      "Good quality ghee, packaging arrived intact. Slightly pricier than local options but the taste justifies the cost. Delivery was fast too.",
  },
  {
    id: "r4",
    author: "Nusrat Jahan",
    rating: 5,
    date: "2025-02-20",
    verified: true,
    comment:
      "Absolutely love this ghee! The color is a beautiful golden yellow and the smell is heavenly. You can tell it's made with care. My whole family noticed the difference.",
  },
];

export default function ProductTabs({
  description = DEMO_DESCRIPTION,
  specs = DEMO_SPECS,
  reviews = DEMO_REVIEWS,
  videoUrl = DEMO_VIDEO,
}: Props) {
  const tabs: Tab[] = [
    "Description",
    ...(videoUrl ? (["Video"] as Tab[]) : []),
    "Reviews",
  ];

  const [active, setActive] = useState<Tab>("Description");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabBarRef = useRef<HTMLDivElement>(null);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState("");

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const recommendedCount = reviews.filter((r) => r.rating >= 4).length;
  const recommendedPct = reviews.length ? (recommendedCount / reviews.length) * 100 : 0;

  function scrollToSection(tab: Tab) {
    setActive(tab);
    const el = sectionRefs.current[tab];
    const tabBar = tabBarRef.current;
    if (!el || !tabBar) return;
    const tabBarBottom = tabBar.getBoundingClientRect().bottom + window.scrollY;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elTop - tabBarBottom - 16, behavior: "smooth" });
  }

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

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewText.trim() || !reviewRating) return;
    console.log({ reviewText, reviewRating });
    setReviewText("");
    setReviewRating("");
  }

  return (
    <div className="space-y-4">
      {/* ============ STICKY TAB BAR ============ */}
      <div
        ref={tabBarRef}
        className="sticky top-0 z-20 rounded-lg border p-2"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = active === tab;
            const label =
              tab === "Reviews"
                ? `Customer Reviews (${reviews.length})`
                : tab === "Video"
                ? "Product Video"
                : tab;
            return (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className="px-5 py-2.5 text-sm font-semibold whitespace-nowrap rounded-md transition-colors"
                style={{
                  background: isActive ? "var(--accent)" : "var(--surface-2)",
                  color: isActive ? "#fff" : "var(--text-muted)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ DESCRIPTION SECTION ============ */}
      <div
        ref={(el) => {
          sectionRefs.current["Description"] = el;
        }}
        className="rounded-lg border p-6 sm:p-8"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h2 className="text-lg font-black mb-1" style={{ color: "var(--text)" }}>
          Product Details
        </h2>
        <div className="w-10 h-0.5 mb-5 rounded" style={{ background: "var(--accent)" }} />

        <div className="text-sm leading-relaxed mb-6 space-y-4" style={{ color: "var(--text-muted)" }}>
          {description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {Object.keys(specs).length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-black mb-3" style={{ color: "var(--text)" }}>
              Key Features:
            </h3>
            <ul className="space-y-2">
              {Object.entries(specs).map(([k, v]) => (
                <li
                  key={k}
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="font-semibold" style={{ color: "var(--text)" }}>
                    {k}:
                  </span>{" "}
                  {v}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-sm font-black mb-3" style={{ color: "var(--text)" }}>
            Usage & Storage:
          </h3>
          <ul className="space-y-2">
            {Object.entries(DEMO_USAGE).map(([k, v]) => (
              <li
                key={k}
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="font-semibold" style={{ color: "var(--text)" }}>
                  {k}:
                </span>{" "}
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ============ VIDEO SECTION ============ */}
      {videoUrl && (
        <div
          ref={(el) => {
            sectionRefs.current["Video"] = el;
          }}
          className="rounded-lg border p-6 sm:p-8"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2 className="text-lg font-black mb-1" style={{ color: "var(--text)" }}>
            Video
          </h2>
          <div className="w-10 h-0.5 mb-5 rounded" style={{ background: "var(--accent)" }} />

          <div
            className="relative w-full rounded-lg overflow-hidden"
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

      {/* ============ REVIEWS SECTION ============ */}
      <div
        ref={(el) => {
          sectionRefs.current["Reviews"] = el;
        }}
        className="rounded-lg border p-6 sm:p-8"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* ---- LEFT: Rating Summary ---- */}
          <div>
            <div className="flex items-start gap-4 mb-3">
              <div
                className="text-5xl font-black leading-none"
                style={{ color: "var(--text)" }}
              >
                {avgRating.toFixed(1)}
              </div>
              <div>
                <div className="text-base font-semibold" style={{ color: "var(--text)" }}>
                  Average Rating
                </div>
                <div className="mt-1">
                  <StarRating rating={avgRating} size={14} />
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  ({reviews.length} {reviews.length === 1 ? "Review" : "Reviews"})
                </p>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <div className="text-2xl font-black" style={{ color: "var(--text)" }}>
                {recommendedPct.toFixed(2)}%
              </div>
              <div className="text-sm" style={{ color: "var(--text)" }}>
                Recommended{" "}
                <span style={{ color: "var(--text-muted)" }}>
                  ({recommendedCount} of {reviews.length})
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill={i <= star ? "var(--accent)" : "var(--border)"}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ background: "var(--border)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: "var(--accent)" }}
                      />
                    </div>
                    <span
                      className="text-xs w-9 text-right"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {Math.round(pct)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---- RIGHT: Submit Form ---- */}
          <div>
            <h2 className="text-lg font-black mb-1" style={{ color: "var(--text)" }}>
              Submit Your Review
            </h2>
            <div className="w-10 h-0.5 mb-4 rounded" style={{ background: "var(--accent)" }} />

            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Your email address will not be published. Required fields are marked *
            </p>

            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label
                  htmlFor="rv-text"
                  className="block text-sm mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Write your opinion about the product
                </label>
                <textarea
                  id="rv-text"
                  rows={5}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write Your Review Here..."
                  className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors resize-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 placeholder:text-[var(--text-muted)]"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="flex-1">
                  <label
                    htmlFor="rv-rating"
                    className="block text-sm mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    Your Rating:
                  </label>
                  <select
                    id="rv-rating"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="w-full h-11 px-3 text-sm rounded-md border outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    <option value="">Select One</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Very Poor</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="h-11 px-6 text-sm font-bold rounded-md tracking-wide transition-opacity hover:opacity-90"
                  style={{ background: "var(--text)", color: "#fff" }}
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ---- All Reviews List ---- */}
        {reviews.length > 0 && (
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-base font-black mb-4" style={{ color: "var(--text)" }}>
              All Reviews ({reviews.length})
            </h3>
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
                      <img
                        src={r.avatar}
                        alt={r.author}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-sm font-black"
                        style={{
                          background: "var(--primary-soft)",
                          color: "var(--primary)",
                        }}
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
                          style={{
                            background: "var(--primary-soft)",
                            color: "var(--primary)",
                          }}
                        >
                          Verified
                        </span>
                      )}
                      <span
                        className="text-xs ml-auto"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {formatDate(r.date)}
                      </span>
                    </div>
                    <StarRating rating={r.rating} size={13} />
                    <p
                      className="text-sm mt-1.5 leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {r.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}