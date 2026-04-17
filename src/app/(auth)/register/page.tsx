"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", agree: false });

  const set = (k: keyof typeof form, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const passwordStrength = (p: string) => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "var(--danger)", "var(--warning)", "var(--info)", "var(--success)"][strength];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>
            Create your account
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Join thousands of organic food lovers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Full name</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Rabeya Khatun"
                className="input pl-9"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Email address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@email.com"
                className="input pl-9"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Phone number</label>
            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="01700000000"
                className="input pl-9"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                required
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Min. 8 characters"
                className="input pl-9 pr-10"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {/* Strength bar */}
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-colors duration-200" style={{ background: i <= strength ? strengthColor : "var(--border)" }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel} password</p>
              </div>
            )}
          </div>

          {/* Perks */}
          <div className="rounded-xl p-3 space-y-1.5" style={{ background: "var(--primary-soft)" }}>
            {["Free delivery on first order", "Exclusive member discounts", "Order tracking & history"].map((p) => (
              <div key={p} className="flex items-center gap-2 text-xs" style={{ color: "var(--primary)" }}>
                <CheckCircle size={12} />
                {p}
              </div>
            ))}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={form.agree}
              onChange={(e) => set("agree", e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded accent-[var(--primary)] flex-shrink-0"
            />
            <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              I agree to the{" "}
              <Link href="/terms" className="font-medium" style={{ color: "var(--primary)" }}>Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy-policy" className="font-medium" style={{ color: "var(--primary)" }}>Privacy Policy</Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !form.agree}
            className="btn-lg btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Creating account…</>
            ) : (
              <>Create Account <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold" style={{ color: "var(--primary)" }}>
            Sign in
          </Link>
        </p>
      </div>

      <p className="text-center text-xs mt-4" style={{ color: "var(--text-muted)" }}>
        🔒 Your information is encrypted and secure
      </p>
    </div>
  );
}
