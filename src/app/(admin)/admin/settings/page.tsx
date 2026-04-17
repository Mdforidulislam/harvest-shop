"use client";
import { useState } from "react";
import { Save, Loader2, CheckCircle, Globe, Mail, Phone, MapPin, Bell, Shield, Palette } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function AdminSettingsPage() {
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [activeTab, setActiveTab] = useState("store");
  const [store, setStore]     = useState({ name: "Harvest", tagline: "Pure Organic Foods", email: "hello@harvest.com.bd", phone: "+880 1700-000000", address: "123 Organic Lane, Gulshan-1, Dhaka 1212", currency: "BDT", timezone: "Asia/Dhaka" });
  const [notif, setNotif]     = useState({ orderEmail: true, orderSMS: true, lowStock: true, newCustomer: false, newsletter: true });

  const setS = (k: keyof typeof store, v: string) => setStore(p => ({ ...p, [k]: v }));
  const setN = (k: keyof typeof notif, v: boolean) => setNotif(p => ({ ...p, [k]: v }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 1000);
  }

  const tabs = [
    { id: "store",    label: "Store Info",    icon: Globe },
    { id: "notif",    label: "Notifications", icon: Bell },
    { id: "security", label: "Security",      icon: Shield },
    { id: "appear",   label: "Appearance",    icon: Palette },
  ];

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage your store configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--surface-2)" }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{ background: activeTab === id ? "var(--surface)" : "transparent", color: activeTab === id ? "var(--text)" : "var(--text-muted)" }}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      <form onSubmit={save}>
        {/* Store Info */}
        {activeTab === "store" && (
          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Store Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Store Name</label>
                <input className="input" value={store.name} onChange={e => setS("name", e.target.value)} /></div>
              <div><label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Tagline</label>
                <input className="input" value={store.tagline} onChange={e => setS("tagline", e.target.value)} /></div>
            </div>
            <div><label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Contact Email</label>
              <div className="relative"><Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input className="input pl-9" type="email" value={store.email} onChange={e => setS("email", e.target.value)} /></div></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Phone</label>
                <div className="relative"><Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                  <input className="input pl-9" value={store.phone} onChange={e => setS("phone", e.target.value)} /></div></div>
              <div><label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Currency</label>
                <select className="input" value={store.currency} onChange={e => setS("currency", e.target.value)}>
                  <option value="BDT">BDT (৳)</option><option value="USD">USD ($)</option></select></div>
            </div>
            <div><label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Address</label>
              <div className="relative"><MapPin size={13} className="absolute left-3 top-3" style={{ color: "var(--text-muted)" }} />
                <textarea className="input pl-9 h-16 resize-none py-2" value={store.address} onChange={e => setS("address", e.target.value)} /></div></div>
            <div><label className="block text-xs font-medium mb-1" style={{ color: "var(--text)" }}>Timezone</label>
              <select className="input" value={store.timezone} onChange={e => setS("timezone", e.target.value)}>
                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
              </select></div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notif" && (
          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Notification Preferences</h2>
            {[
              { key: "orderEmail"   as const, label: "Order confirmation email",   sub: "Send email when a new order is placed" },
              { key: "orderSMS"     as const, label: "Order confirmation SMS",     sub: "Send SMS to customer on order" },
              { key: "lowStock"     as const, label: "Low stock alerts",           sub: "Notify when product stock < 5" },
              { key: "newCustomer"  as const, label: "New customer signup",        sub: "Alert when a new customer registers" },
              { key: "newsletter"   as const, label: "Newsletter subscriptions",   sub: "Email on new newsletter signup" },
            ].map(({ key, label, sub }) => (
              <div key={key} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
                </div>
                <button type="button" onClick={() => setN(key, !notif[key])}
                  className="w-11 h-6 rounded-full transition-colors flex-shrink-0 relative"
                  style={{ background: notif[key] ? "var(--primary)" : "var(--border)" }}>
                  <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: notif[key] ? "calc(100% - 22px)" : "2px" }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Security Settings</h2>
            <div className="p-4 rounded-xl space-y-3" style={{ background: "var(--surface-2)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Change Admin Password</p>
              <input type="password" className="input" placeholder="Current password" />
              <input type="password" className="input" placeholder="New password" />
              <input type="password" className="input" placeholder="Confirm new password" />
              <button type="button" className="btn-md btn-secondary w-full">Update Password</button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>Two-Factor Authentication</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Add extra security to your admin account</p>
              </div>
              <button type="button" className="btn-sm btn-secondary">Enable 2FA</button>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Active Sessions</p>
              {[{ device: "Chrome on Windows 11", time: "Now" }, { device: "Mobile App", time: "1h ago" }].map(s => (
                <div key={s.device} className="flex justify-between text-xs py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--text)" }}>{s.device}</span>
                  <span style={{ color: "var(--text-muted)" }}>{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appearance */}
        {activeTab === "appear" && (
          <div className="card p-6 space-y-5">
            <h2 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Appearance</h2>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Dark / Light Mode</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Toggle between dark and light theme</p>
              </div>
              <ThemeToggle />
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Primary Color</p>
              <div className="flex gap-2">
                {["#2F6B3A","#1d6fa8","#7c3aed","#c2410c","#0f766e"].map((c) => (
                  <button key={c} type="button" className="w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110" style={{ background: c, borderColor: c === "#2F6B3A" ? "var(--text)" : "transparent" }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        {activeTab !== "appear" && (
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" disabled={saving} className="btn-md btn-primary flex items-center gap-2">
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> :
               saved  ? <><CheckCircle size={14} /> Saved!</> :
               <><Save size={14} /> Save Settings</>}
            </button>
            {saved && <span className="text-sm" style={{ color: "var(--success)" }}>Settings saved successfully</span>}
          </div>
        )}
      </form>
    </div>
  );
}
