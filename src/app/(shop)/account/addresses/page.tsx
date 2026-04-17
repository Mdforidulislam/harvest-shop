"use client";
import { useState } from "react";
import { MapPin, Plus, Edit3, Trash2, Home, Briefcase, CheckCircle } from "lucide-react";

type Address = {
  id: string;
  label: string;
  type: "home" | "work" | "other";
  name: string;
  phone: string;
  line1: string;
  line2: string;
  district: string;
  division: string;
  zip: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: "a1", label: "Home", type: "home",
    name: "Rabeya Khatun", phone: "01700-000000",
    line1: "House 12, Road 5, Block B", line2: "Gulshan-2",
    district: "Dhaka", division: "Dhaka", zip: "1212",
    isDefault: true,
  },
  {
    id: "a2", label: "Office", type: "work",
    name: "Rabeya Khatun", phone: "01700-111111",
    line1: "Level 4, Rupayan Trade Centre", line2: "Panthapath",
    district: "Dhaka", division: "Dhaka", zip: "1215",
    isDefault: false,
  },
];

const typeIcon = { home: Home, work: Briefcase, other: MapPin };

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: "Home", type: "home" as Address["type"], name: "", phone: "", line1: "", line2: "", district: "Dhaka", division: "Dhaka", zip: "" });

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  function handleDelete(id: string) {
    setAddresses((p) => p.filter((a) => a.id !== id));
  }

  function handleSetDefault(id: string) {
    setAddresses((p) => p.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  function handleEdit(a: Address) {
    setEditId(a.id);
    setForm({ label: a.label, type: a.type, name: a.name, phone: a.phone, line1: a.line1, line2: a.line2, district: a.district, division: a.division, zip: a.zip });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editId) {
      setAddresses((p) => p.map((a) => a.id === editId ? { ...a, ...form } : a));
      setEditId(null);
    } else {
      setAddresses((p) => [...p, { id: `a${Date.now()}`, ...form, isDefault: p.length === 0 }]);
    }
    setShowForm(false);
    setForm({ label: "Home", type: "home", name: "", phone: "", line1: "", line2: "", district: "Dhaka", division: "Dhaka", zip: "" });
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Saved Addresses</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{addresses.length} address{addresses.length !== 1 ? "es" : ""} saved</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); }} className="btn-sm btn-primary">
          <Plus size={14} /> Add New
        </button>
      </div>

      {/* Address cards */}
      <div className="space-y-3">
        {addresses.map((a) => {
          const Icon = typeIcon[a.type];
          return (
            <div key={a.id} className="card p-5" style={{ border: a.isDefault ? "2px solid var(--primary)" : undefined }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: a.isDefault ? "var(--primary-soft)" : "var(--surface-2)" }}>
                    <Icon size={16} style={{ color: a.isDefault ? "var(--primary)" : "var(--text-muted)" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-sm" style={{ color: "var(--text)" }}>{a.label}</p>
                      {a.isDefault && (
                        <span className="flex items-center gap-0.5 text-[10px] font-semibold badge badge-primary">
                          <CheckCircle size={9} /> Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{a.name}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {a.line1}, {a.line2}
                      <br />{a.district}, {a.division} {a.zip}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{a.phone}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => handleEdit(a)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--surface-2)]" style={{ color: "var(--text-muted)" }}>
                    <Edit3 size={14} />
                  </button>
                  {!a.isDefault && (
                    <button onClick={() => handleDelete(a.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50" style={{ color: "var(--danger)" }}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
              {!a.isDefault && (
                <button onClick={() => handleSetDefault(a.id)} className="mt-3 text-xs font-medium" style={{ color: "var(--primary)" }}>
                  Set as default
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div className="card p-5">
          <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            {editId ? "Edit Address" : "New Address"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Label</label>
                <input className="input" value={form.label} onChange={(e) => set("label", e.target.value)} placeholder="Home / Office" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Type</label>
                <select className="input" value={form.type} onChange={(e) => set("type", e.target.value as Address["type"])}>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Full Name</label>
                <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Phone</label>
                <input className="input" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Street / House</label>
              <input className="input" value={form.line1} onChange={(e) => set("line1", e.target.value)} placeholder="House no., Road, Block" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Area / Thana</label>
              <input className="input" value={form.line2} onChange={(e) => set("line2", e.target.value)} placeholder="Gulshan-2, Banani…" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Division</label>
                <select className="input" value={form.division} onChange={(e) => set("division", e.target.value)}>
                  {["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Barishal","Rangpur","Mymensingh"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>District</label>
                <input className="input" value={form.district} onChange={(e) => set("district", e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>ZIP</label>
                <input className="input" value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="1212" />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" className="btn-md btn-primary">
                {editId ? "Update Address" : "Save Address"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-md btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
