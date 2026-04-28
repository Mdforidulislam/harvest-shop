"use client";
import { useState } from "react";
import { ShoppingCart, Minus, Plus, Phone, Zap } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";
import StarRating from "@/components/ui/StarRating";
import { formatPrice, calcDiscount } from "@/lib/utils";
import type { Product } from "@/lib/fake-data";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface Props {
  product: Product;
}

export default function ProductBuyPanel({ product }: Props) {
  const dispatch = useAppDispatch();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const price = selectedVariant?.price ?? product.salePrice ?? product.price;
  const stock = selectedVariant?.stock ?? product.stock;
  const discount = product.salePrice ? calcDiscount(product.price, product.salePrice) : null;

  const waNumber = (product.whatsappNumber ?? "+8801700000000").replace(/[^0-9]/g, "");
  const waText = encodeURIComponent(`Hi, I'm interested in: ${product.name}`);
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;
  const callHref = `tel:${product.callNumber ?? "+8801700000000"}`;

  function handleAddToCart() {
    dispatch(addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price,
      qty,
      variant: selectedVariant?.label,
      stock,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleBuyNow() {
    handleAddToCart();
    window.location.href = "/checkout";
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Title */}
      <h1
        className="text-2xl md:text-3xl font-black leading-tight"
        style={{ color: "var(--text)", fontFamily: "Plus Jakarta Sans, sans-serif" }}
      >
        {product.name}
      </h1>

      {/* Rating row */}
      <div className="flex items-center gap-2 flex-wrap">
        <StarRating rating={product.rating} count={product.reviewCount} size={15} />
        <span style={{ color: "var(--border)" }}>|</span>
        <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
          SKU: PRD-{product.id.toString().padStart(4, "0")}
        </span>
      </div>

      {/* Price row */}
      <div
        className="flex items-center gap-3 flex-wrap pb-5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-3xl font-black" style={{ color: "var(--accent)" }}>
          {formatPrice(price)}
        </span>
        {product.salePrice && (
          <>
            <span className="text-lg line-through font-medium" style={{ color: "var(--text-muted)" }}>
              {formatPrice(product.price)}
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded text-white"
              style={{ background: "var(--success)" }}
            >
              Save {discount}%
            </span>
          </>
        )}
      </div>

         {/* Stock + category badges */}
         <div className="flex items-center gap-2 flex-wrap">
        {stock > 0 ? (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ color: "var(--success)", background: "color-mix(in srgb, var(--success) 14%, transparent)" }}
          >
            ✓ In Stock ({stock} available)
          </span>
        ) : (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ color: "var(--danger)", background: "color-mix(in srgb, var(--danger) 14%, transparent)" }}
          >
            Out of Stock
          </span>
        )}
        <span
          className="text-xs px-2.5 py-1 rounded-full"
          style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        >
          {product.category}
        </span>
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <p className="text-sm font-bold mb-2" style={{ color: "var(--text-muted)" }}>
            Size / Weight:{" "}
            <span className="font-black" style={{ color: "var(--text)" }}>
              {selectedVariant?.label}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.label}
                onClick={() => setSelectedVariant(v)}
                aria-pressed={selectedVariant?.label === v.label}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all min-h-[44px] ${
                  selectedVariant?.label === v.label
                    ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--primary-soft)]"
                    : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)]"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity stepper */}
      <div className="flex items-center gap-4 flex-wrap">
        <label className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>
          Quantity:
        </label>
        <div
          className="flex items-center rounded-lg overflow-hidden border"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="w-11 h-11 flex items-center justify-center transition-colors disabled:opacity-40 hover:bg-[var(--surface-2)]"
            style={{ color: "var(--text-muted)" }}
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={qty}
            min={1}
            max={stock}
            onChange={(e) => setQty(Math.min(stock, Math.max(1, Number(e.target.value))))}
            aria-label="Quantity"
            className="w-12 h-11 text-center font-black text-sm bg-transparent focus:outline-none"
            style={{ color: "var(--text)" }}
          />
          <button
            onClick={() => setQty((q) => Math.min(stock, q + 1))}
            disabled={qty >= stock}
            aria-label="Increase quantity"
            className="w-11 h-11 flex items-center justify-center transition-colors disabled:opacity-40 hover:bg-[var(--surface-2)]"
            style={{ color: "var(--text-muted)" }}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Primary actions: Add to Cart + Buy Now */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="btn btn-md h-12 w-full font-bold text-sm disabled:opacity-50 transition-all"
          style={
            added
              ? { background: "var(--success)", color: "white" }
              : { background: "var(--accent)", color: "white" }
          }
        >
          <ShoppingCart size={16} />
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={stock === 0}
          className="btn btn-md h-12 w-full font-bold text-sm text-white disabled:opacity-50"
          style={{ background: "var(--primary)" }}
        >
          <Zap size={16} />
          Buy Now
        </button>
      </div>

      {/* Secondary actions: WhatsApp + Call */}
      <div className="grid grid-cols-2 gap-3">
        
        <a href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-md h-12 w-full font-bold text-sm text-white"
          style={{ background: "#25D366" }}
        >
          <WhatsAppIcon size={16} />
          Order on WhatsApp
        </a>
        
        <a  href={callHref}
          className="btn btn-md h-12 w-full font-bold text-sm text-white"
          style={{ background: "var(--info)" }}
        >
          <Phone size={16} />
          Call for Order
        </a>
      </div>

      {/* Brand */}
      {product.brand && (
        <div
          className="flex items-center gap-3 pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>Brand:</span>
          <div
            className="px-3 py-1.5 rounded-lg border text-sm font-bold"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--surface-2)",
            }}
          >
            {product.brand.name}
          </div>
        </div>
      )}
    </div>
  );
}
