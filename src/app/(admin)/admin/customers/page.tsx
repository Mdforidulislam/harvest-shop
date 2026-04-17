"use client";
import { useState } from "react";
import { Search, Mail, Phone, Eye, Users } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { fakeOrders } from "@/lib/fake-data";

const customers = [
  { id: "c1", name: "Rabeya Khatun", email: "rabeya@email.com",   phone: "01700-000000", joined: "2024-01-15", orders: 12, spent: 18450, status: "active" },
  { id: "c2", name: "Arif Hossain",  email: "arif@email.com",     phone: "01711-111111", joined: "2024-02-20", orders: 7,  spent: 9200,  status: "active" },
  { id: "c3", name: "Sonia Begum",   email: "sonia@email.com",    phone: "01722-222222", joined: "2024-03-10", orders: 4,  spent: 5600,  status: "active" },
  { id: "c4", name: "Taher Ali",     email: "taher@email.com",    phone: "01733-333333", joined: "2024-04-05", orders: 9,  spent: 14300, status: "active" },
  { id: "c5", name: "Farhana Ahmed", email: "farhana@email.com",  phone: "01744-444444", joined: "2024-05-18", orders: 3,  spent: 3800,  status: "inactive" },
  { id: "c6", name: "Karim Miah",    email: "karim@email.com",    phone: "01755-555555", joined: "2024-06-22", orders: 6,  spent: 8100,  status: "active" },
  { id: "c7", name: "Nadia Islam",   email: "nadia@email.com",    phone: "01766-666666", joined: "2024-07-30", orders: 2,  spent: 2200,  status: "inactive" },
  { id: "c8", name: "Rahim Khan",    email: "rahim@email.com",    phone: "01777-777777", joined: "2024-08-14", orders: 14, spent: 22100, status: "active" },
];

export default function AdminCustomersPage() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState<"all" | "active" | "inactive">("all");
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Customers</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{customers.length} registered customers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: customers.length, color: "var(--primary)", bg: "var(--primary-soft)" },
          { label: "Active",          value: customers.filter(c => c.status === "active").length,   color: "var(--success)", bg: "#dcfce7" },
          { label: "Inactive",        value: customers.filter(c => c.status === "inactive").length, color: "var(--warning)", bg: "#fef3c7" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers…" className="input pl-9 w-60" />
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--surface-2)" }}>
          {(["all","active","inactive"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors"
              style={{ background: filter === f ? "var(--surface)" : "transparent", color: filter === f ? "var(--text)" : "var(--text-muted)" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                {["Customer", "Contact", "Joined", "Orders", "Total Spent", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10">
                  <Users size={28} className="mx-auto mb-2" style={{ color: "var(--border)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No customers found</p>
                </td></tr>
              ) : filtered.map((c, idx) => (
                <tr key={c.id} className="hover:bg-[var(--surface-2)] transition-colors" style={{ borderBottom: idx < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--primary)" }}>
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-semibold" style={{ color: "var(--text)" }}>{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}><Mail size={10} /> {c.email}</p>
                      <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}><Phone size={10} /> {c.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{formatDate(c.joined)}</td>
                  <td className="px-4 py-3 font-semibold text-sm" style={{ color: "var(--text)" }}>{c.orders}</td>
                  <td className="px-4 py-3 font-bold price-num text-sm" style={{ color: "var(--primary)" }}>{formatPrice(c.spent)}</td>
                  <td className="px-4 py-3">
                    <span className={`badge text-[10px] ${c.status === "active" ? "badge-success" : "badge-warning"}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(c)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors" style={{ color: "var(--text-muted)" }}>
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card p-6 w-full max-w-md" style={{ background: "var(--surface)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: "var(--primary)" }}>
                {selected.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold" style={{ color: "var(--text)" }}>{selected.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Customer since {formatDate(selected.joined)}</p>
              </div>
              <span className={`ml-auto badge ${selected.status === "active" ? "badge-success" : "badge-warning"}`}>{selected.status}</span>
            </div>
            <div className="space-y-2 mb-5">
              {[
                ["Email", selected.email],
                ["Phone", selected.phone],
                ["Total Orders", String(selected.orders)],
                ["Total Spent", formatPrice(selected.spent)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--text-muted)" }}>{k}</span>
                  <span className="font-semibold" style={{ color: "var(--text)" }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)} className="btn-md btn-secondary w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
