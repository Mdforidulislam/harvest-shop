"use client";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { selectCompare, removeFromCompare, clearCompare } from "@/features/compare/compareSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { products } from "@/lib/fake-data";
import { formatPrice } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

const compareFields = [
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" },
  { key: "reviewCount", label: "Reviews" },
  { key: "stock", label: "Stock" },
  { key: "category", label: "Category" },
];

export default function ComparePage() {
  const dispatch = useAppDispatch();
  const compareItems = useAppSelector(selectCompare);
  const compareProducts = compareItems.map((i) => products.find((p) => p.id === i.id)).filter(Boolean);

  return (
    <div className="page-container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Compare Products</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{compareProducts.length}/4 products selected</p>
        </div>
        {compareProducts.length > 0 && (
          <button onClick={() => dispatch(clearCompare())} className="btn-md btn-ghost text-sm" style={{ color: "var(--danger)" }}>Clear All</button>
        )}
      </div>

      {compareProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">⚖️</p>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>Nothing to compare yet</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Add products from the listing or product pages</p>
          <Link href="/category/all" className="btn-md btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            {/* Product cards row */}
            <thead>
              <tr>
                <th className="w-32 text-left py-3 pr-4 text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Product</th>
                {compareProducts.map((p) => (
                  <th key={p!.id} className="px-3 py-3 text-center align-top">
                    <div className="relative">
                      <button onClick={() => dispatch(removeFromCompare(p!.id))} className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--danger)", color: "white" }}>
                        <X size={12} />
                      </button>
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mx-auto mb-2" style={{ maxWidth: "140px", background: "var(--surface-2)" }}>
                        <Image src={p!.images[0]} alt={p!.name} fill className="object-cover" sizes="140px" />
                      </div>
                      <Link href={`/product/${p!.slug}`} className="text-sm font-semibold text-center hover:text-[var(--primary)] transition-colors line-clamp-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
                        {p!.name}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderTop: "1px solid var(--border)" }}>
                <td className="py-4 pr-4 text-sm font-semibold" style={{ color: "var(--text)" }}>Price</td>
                {compareProducts.map((p) => (
                  <td key={p!.id} className="px-3 py-4 text-center">
                    <span className="text-lg font-bold price-num" style={{ color: "var(--primary)" }}>{formatPrice(p!.salePrice ?? p!.price)}</span>
                    {p!.salePrice && <span className="text-xs line-through ml-1" style={{ color: "var(--text-muted)" }}>{formatPrice(p!.price)}</span>}
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: "1px solid var(--border)" }}>
                <td className="py-4 pr-4 text-sm font-semibold" style={{ color: "var(--text)" }}>Rating</td>
                {compareProducts.map((p) => (
                  <td key={p!.id} className="px-3 py-4 text-center">
                    <div className="flex justify-center"><StarRating rating={p!.rating} count={p!.reviewCount} size={14} /></div>
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: "1px solid var(--border)" }}>
                <td className="py-4 pr-4 text-sm font-semibold" style={{ color: "var(--text)" }}>Stock</td>
                {compareProducts.map((p) => (
                  <td key={p!.id} className="px-3 py-4 text-center">
                    <span className={`badge ${p!.stock > 10 ? "badge-success" : p!.stock > 0 ? "badge-warning" : "badge-danger"}`}>
                      {p!.stock > 0 ? `${p!.stock} units` : "Out of Stock"}
                    </span>
                  </td>
                ))}
              </tr>
              <tr style={{ borderTop: "1px solid var(--border)" }}>
                <td className="py-4 pr-4 text-sm font-semibold" style={{ color: "var(--text)" }}>Category</td>
                {compareProducts.map((p) => (
                  <td key={p!.id} className="px-3 py-4 text-center text-sm" style={{ color: "var(--text-muted)" }}>{p!.category}</td>
                ))}
              </tr>
              {/* Specs */}
              {Object.keys(compareProducts[0]?.specs ?? {}).slice(0, 5).map((spec) => (
                <tr key={spec} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="py-4 pr-4 text-sm font-semibold" style={{ color: "var(--text)" }}>{spec}</td>
                  {compareProducts.map((p) => (
                    <td key={p!.id} className="px-3 py-4 text-center text-sm" style={{ color: "var(--text-muted)" }}>{p!.specs[spec] ?? "—"}</td>
                  ))}
                </tr>
              ))}
              {/* Add to Cart row */}
              <tr style={{ borderTop: "1px solid var(--border)" }}>
                <td className="py-4 pr-4" />
                {compareProducts.map((p) => (
                  <td key={p!.id} className="px-3 py-4 text-center">
                    <button
                      onClick={() => dispatch(addToCart({ id: p!.id, slug: p!.slug, name: p!.name, image: p!.images[0], price: p!.salePrice ?? p!.price, qty: 1, stock: p!.stock }))}
                      className="btn-md btn-primary w-full text-xs"
                      disabled={p!.stock === 0}
                    >
                      <ShoppingCart size={13} /> Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
