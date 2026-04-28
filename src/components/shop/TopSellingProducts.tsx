"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, TrendingUp, Tag } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/cart/cartSlice";

export type TopProduct = {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  savings?: number;
  badge?: "best_selling" | "offered";
  stock: number;
};

function ProductCardHorizontal({ product }: { product: TopProduct }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      slug: product.slug,
      name: product.title,
      image: product.image,
      price: product.price,
      qty: 1,
      stock: product.stock,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="relative flex flex-col sm:flex-row rounded-lg py-4 sm:py-6 bg-[var(--surface)] overflow-hidden transition-shadow duration-300">

      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
          style={{ background: "var(--danger)" }}
        >
          {product.badge === "best_selling" ? <TrendingUp size={10} /> : <Tag size={10} />}
          {product.badge === "best_selling" ? "Best Selling" : "Offered Items"}
        </div>
      )}

      {/* Image — full width on mobile, 40% on sm+ */}
      <div className="w-full sm:w-[40%] shrink-0 flex items-center justify-center p-3 sm:p-4 bg-[var(--surface)]">
        <div className="relative w-full aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-center px-3 py-2 sm:py-4 gap-2 min-w-0">

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)] line-clamp-2 leading-snug transition-colors"
        >
          {product.title}
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-[var(--accent)]">৳{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-[var(--text-muted)] line-through">৳{product.oldPrice}</span>
          )}
        </div>

        {/* Save pill */}
        {product.savings && (
          <span
            className="inline-flex items-center self-start px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
            style={{ background: "var(--success)" }}
          >
            Save ৳{product.savings}
          </span>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleAddToCart}
            className={`btn-md flex-1 border ${
              added
                ? "bg-[var(--success)] border-[var(--success)] text-white"
                : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            }`}
          >
             <div className="md:flex items-center justify-center ">
                  <ShoppingCart size={16} />
             </div>
            <div className="lg:flex hidden">
              {added ? "Added!" : "Add To Cart"}
            </div>
          </button>
          <Link
            href={`/product/${product.slug}`}
            /* clamp(MIN, VARIABLE, MAX) */
            className="btn-md btn-primary flex-1 flex items-center justify-center gap-2 text-[clamp(.7rem,1vw+0.4rem,.7rem)] lg:py-2 px-0"
          >
            <div className="hidden md:flex">
              <ShoppingCart size={18} /> 
            </div>
            <span>Buy Now</span>
          </Link> 
        </div>

      </div>
    </div>
  );
}

export default function TopSellingProducts({ products }: { products: TopProduct[] }) {
  return (
    <section>
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-xl font-black text-[var(--text)]">Top Selling Products</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {products.map((p) => (
          <ProductCardHorizontal key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
