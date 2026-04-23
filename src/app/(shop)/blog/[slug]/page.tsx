"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, CheckCircle, ChevronRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/fake-data";
import { formatDate } from "@/lib/utils";
import { use } from "react";

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

type Props = { params: Promise<{ slug: string }> };

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0];
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <div className="bg-[var(--bg)]">
      {/* Article Header */}
      <header className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest hover:text-[var(--primary)] transition-colors">
              <ArrowLeft size={14} />
              Back to Wisdom Feed
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="px-4 py-1 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] text-[10px] font-black uppercase tracking-widest">{post.category}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{post.readTime} MIN READ</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tighter" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
              {post.title}
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <Image src={post.authorAvatar} alt={post.author} width={48} height={48} className="rounded-2xl border-2 border-white shadow-lg" />
                <div className="text-left">
                  <p className="text-sm font-black" style={{ color: "var(--text)" }}>{post.author}</p>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Health & Nutrition</p>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-[var(--border)] hidden md:block" />
              <time className="text-xs font-black uppercase tracking-widest opacity-40">{formatDate(post.date)}</time>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5"
        >
          <Image src={post.cover} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        </motion.div>
      </section>

      {/* Article Content Area */}
      <div className="page-container py-20 flex flex-col lg:flex-row gap-16">

        {/* Sidebar Left: Share Tools */}
        <aside className="hidden lg:block w-16 sticky top-32 h-fit">
          <div className="flex flex-col gap-4">
            <button className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
              <Share2 size={20} />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-sm">
              <FacebookIcon />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm">
              <MessageCircle size={20} />
            </button>
            <div className="h-20 w-[1px] bg-[var(--border)] mx-auto my-2" />
            <button className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all shadow-sm">
              <Bookmark size={20} />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-3xl mx-auto lg:mx-0">
          <div className="prose prose-xl prose-stone dark:prose-invert max-w-none 
                prose-p:font-medium prose-p:leading-relaxed prose-p:text-lg prose-p:text-[var(--text-muted)]
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-[var(--text)]
                prose-ul:list-inside prose-li:font-bold prose-li:text-[var(--text-muted)]">
            <p className="text-2xl font-black text-[var(--text)] leading-snug mb-10 italic border-l-8 border-[var(--primary-soft)] pl-8 py-2">
              &ldquo;{post.excerpt}&rdquo;
            </p>

            <p>
              In recent years, there has been a significant increase in scientific interest in traditional foods that our ancestors have been consuming for centuries. These foods, often dismissed as old-fashioned, are proving to have remarkable nutritional properties backed by modern research.
            </p>

            <h3>The Science Behind Traditional Harversts</h3>
            <p>
              Multiple peer-reviewed studies have now confirmed what traditional medicine practitioners have known for generations. The bioactive compounds found in these natural products interact with our body&apos;s systems in ways that promote health and longevity.
            </p>

            <div className="my-12 p-10 rounded-[2.5rem] bg-[var(--surface-2)] border border-[var(--border)]">
              <h4 className="text-[var(--primary)] font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                <CheckCircle size={16} /> Key Takeaways
              </h4>
              <ul className="space-y-4 m-0 p-0 text-sm md:text-base">
                <li className="list-none flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                  Cold pressing and minimal intervention preserve the maximum nutritional value.
                </li>
                <li className="list-none flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                  Pairing traditional harvests with balanced meals increases nutrient absorption.
                </li>
                <li className="list-none flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                  Authenticity testing (like NMR) is crucial for verifying high-value organic products.
                </li>
              </ul>
            </div>

            <p>
              When sourced from organic, pesticide-free farms, these products retain their full spectrum of nutrients. Processing methods matter enormously — cold pressing, slow cooking, and minimal intervention preserve the maximum nutritional value.
            </p>

            <p>{post.content}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-16 pt-10 border-t border-[var(--border)]">
            {post.tags.map((tag) => (
              <span key={tag} className="px-5 py-2 rounded-xl bg-[var(--surface-2)] text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio Card */}
          <div className="mt-20 p-10 rounded-[3rem] bg-white border border-[var(--border)] shadow-2xl shadow-black/5 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <Image src={post.authorAvatar} alt={post.author} width={100} height={100} className="rounded-[2.5rem] border-4 border-[var(--surface-2)] shadow-xl" />
            <div className="flex-1">
              <h3 className="text-2xl font-black mb-2" style={{ color: "var(--text)" }}>{post.author}</h3>
              <p className="text-sm font-bold text-[var(--primary)] uppercase tracking-widest mb-4">Leading Harvester & Nutritionist</p>
              <p className="text-sm font-medium leading-relaxed opacity-60">
                Specializing in the intersection of traditional Bangladeshi food culture and modern scientific nutrition. Ariful has dedicated 10 years to researchingSundarban ecology and its impact on harvest quality.
              </p>
              <div className="flex justify-center md:justify-start gap-4 mt-6">
                <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-all"><FacebookIcon /></Link>
                <Link href="#" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-all"><Share2 size={16} /></Link>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar Right: Related Content */}
        <aside className="lg:w-80">
          <div className="sticky top-32 space-y-12">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-[var(--text-muted)] border-b border-[var(--border)] pb-4">
                Continute Reading
              </h4>
              <div className="space-y-8">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group flex flex-col gap-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm">
                      <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h5 className="font-black text-sm leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                        {p.title}
                      </h5>
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-2">{p.readTime} MIN READ</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Promo Card */}
            <div className="p-8 rounded-[2.5rem] bg-[var(--primary)] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
              <h4 className="text-xl font-black mb-4 relative z-10">Pure Honey Sample Pack?</h4>
              <p className="text-sm font-medium opacity-80 mb-6 relative z-10">Get 10% off your first organic harvest purchase.</p>
              <Link href="/shop" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-[var(--primary)] font-black text-xs uppercase tracking-widest shadow-xl group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                Claim Now <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
