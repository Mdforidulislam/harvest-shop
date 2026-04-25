"use client";
import { useState } from "react";
import { Search, Plus, Eye, Edit2, Trash2, Star, Store, TrendingUp, Package, Download, CheckCircle, XCircle, Clock, MoreHorizontal, Filter } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Seller = {
  id: string;
  name: string;
  email: string;
  phone: string;
  shop: string;
  products: number;
  revenue: number;
  rating: number;
  reviews: number;
  joined: string;
  status: "active" | "pending" | "suspended";
  avatar: string;
};

const initialSellers: Seller[] = [
  { id: "s001", name: "Karim Organic",   email: "karim@organics.com",   phone: "01700-111000", shop: "Karim's Honey House",      products: 24, revenue: 185000, rating: 4.8, reviews: 312, joined: "2024-01-15", status: "active",    avatar: "K" },
  { id: "s002", name: "Sundarban Farms", email: "info@sundarban.com",   phone: "01711-222111", shop: "Sundarban Pure Foods",      products: 38, revenue: 342000, rating: 4.9, reviews: 621, joined: "2024-02-08", status: "active",    avatar: "S" },
  { id: "s003", name: "Nadia Natural",   email: "nadia@natural.com",    phone: "01722-333222", shop: "Nadia's Natural Pantry",    products: 16, revenue:  98500, rating: 4.5, reviews: 184, joined: "2024-03-20", status: "active",    avatar: "N" },
  { id: "s004", name: "Hill Valley Co.", email: "hill@valley.com",      phone: "01733-444333", shop: "Hill Valley Organics",      products: 12, revenue:  67800, rating: 4.3, reviews:  97, joined: "2024-04-12", status: "pending",   avatar: "H" },
  { id: "s005", name: "Pure Earth BD",   email: "contact@pureearth.com",phone: "01744-555444", shop: "Pure Earth Supplies",       products: 29, revenue: 216000, rating: 4.7, reviews: 408, joined: "2024-05-05", status: "active",    avatar: "P" },
  { id: "s006", name: "Village Harvest", email: "village@harvest.com",  phone: "01755-666555", shop: "Village Harvest Co.",       products:  8, revenue:  32000, rating: 3.9, reviews:  45, joined: "2024-06-18", status: "suspended", avatar: "V" },
  { id: "s007", name: "Green Roots",     email: "green@roots.com",      phone: "01766-777666", shop: "Green Roots Collective",    products: 21, revenue: 154000, rating: 4.6, reviews: 267, joined: "2024-07-22", status: "active",    avatar: "G" },
  { id: "s008", name: "Agro Fresh BD",   email: "agro@fresh.com",       phone: "01777-888777", shop: "Agro Fresh Market",         products: 33, revenue: 274000, rating: 4.7, reviews: 519, joined: "2024-08-11", status: "active",    avatar: "A" },
];

const statusCfg = {
  active:    { badge: "badge-premium-success", icon: CheckCircle, label: "Active" },
  pending:   { badge: "badge-premium-warning", icon: Clock,       label: "Pending" },
  suspended: { badge: "badge-premium-danger",  icon: XCircle,     label: "Suspended" },
};

const AVATAR_COLORS = ["var(--primary)", "var(--accent)", "#3B82F6", "#8B5CF6", "#10B981", "#EF4444", "#F59E0B", "#EC4899"];

export default function SellersPage() {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState<"all" | "active" | "pending" | "suspended">("all");
  const [sellers, setSellers]     = useState<Seller[]>(initialSellers);
  const [viewSeller, setView]     = useState<Seller | null>(null);
  const [deleteId, setDeleteId]   = useState<string | null>(null);

  const filtered = sellers.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.shop.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function confirmDelete() {
    if (deleteId) setSellers((p) => p.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="admin-container space-y-8 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text)]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Seller Network</h1>
          <p className="text-[var(--text-muted)] font-medium">Manage your organic vendor ecosystem and partner storefronts.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 rounded-2xl border border-[var(--border)] flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-all">
            <Download size={14} /> Export List
          </button>
          <button className="h-12 px-8 rounded-2xl bg-[var(--primary)] text-white flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-[var(--primary-hover)] transition-all shadow-xl shadow-[var(--primary)]/10">
            <Plus size={16} /> Invite Seller
          </button>
        </div>
      </div>

      {/* KPI ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Sellers",      value: sellers.length,                                    icon: Store,       color: "var(--primary)", bg: "var(--primary-soft)" },
          { label: "Active Vendors",     value: sellers.filter((s) => s.status === "active").length, icon: CheckCircle, color: "var(--success)", bg: "#dcfce7" },
          { label: "Total Products",     value: sellers.reduce((s, v) => s + v.products, 0),       icon: Package,     color: "#3B82F6",        bg: "#dbeafe" },
          { label: "Combined Revenue",   value: formatPrice(sellers.reduce((s, v) => s + v.revenue, 0)), icon: TrendingUp, color: "var(--accent)",  bg: "var(--accent-soft)" },
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
        <div className="relative w-full xl:w-96">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by seller or shop name..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[var(--surface-2)] border-none text-sm font-bold focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

        <div className="h-8 w-px bg-[var(--border)] hidden xl:block" />

        <div className="flex flex-wrap gap-2">
          {(["all", "active", "pending", "suspended"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${statusFilter === s ? "bg-[var(--primary)] text-white shadow-xl shadow-[var(--primary)]/20" : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]"}`}
            >
              <span className="uppercase tracking-widest">{s}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${statusFilter === s ? "bg-white/20" : "bg-[var(--surface-2)]"}`}>
                {s === "all" ? sellers.length : sellers.filter((v) => v.status === s).length}
              </span>
            </button>
          ))}
        </div>

        <div className="ml-auto hidden xl:flex items-center gap-3">
          <button className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-all"><Filter size={18} /></button>
          <button className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-all"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Seller Profile</th>
                <th>Shop Name</th>
                <th>Products</th>
                <th>Revenue</th>
                <th>Rating</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-24">
                    <Store size={48} className="mx-auto mb-4 text-[var(--border)]" />
                    <p className="text-lg font-black text-[var(--text-muted)]">No sellers found.</p>
                  </td>
                </tr>
              ) : filtered.map((seller, idx) => {
                const cfg = statusCfg[seller.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={seller.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                          style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                        >
                          {seller.avatar}
                        </div>
                        <div>
                          <p className="font-black text-sm text-[var(--text)]">{seller.name}</p>
                          <p className="text-[10px] text-[var(--text-muted)]">{seller.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold text-sm text-[var(--text)]">{seller.shop}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Package size={13} className="text-[var(--text-muted)]" />
                        <span className="font-black text-sm text-[var(--text)]">{seller.products}</span>
                      </div>
                    </td>
                    <td>
                      <span className="font-black text-sm text-[var(--accent)]">{formatPrice(seller.revenue)}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-2)] w-fit">
                        <Star size={12} fill="#FFB400" className="text-[#FFB400]" />
                        <span className="text-xs font-black text-[var(--text)]">{seller.rating}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">({seller.reviews})</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-[var(--text-muted)]">{formatDate(seller.joined)}</span>
                    </td>
                    <td>
                      <span className={`badge-premium ${cfg.badge}`}>
                        <StatusIcon size={12} /> {cfg.label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => setView(seller)} className="action-btn-p" title="View Profile"><Eye size={16} /></button>
                        <button className="action-btn-p" title="Edit Seller"><Edit2 size={16} /></button>
                        <button onClick={() => setDeleteId(seller.id)} className="action-btn-p action-btn-p-danger" title="Remove Seller"><Trash2 size={16} /></button>
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
        <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Showing {filtered.length} of {sellers.length} vendors</p>
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-xl border border-[var(--border)] text-xs font-black uppercase text-[var(--text-muted)] disabled:opacity-30" disabled>Previous</button>
          <button className="h-10 px-4 rounded-xl border border-[var(--border)] text-xs font-black uppercase text-[var(--text-muted)]">Next Page</button>
        </div>
      </div>

      {/* Seller detail modal */}
      <AnimatePresence>
        {viewSeller && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-card p-10 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0"
                  style={{ background: AVATAR_COLORS[initialSellers.findIndex((s) => s.id === viewSeller.id) % AVATAR_COLORS.length] }}
                >
                  {viewSeller.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black text-[var(--text)] truncate" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{viewSeller.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] truncate">{viewSeller.shop}</p>
                </div>
                <span className={`badge-premium ${statusCfg[viewSeller.status].badge} flex-shrink-0`}>
                  {statusCfg[viewSeller.status].label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Products",  value: String(viewSeller.products) },
                  { label: "Revenue",   value: formatPrice(viewSeller.revenue) },
                  { label: "Rating",    value: `${viewSeller.rating} ★ (${viewSeller.reviews})` },
                  { label: "Phone",     value: viewSeller.phone },
                  { label: "Email",     value: viewSeller.email },
                  { label: "Joined",    value: formatDate(viewSeller.joined) },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 rounded-2xl" style={{ background: "var(--surface-2)" }}>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">{label}</p>
                    <p className="text-sm font-bold text-[var(--text)] truncate">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="h-12 flex-1 rounded-2xl bg-[var(--primary)] text-white font-black text-xs uppercase tracking-widest hover:bg-[var(--primary-hover)] transition-all">
                  Edit Seller
                </button>
                <button onClick={() => setView(null)} className="h-12 flex-1 rounded-2xl bg-[var(--surface-2)] text-[var(--text)] font-black text-xs uppercase tracking-widest hover:bg-[var(--border)] transition-all">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-card p-10 w-full max-w-sm text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-red-50 flex items-center justify-center mx-auto mb-5">
                <Trash2 size={28} className="text-red-500" />
              </div>
              <h3 className="text-xl font-black mb-2 text-[var(--text)]">Remove Seller?</h3>
              <p className="text-sm text-[var(--text-muted)] mb-8">This vendor and all associated data will be permanently removed from the network.</p>
              <div className="flex gap-3">
                <button onClick={confirmDelete} className="h-12 flex-1 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all">Remove</button>
                <button onClick={() => setDeleteId(null)} className="h-12 flex-1 rounded-2xl bg-[var(--surface-2)] text-[var(--text)] font-black text-xs uppercase tracking-widest hover:bg-[var(--border)] transition-all">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
