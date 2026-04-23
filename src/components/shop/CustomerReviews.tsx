"use client";
import Carousel from "@/components/ui/Carousel";
import { reviews } from "@/lib/reviews.data";
import type { Review } from "@/lib/reviews.data";

function AvatarPlaceholder() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="var(--primary-soft)" />
      <circle cx="24" cy="19" r="8" fill="var(--text-muted)" fillOpacity="0.45" />
      <path d="M6 46c0-9.941 8.059-18 18-18s18 8.059 18 18" fill="var(--text-muted)" fillOpacity="0.45" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="flex flex-col h-full rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
      style={{
        background: "var(--surface)",
        border:     "1px solid var(--border)",
        boxShadow:  "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <span
        className="text-4xl font-black leading-none mb-3 select-none"
        aria-hidden="true"
        style={{ color: "var(--accent)", fontFamily: "Georgia, serif", lineHeight: 1 }}
      >
        &ldquo;
      </span>

      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
        {review.text}
      </p>

      <div className="mt-5 mb-4" style={{ borderTop: "1px solid var(--border)" }} />

      <div className="flex items-center gap-3">
        <div
          className="shrink-0 w-12 h-12 rounded-full overflow-hidden"
          style={{ border: "2px solid var(--border)" }}
        >
          {review.avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={review.avatarSrc} alt={review.name} className="w-full h-full object-cover" />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{review.name}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{review.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function CustomerReviews() {
  return (
    <section aria-label="Customer reviews" className="page-container py-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "var(--accent)" }} />
        <div>
          <h2
            className="text-lg font-black"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
          >
            What Our Customers Say
          </h2>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Real reviews from real buyers
          </p>
        </div>
      </div>

      <Carousel
        slidesPerView={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        gap={16}
        autoplay
        autoplayDelay={5000}
        ariaLabel="Customer reviews"
      >
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Carousel>
    </section>
  );
}
