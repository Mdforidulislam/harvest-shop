import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

const FacebookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
import { blogPosts } from "@/lib/fake-data";
import { formatDate } from "@/lib/utils";
import { use } from "react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Blog Post", description: post?.excerpt };
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0];
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/blog" className="flex items-center gap-2 text-sm mb-6 hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text-muted)" }}>
        <ArrowLeft size={14} /> Back to Blog
      </Link>

      {/* Cover */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
        <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="(max-width:896px) 100vw,896px" priority />
      </div>

      <span className="badge badge-primary mb-3">{post.category}</span>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{post.title}</h1>

      <div className="flex flex-wrap items-center gap-4 mb-8 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <Image src={post.authorAvatar} alt={post.author} width={36} height={36} className="rounded-full" />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{post.author}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Health & Nutrition Writer</p>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <span className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
            <Calendar size={13} />{formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
            <Clock size={13} />{post.readTime} min read
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none" style={{ color: "var(--text)" }}>
        <p className="text-base leading-relaxed mb-4">{post.excerpt}</p>
        <p className="text-base leading-relaxed mb-4">
          In recent years, there has been a significant increase in scientific interest in traditional foods that our ancestors have been consuming for centuries. These foods, often dismissed as old-fashioned, are proving to have remarkable nutritional properties backed by modern research.
        </p>
        <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>The Science Behind It</h2>
        <p className="text-base leading-relaxed mb-4">
          Multiple peer-reviewed studies have now confirmed what traditional medicine practitioners have known for generations. The bioactive compounds found in these natural products interact with our body's systems in ways that promote health and longevity.
        </p>
        <p className="text-base leading-relaxed mb-4">
          When sourced from organic, pesticide-free farms, these products retain their full spectrum of nutrients. Processing methods matter enormously — cold pressing, slow cooking, and minimal intervention preserve the maximum nutritional value.
        </p>
        <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>How to Incorporate Into Your Diet</h2>
        <ul className="space-y-2 mb-4" style={{ color: "var(--text)" }}>
          <li>Start with small quantities and gradually increase</li>
          <li>Pair with complementary foods for maximum absorption</li>
          <li>Store properly to maintain potency</li>
          <li>Choose certified organic sources whenever possible</li>
        </ul>
        <p className="text-base leading-relaxed">{post.content}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-8 mb-8">
        {post.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Share */}
      <div className="flex items-center gap-3 py-4 mb-8" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <span className="text-sm font-medium" style={{ color: "var(--text)" }}>Share:</span>
        <button className="btn-sm btn-secondary gap-1"><FacebookIcon /> Facebook</button>
        <button className="btn-sm btn-secondary gap-1"><Share2 size={13} /> WhatsApp</button>
        <button className="btn-sm btn-ghost gap-1 text-xs">Copy link</button>
      </div>

      {/* Author bio */}
      <div className="card p-5 flex gap-4 mb-10">
        <Image src={post.authorAvatar} alt={post.author} width={56} height={56} className="rounded-full flex-shrink-0" />
        <div>
          <h3 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{post.author}</h3>
          <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Health & Nutrition Writer at Harvest</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Specializing in the intersection of traditional Bangladeshi food culture and modern nutritional science.
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="section-title mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="card overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={p.cover} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-400" sizes="33vw" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[var(--primary)] transition-colors" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{p.title}</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{p.readTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
