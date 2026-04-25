"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Star, CheckCircle, Flag, Trash2, Filter, MoreHorizontal, ThumbsUp, MessageSquare, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

type ReviewStatus = "approved" | "pending" | "flagged";

type Review = {
  id: string;
  reviewer: string;
  avatar: string;
  product: string;
  productImg: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  helpful: number;
};

const PRODUCT_IMGS = [
  "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1518390889987-5e38c5a38bfe?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=80&h=80&fit=crop",
];

const initialReviews: Review[] = [
  { id: "r1", reviewer: "Rabeya Khatun",  avatar: "R", product: "Sundarban Pure Honey 500g",    productImg: PRODUCT_IMGS[0], rating: 5, comment: "Absolutely love this honey! The taste is pure and authentic. My whole family enjoyed it. Will definitely order again.",                                      date: "2026-04-18", status: "approved", helpful: 24 },
  { id: "r2", reviewer: "Arif Hossain",   avatar: "A", product: "Cold-Pressed Mustard Oil 1L",  productImg: PRODUCT_IMGS[1], rating: 4, comment: "Great quality oil. Very fresh and fragrant. Packaging was a bit loose on arrival but the product itself is excellent.",                               date: "2026-04-15", status: "approved", helpful: 11 },
  { id: "r3", reviewer: "Sonia Begum",    avatar: "S", product: "Organic Desi Ghee 500ml",      productImg: PRODUCT_IMGS[2], rating: 5, comment: "The best ghee I've ever tasted! Exactly as described — pure and natural with a beautiful aroma.",                                                     date: "2026-04-12", status: "pending",  helpful:  8 },
  { id: "r4", reviewer: "Taher Ali",      avatar: "T", product: "Premium Mixed Dry Fruits 250g", productImg: PRODUCT_IMGS[3], rating: 2, comment: "The quantity seemed less than 250g. Not satisfied with the value for money. Expected better quality for this price.",                                date: "2026-04-10", status: "flagged",  helpful:  3 },
  { id: "r5", reviewer: "Farhana Ahmed",  avatar: "F", product: "Sundarban Pure Honey 500g",    productImg: PRODUCT_IMGS[0], rating: 5, comment: "Second order and still just as amazing! Quality is consistent. Highly recommended for anyone looking for natural honey.",                              date: "2026-04-08", status: "approved", helpful: 19 },
  { id: "r6", reviewer: "Karim Miah",     avatar: "K", product: "Cold-Pressed Mustard Oil 1L",  productImg: PRODUCT_IMGS[1], rating: 3, comment: "Good product but delivery took longer than expected. Would appreciate faster shipping.",                                                              date: "2026-04-05", status: "pending",  helpful:  5 },
  { id: "r7", reviewer: "Nadia Islam",    avatar: "N", product: "Organic Desi Ghee 500ml",      productImg: PRODUCT_IMGS[2], rating: 4, comment: "Pure and authentic taste. Delivery was on time. Good packaging. Will order more products soon.",                                                      date: "2026-04-02", status: "approved", helpful: 14 },
  { id: "r8", reviewer: "Rahim Khan",     avatar: "R", product: "Premium Mixed Dry Fruits 250g", productImg: PRODUCT_IMGS[3], rating: 1, comment: "Completely disappointed. Wrong product delivered and quality was terrible. Requesting a refund immediately.",                                        date: "2026-03-30", status: "flagged",  helpful:  0 },
  { id: "r9", reviewer: "Nasrin Akter",   avatar: "N", product: "Sundarban Pure Honey 500g",    productImg: PRODUCT_IMGS[0], rating: 5, comment: "Perfect honey. Very thick and rich in taste. Arrived well packed. Great customer service too.",                                                       date: "2026-03-27", status: "pending",  helpful:  7 },
  { id: "r10",reviewer: "Jalal Uddin",    avatar: "J", product: "Organic Desi Ghee 500ml",      productImg: PRODUCT_IMGS[2], rating: 4, comment: "Very good quality ghee. My family is very happy with this product. Will buy again for sure.",                                                         date: "2026-03-24", status: "approved", helpful: 21 },
];

const statusCfg: Record<ReviewStatus, { badge: string; icon: typeof CheckCircle; label: string }> = {
  approved: { badge: "badge-premium-success", icon: CheckCircle,   label: "Approved" },
  pending:  { badge: "badge-premium-warning", icon: MessageSquare, label: "Pending"  },
  flagged:  { badge: "badge-premium-danger",  icon: Flag,          label: "Flagged"  },
};

const AVATAR_COLORS = ["var(--primary)", "var(--accent)", "#3B82F6", "#8B5CF6", "#EF4444", "#10B981", "#F59E0B", "#EC4899", "#0EA5E9", "#6366F1"];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} fill={i <= rating ? "#FFB400" : "transparent"} stroke={i <= rating ? "#FFB400" : "var(--border)"} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReviewStatus>("all");
  const [reviews, setReviews]         = useState<Review[]>(initialReviews);
  const [expandId, setExpandId]       = useState<string | null>(null);

  const filtered = reviews.filter((r) => {
    const matchSearch = r.reviewer.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function approve(id: string) {
    setReviews((p) => p.map((r) => r.id === id ? { ...r, status: "approved" as ReviewStatus } : r));
  }
  function flagReview(id: string) {
    setReviews((p) => p.map((r) => r.id === id ? { ...r, status: "flagged" as ReviewStatus } : r));
  }
  function remove(id: string) {
    setReviews((p) => p.filter((r) => r.id !== id));
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0.0";

  return (
    <div className="admin-container space-y-8 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Review Moderation</h1>
          <p className="text-[var(--text-muted)] font-medium">Monitor, approve, and manage your product feedback ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 rounded-2xl border border-[var(--border)] flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-all">
            <Filter size={14} /> Filter Reports
          </button>
        </div>
      </div>

      {/* KPI ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Reviews",   value: reviews.length,                                  icon: MessageSquare, color: "var(--primary)", bg: "var(--primary-soft)" },
          { label: "Approved",        value: reviews.filter((r) => r.status === "approved").length, icon: CheckCircle,   color: "var(--success)", bg: "#dcfce7"            },
          { label: "Pending Review",  value: reviews.filter((r) => r.status === "pending").length,  icon: Star,          color: "#F59E0B",        bg: "#fef3c7"            },
          { label: "Avg Rating",      value: `${avgRating} ★`,                                icon: ThumbsUp,      color: "var(--accent)",  bg: "var(--accent-soft)"  },
        ].map(({ label, value, icon: Icon, color, bg }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="admin-card p-7"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg, color }}>
                <Icon size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--text-muted)]">{label}</p>
            </div>
            <p className="text-3xl font-black text-[var(--text)] tracking-tighter" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Control strip */}
      <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center bg-[var(--surface)] p-6 rounded-[2rem] border border-[var(--border)]">
        <div className="relative w-full xl:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reviewer or product..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[var(--surface-2)] border-none text-sm font-bold focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

        <div className="h-8 w-px bg-[var(--border)] hidden xl:block" />

        <div className="flex flex-wrap gap-2">
          {(["all", "approved", "pending", "flagged"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${statusFilter === s ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20" : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"}`}
            >
              <span className="uppercase tracking-widest">{s}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${statusFilter === s ? "bg-white/20" : "bg-[var(--surface-2)]"}`}>
                {s === "all" ? reviews.length : reviews.filter((r) => r.status === s).length}
              </span>
            </button>
          ))}
        </div>

        <div className="ml-auto hidden xl:flex items-center gap-3">
          <button className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-all"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      {/* Reviews table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reviewer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Helpful</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-24">
                    <Star size={48} className="mx-auto mb-4 text-[var(--border)]" />
                    <p className="text-lg font-black text-[var(--text-muted)]">No reviews found.</p>
                  </td>
                </tr>
              ) : filtered.map((review, idx) => {
                const cfg = statusCfg[review.status];
                const StatusIcon = cfg.icon;
                const isExpanded = expandId === review.id;
                return (
                  <tr key={review.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                          style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                        >
                          {review.avatar}
                        </div>
                        <span className="font-bold text-sm text-[var(--text)] whitespace-nowrap">{review.reviewer}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[var(--surface-2)] flex-shrink-0">
                          <Image src={review.productImg} alt={review.product} fill className="object-cover" sizes="36px" />
                        </div>
                        <span className="text-xs font-semibold text-[var(--text)] line-clamp-2 max-w-[140px]">{review.product}</span>
                      </div>
                    </td>
                    <td>
                      <StarRow rating={review.rating} />
                    </td>
                    <td>
                      <p
                        className={`text-xs text-[var(--text-muted)] max-w-[200px] cursor-pointer ${isExpanded ? "" : "line-clamp-2"}`}
                        onClick={() => setExpandId(isExpanded ? null : review.id)}
                      >
                        {review.comment}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <ThumbsUp size={12} className="text-[var(--text-muted)]" />
                        <span className="text-xs font-black text-[var(--text)]">{review.helpful}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{formatDate(review.date)}</span>
                    </td>
                    <td>
                      <span className={`badge-premium ${cfg.badge}`}>
                        <StatusIcon size={12} /> {cfg.label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => setExpandId(isExpanded ? null : review.id)} className="action-btn-p" title="Read Full Review">
                          <Eye size={16} />
                        </button>
                        {review.status !== "approved" && (
                          <button onClick={() => approve(review.id)} className="action-btn-p" title="Approve Review">
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {review.status !== "flagged" && (
                          <button onClick={() => flagReview(review.id)} className="action-btn-p" title="Flag Review">
                            <Flag size={16} />
                          </button>
                        )}
                        <button onClick={() => remove(review.id)} className="action-btn-p action-btn-p-danger" title="Delete Review">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 bg-[var(--surface)] rounded-[1.5rem] border border-[var(--border)]">
        <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Showing {filtered.length} of {reviews.length} reviews</p>
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-xl border border-[var(--border)] text-xs font-black uppercase text-[var(--text-muted)] disabled:opacity-30" disabled>Previous</button>
          <button className="h-10 px-4 rounded-xl border border-[var(--border)] text-xs font-black uppercase text-[var(--text-muted)]">Next Page</button>
        </div>
      </div>
    </div>
  );
}
