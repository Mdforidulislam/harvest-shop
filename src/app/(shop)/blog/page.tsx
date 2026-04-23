"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Sparkles, Newspaper, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/fake-data";
import { formatDate } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function BlogListingPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="page-container py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-4 text-[var(--primary)] font-black text-xs uppercase tracking-widest">
            <Newspaper size={18} />
            <span>Harvest Reader</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>The Organic <br /><span className="text-[var(--primary)]">Wisdom.</span></h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-bold opacity-60 max-w-sm md:text-right"
        >
          Discover recipes, farming roots, and tips for a chemical-free lifestyle harvested just for you.
        </motion.p>
      </div>

      {/* Featured Post */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link href={`/blog/${featured.slug}`} className="group relative block rounded-[3rem] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] shadow-2xl shadow-black/5 mb-16 h-[500px] md:h-[600px]">
          <Image
            src={featured.cover}
            alt={featured.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-widest shadow-xl">Featured Story</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/20">{featured.category}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 group-hover:text-[var(--accent)] transition-colors line-clamp-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                {featured.title}
              </h2>
              <p className="text-white/80 text-lg mb-8 line-clamp-2 font-medium">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Image src={featured.authorAvatar} alt={featured.author} width={40} height={40} className="rounded-full ring-2 ring-white/20" />
                  <span className="text-sm font-bold text-white">{featured.author}</span>
                </div>
                <div className="flex items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {featured.readTime} Min Read</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {rest.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white border border-[var(--border)] rounded-[2.5rem] overflow-hidden transition-all hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width:768px) 100vw,33vw"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">{post.category}</span>
                </div>
                <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white hover:bg-[var(--primary)]">
                  <Bookmark size={18} />
                </button>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(post.date)}</span>
                  <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime} MIN</span>
                </div>
                <h3 className="text-xl font-black mb-4 group-hover:text-[var(--primary)] transition-colors line-clamp-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  {post.title}
                </h3>
                <p className="text-sm font-medium opacity-60 line-clamp-3 mb-8 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <Image src={post.authorAvatar} alt={post.author} width={32} height={32} className="rounded-full flex-shrink-0" />
                    <span className="text-xs font-bold text-[var(--text)]">{post.author}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-2)] flex items-center justify-center transition-all group-hover:bg-[var(--primary)] group-hover:text-white">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Newsletter Integration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-32 p-12 md:p-24 rounded-[4rem] bg-[var(--primary)] relative overflow-hidden text-center"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Stay for the Harvest</h2>
          <p className="text-white/80 text-lg font-medium mb-10 leading-relaxed">
            Get notified when we publish a new recipe or farm story. We only send the good stuff—no pesticide, no spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your seed of an email..."
              className="flex-1 h-16 rounded-2xl px-8 font-bold text-[var(--text)] outline-none focus:ring-4 focus:ring-white/20 transition-all"
            />
            <button className="h-16 px-10 rounded-2xl bg-white text-[var(--primary)] font-black hover:bg-[var(--accent)] hover:text-white transition-all shadow-xl active:scale-95">
              Subscribe Now
            </button>
          </div>
          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">JOIN 10,000+ ORGANIC ENTHUSIASTS</p>
        </div>
      </motion.div>
    </div>
  );
}
