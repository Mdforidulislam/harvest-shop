"use client";
import { useState } from "react";
import Image from "next/image";
import { Camera, User, Mail, Phone, MapPin, Calendar, Save, Loader2, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export default function EditProfilePage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name:     "Rabeya Khatun",
    email:    "rabeya@email.com",
    phone:    "01700-000000",
    dob:      "1995-06-14",
    gender:   "female",
    bio:      "Organic food lover. Believer in eating clean and living healthy.",
    division: "Dhaka",
    district: "Dhaka",
    address:  "House 12, Road 5, Block B, Gulshan-2",
  });

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 1200);
  }

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Avatar section */}
      <div className="card p-6">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Profile Photo</h2>
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
              style={{ background: "var(--primary)" }}>R</div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md text-white"
              style={{ background: "var(--primary)" }}
              aria-label="Change photo"
            >
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>Rabeya Khatun</p>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>JPG, PNG or WEBP. Max 2MB.</p>
            <div className="flex gap-2">
              <button className="btn-sm btn-secondary text-xs">Upload Photo</button>
              <button className="btn-sm btn-ghost text-xs" style={{ color: "var(--danger)" }}>Remove</button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal info form */}
      <form onSubmit={handleSave} className="space-y-5">
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Personal Information</h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input className="input pl-9" value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input className="input pl-9" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Phone Number</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input className="input pl-9" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Date of Birth</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input className="input pl-9" type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Gender</label>
              <select className="input" value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Bio <span style={{ color: "var(--text-muted)" }}>(optional)</span></label>
            <textarea
              className="input h-20 resize-none py-2.5"
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              placeholder="Tell us a bit about yourself…"
              maxLength={200}
            />
            <p className="text-xs mt-1 text-right" style={{ color: "var(--text-muted)" }}>{form.bio.length}/200</p>
          </div>
        </div>

        {/* Address */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Default Address</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Division</label>
              <select className="input" value={form.division} onChange={(e) => set("division", e.target.value)}>
                {["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Barishal","Rangpur","Mymensingh"].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>District</label>
              <input className="input" value={form.district} onChange={(e) => set("district", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Street Address</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-3" style={{ color: "var(--text-muted)" }} />
              <textarea
                className="input pl-9 h-16 resize-none py-2.5"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-md btn-primary flex items-center gap-2">
            {saving ? (
              <><Loader2 size={14} className="animate-spin" /> Saving…</>
            ) : saved ? (
              <><CheckCircle size={14} /> Saved!</>
            ) : (
              <><Save size={14} /> Save Changes</>
            )}
          </button>
          {saved && <span className="text-sm" style={{ color: "var(--success)" }}>Profile updated successfully</span>}
        </div>
      </form>
    </div>
  );
}
