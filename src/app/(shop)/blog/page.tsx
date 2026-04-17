import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/fake-data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog — Organic Living Tips & Recipes" };

export default function BlogListingPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="section-title mb-2">Our Blog</h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>Tips, recipes, and stories about organic living.</p>

      {/* Featured */}
      <Link href={`/blog/${featured.slug}`} className="card flex flex-col lg:flex-row overflow-hidden group mb-10 hover:-translate-y-0.5 transition-transform duration-200">
        <div className="relative lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
          <Image src={featured.cover} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-400" sizes="(max-width:1024px) 100vw,50vw" />
          <div className="absolute top-4 left-4">
            <span className="badge badge-accent">Featured</span>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-center lg:w-1/2">
          <span className="badge badge-primary mb-3">{featured.category}</span>
          <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{featured.title}</h2>
          <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--text-muted)" }}>{featured.excerpt}</p>
          <div className="flex items-center gap-4">
            <Image src={featured.authorAvatar} alt={featured.author} width={32} height={32} className="rounded-full" />
            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{featured.author}</span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              <Calendar size={12} className="inline mr-1" />{formatDate(featured.date)}
            </span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              <Clock size={12} className="inline mr-1" />{featured.readTime} min
            </span>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="card overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200">
            <div className="relative aspect-video overflow-hidden">
              <Image src={post.cover} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-400" sizes="(max-width:768px) 100vw,33vw" />
            </div>
            <div className="p-4">
              <span className="badge badge-primary text-xs mb-2">{post.category}</span>
              <h3 className="font-bold text-sm mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{post.title}</h3>
              <p className="text-xs line-clamp-2 mb-3" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={post.authorAvatar} alt={post.author} width={20} height={20} className="rounded-full" />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.author}</span>
                </div>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
