"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="section-title mb-2">Contact Us</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>We're here to help — typically reply within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="card p-6">
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "var(--success)" }} />
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Message Sent!</h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Thanks! We'll reply within 24 hours.</p>
              <button onClick={() => setSent(false)} className="btn-md btn-primary mt-4">Send Another</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <h2 className="font-bold text-base mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Send a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Name *</label>
                  <input required className="input" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Phone</label>
                  <input type="tel" className="input" placeholder="01700000000" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Email *</label>
                <input required type="email" className="input" placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Subject *</label>
                <select required className="input">
                  <option value="">Select a subject</option>
                  <option>Order Issue</option>
                  <option>Product Question</option>
                  <option>Return / Refund</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text)" }}>Message *</label>
                <textarea required rows={5} className="input resize-none h-auto py-3" placeholder="How can we help you?" />
              </div>
              <button type="submit" className="btn-lg btn-primary w-full">Send Message</button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-base" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>Get in Touch</h2>
            {[
              { icon: MapPin, label: "Address", value: "123 Organic Lane, Gulshan-1, Dhaka 1212" },
              { icon: Phone, label: "Phone", value: "+880 1700-000000", href: "tel:+8801700000000" },
              { icon: Mail, label: "Email", value: "hello@harvest.com.bd", href: "mailto:hello@harvest.com.bd" },
              { icon: Clock, label: "Hours", value: "Saturday–Thursday, 9:00 AM – 8:00 PM" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "var(--primary-soft)" }}>
                  <Icon size={14} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</p>
                  {href ? <a href={href} className="text-sm hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text)" }}>{value}</a> : <p className="text-sm" style={{ color: "var(--text)" }}>{value}</p>}
                </div>
              </div>
            ))}
          </div>

          <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="btn-lg btn-primary w-full justify-center" style={{ background: "#25D366" }}>
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>

          {/* Map placeholder */}
          <div className="card overflow-hidden rounded-xl h-48 flex items-center justify-center" style={{ background: "var(--surface-2)" }}>
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2" style={{ color: "var(--primary)" }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Gulshan-1, Dhaka, Bangladesh</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 block" style={{ color: "var(--primary)" }}>Open in Google Maps</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
