"use client";
import { use } from "react";
import Link from "next/link";
import { ChevronRight, Share2 } from "lucide-react";
import { products, reviews as allReviews, categories, bestSellers, newArrivals } from "@/lib/fake-data";
import { calcDiscount } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductBuyPanel from "@/components/shop/ProductBuyPanel";
import ProductInfoCard from "@/components/shop/ProductInfoCard";
import ProductTabs from "@/components/shop/ProductTabs";
import ProductShelf from "@/components/shop/ProductShelf";
import CategoryCard from "@/components/shop/CategoryCard";
import Carousel from "@/components/ui/Carousel";

type Props = { params: Promise<{ slug: string }> };

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));

  const discount = product.salePrice ? calcDiscount(product.price, product.salePrice) : null;
  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 10);

  function handleWishlist() {
    dispatch(
      toggleWishlist({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.salePrice ?? product.price,
        salePrice: product.salePrice,
      })
    );
  }

  return (
    <main className="bg-[var(--bg)] min-h-screen">
      <div className="page-container py-6">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-[var(--primary)] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="line-clamp-1 font-medium" style={{ color: "var(--text)" }}>
            {product.name}
          </span>
        </nav>

        {/* ── Three-column top section ───────────────────── */}
        <div
          className="rounded-xl border p-5 md:p-7 mb-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/*
            Mobile/tablet: stacked (1 col)
            Laptop (lg):   gallery + buy panel side by side; info card full-width below
            Desktop (xl):  all three columns in one row [5fr 4fr 3fr]
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[5fr_4fr_3fr] gap-6 xl:gap-8">

            {/* Left — Image gallery */}
            <ProductGallery
              images={product.images}
              name={product.name}
              discount={discount}
              isWishlisted={isWishlisted}
              onWishlistToggle={handleWishlist}
            />

            {/* Middle — Product info & buy actions */}
            <div className="flex flex-col gap-0">
              <ProductBuyPanel product={product} />

              {/* Share button — sits below the buy panel */}
              <div className="mt-4 pt-4 border-t flex justify-end" style={{ borderColor: "var(--border)" }}>
                <button
                  className="btn btn-md border text-sm font-semibold"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  <Share2 size={15} />
                  Share
                </button>
              </div>
            </div>

            {/* Right — Info/features card (full-width at lg, 3rd col at xl) */}
            <div className="lg:col-span-2 xl:col-span-1">
              <ProductInfoCard bullets={product.infoBullets} />
            </div>

          </div>
        </div>

        {/* ── Full-width tabs section ─────────────────────── */}
        <div className="mb-8">
          <ProductTabs
            description={product.description}
            specs={product.specs}
            reviews={productReviews}
            videoUrl={product.videoUrl}
          />
        </div>


        {/* ── Related products ───────────────────────────── */}
        {related.length > 0 && (
          <ProductShelf
            title="Related Products"
            subtitle="You might also like"
            products={related}
          />
        )}

      </div>
    </main>
  );
}
