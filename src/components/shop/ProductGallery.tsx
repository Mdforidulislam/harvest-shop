"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  name: string;
  discount?: number | null;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}

export default function ProductGallery({ images, name, discount, isWishlisted, onWishlistToggle }: Props) {
  const [active, setActive] = useState(0);

  // Ensure at least 2 images so thumbnails are always visible
  const galleryImages = images.length === 1 ? [images[0], images[0]] : images;

  const prev = () => setActive((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setActive((i) => (i + 1) % galleryImages.length);

  return (
    <div className="flex gap-3">
      {/* Vertical thumbnails — always visible on left */}
      <div className="flex flex-col gap-2 w-[72px] shrink-0">
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={i === active}
            className={`relative w-[72px] h-[72px] rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
              i === active
                ? "border-[var(--accent)] shadow-sm"
                : "border-[var(--border)] opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img} alt="" fill className="object-contain p-1.5" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 min-w-0">
        <div
          className="relative rounded-xl overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] group cursor-zoom-in"
          style={{ aspectRatio: "1/1" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-8"
            >
              <Image
                src={galleryImages[active]}
                alt={`${name} — image ${active + 1}`}
                fill
                priority
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          </AnimatePresence>

          {/* Discount badge */}
          {discount && (
            <div
              className="absolute top-3 left-3 z-10 text-white text-xs font-bold px-2.5 py-1 rounded"
              style={{ background: "var(--danger)" }}
            >
              -{discount}%
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={onWishlistToggle}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
              isWishlisted
                ? "bg-red-500 border-red-500 text-white"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-red-500"
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

          {/* Prev/next arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
              >
                <ChevronRight size={15} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    background: i === active ? "var(--accent)" : "rgba(255,255,255,0.6)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}