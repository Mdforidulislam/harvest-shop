"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle, Headset, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-20">

      {/* Contact Hero */}
      <div className="text-white py-20 md:py-32 relative overflow-hidden" style={{ background: "var(--cta-green)" }}>
        <div className="page-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-black uppercase tracking-widest mb-6"
          >
            <Headset size={14} /> 24/7 Harvest Support
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tighter"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            We&apos;re Just a <span style={{ color: "var(--accent)" }}>Field Away</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Whether it&apos;s a query about our honey or a partnership request, we&apos;re here to cultivate connections.
          </motion.p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </div>

      <div className="page-container -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--surface)] p-8 md:p-12 rounded-[2.5rem] border border-[var(--border)] shadow-2xl shadow-black/5 h-full">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8" style={{ color: "var(--cta-green)" }}><CheckCircle size={40} /></div>
                    <h2 className="text-3xl font-black mb-4">Message Planted!</h2>
                    <p className="text-[var(--text-muted)] font-medium mb-10 max-w-xs mx-auto">Your inquiry has been received. Our team will reach out within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="px-10 py-4 text-white rounded-2xl font-black uppercase" style={{ background: "var(--accent)" }}>Send Another Inquiry</button>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">Full Name</label>
                        <input required className="w-full h-14 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 font-bold text-sm outline-none text-[var(--text)]" placeholder="e.g. Ariful Islam" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">Email Address</label>
                        <input required type="email" className="w-full h-14 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 font-bold text-sm outline-none text-[var(--text)]" placeholder="hello@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">Subject</label>
                      <select required className="w-full h-14 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 font-bold text-sm outline-none appearance-none text-[var(--text)]">
                        <option value="">Choose a subject</option>
                        <option>Order Inquiries</option>
                        <option>Partnership</option>
                        <option>Wholesale</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 block ml-2">Message</label>
                      <textarea required className="w-full h-40 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-6 py-5 font-bold text-sm outline-none resize-none text-[var(--text)]" placeholder="Tell us how we can help..." />
                    </div>
                    <button type="submit" className="w-full h-16 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-900/10 active:scale-95 transition-all flex items-center justify-center gap-3" style={{ background: "var(--cta-green)" }}>
                      <Send size={20} />
                      Send Message
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--surface)] p-8 md:p-10 rounded-[2.5rem] border border-[var(--border)] shadow-xl shadow-black/5">
              <h2 className="text-xl font-black mb-8 text-[var(--text)]">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[var(--accent)] shrink-0" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)" }}><MapPin size={24} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-1">Our Location</p>
                    <p className="text-sm font-bold text-[var(--text)]">Road 12, Block J, Gulshan-2, Dhaka 1212</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "color-mix(in srgb, var(--cta-green) 10%, transparent)", color: "var(--cta-green)" }}><Phone size={24} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-1">Phone Number</p>
                    <p className="text-sm font-bold text-[var(--text)]">+880 1700-000000</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><Mail size={24} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-1">Email Support</p>
                    <p className="text-sm font-bold text-[var(--text)]">purity@harvest.com.bd</p>
                  </div>
                </div>
              </div>
            </div>

            <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-8 bg-[#25D366] text-white rounded-[2rem] shadow-xl shadow-green-500/20 active:scale-95 transition-all">
              <div className="flex items-center gap-4">
                <MessageCircle size={32} />
                <div>
                  <p className="text-sm font-black">WhatsApp Chat</p>
                  <p className="text-xs font-bold opacity-80">Instant support from our team</p>
                </div>
              </div>
              <ArrowRight size={24} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
