"use client";
import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex items-center justify-center gap-3 py-4 text-white bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
          >
            <CheckCircle2 className="text-white fill-green-500 border-none" size={24} />
            <span className="font-black uppercase tracking-widest text-sm">Harvester Joined!</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col sm:flex-row gap-4 sm:gap-0 sm:bg-white/10 sm:backdrop-blur-xl sm:p-2 sm:rounded-[2rem] sm:border sm:border-white/20 sm:shadow-2xl transition-all group focus-within:ring-4 focus-within:ring-white/10"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your seed of an email..."
              className="w-full h-14 sm:h-16 px-8 bg-white/10 sm:bg-transparent rounded-[1.5rem] sm:rounded-none text-white placeholder:text-white/40 font-bold outline-none border border-white/10 sm:border-none focus:bg-white/20 sm:focus:bg-transparent transition-all"
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-14 sm:h-16 px-10 rounded-[1.5rem] bg-white text-[var(--primary)] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-[var(--accent)] hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Harvest News
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
