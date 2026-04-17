"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock, Shield, Smartphone, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export default function SecurityPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const strength = (() => {
    const p = form.newPass;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthColors = ["", "var(--danger)", "var(--warning)", "var(--info)", "var(--success)"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const mismatch = form.confirm && form.newPass !== form.confirm;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mismatch) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setForm({ current: "", newPass: "", confirm: "" });
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
          Security Settings
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
          Manage your password and account security
        </p>
      </div>

      {/* Change password */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-soft)" }}>
            <Lock size={15} style={{ color: "var(--primary)" }} />
          </div>
          <h2 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            Change Password
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Current Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                required type={showCurrent ? "text" : "password"}
                value={form.current} onChange={(e) => set("current", e.target.value)}
                className="input pl-9 pr-10" placeholder="Enter current password"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* New */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>New Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                required type={showNew ? "text" : "password"}
                value={form.newPass} onChange={(e) => set("newPass", e.target.value)}
                className="input pl-9 pr-10" placeholder="Min. 8 characters"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {form.newPass && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-colors" style={{ background: i <= strength ? strengthColors[strength] : "var(--border)" }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]} password</p>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Confirm New Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                required type={showConfirm ? "text" : "password"}
                value={form.confirm} onChange={(e) => set("confirm", e.target.value)}
                className={`input pl-9 pr-10 ${mismatch ? "border-[var(--danger)]" : ""}`}
                placeholder="Re-enter new password"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {mismatch && (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--danger)" }}>
                <AlertTriangle size={11} /> Passwords do not match
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button type="submit" disabled={saving || !!mismatch} className="btn-md btn-primary flex items-center gap-2">
              {saving ? <><Loader2 size={14} className="animate-spin" /> Updating…</> :
               saved  ? <><CheckCircle size={14} /> Updated!</> :
               <><Shield size={14} /> Update Password</>}
            </button>
            {saved && <span className="text-sm" style={{ color: "var(--success)" }}>Password changed successfully</span>}
          </div>
        </form>
      </div>

      {/* 2FA section */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-soft)" }}>
              <Smartphone size={15} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>Two-Factor Authentication</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Extra layer of security for your account</p>
            </div>
          </div>
          <button className="btn-sm btn-secondary text-xs">Enable</button>
        </div>
      </div>

      {/* Active sessions */}
      <div className="card p-6">
        <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
          Active Sessions
        </h2>
        <div className="space-y-3">
          {[
            { device: "Chrome on Windows 11", location: "Dhaka, Bangladesh", time: "Now (current session)", current: true },
            { device: "Safari on iPhone 14",  location: "Dhaka, Bangladesh", time: "2 hours ago",           current: false },
          ].map((s) => (
            <div key={s.device} className="flex items-center justify-between gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{s.device}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.location} · {s.time}</p>
              </div>
              {s.current ? (
                <span className="badge badge-success text-[10px]">Current</span>
              ) : (
                <button className="text-xs font-medium" style={{ color: "var(--danger)" }}>Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
