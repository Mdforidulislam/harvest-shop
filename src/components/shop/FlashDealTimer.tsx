"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function pad(n: number) { return n.toString().padStart(2, "0"); }

export default function FlashDealTimer({ endsAt }: { endsAt: Date }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, ms: 0 });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, endsAt.getTime() - Date.now());
      const totalSeconds = Math.floor(diff / 1000);
      setTime({
        h: Math.floor(totalSeconds / 3600),
        m: Math.floor((totalSeconds % 3600) / 60),
        s: totalSeconds % 60,
        ms: Math.floor((diff % 1000) / 10)
      });
    }
    tick();
    const t = setInterval(tick, 10);
    return () => clearInterval(t);
  }, [endsAt]);

  const boxes = [
    { label: "Hours", val: time.h },
    { label: "Mins", val: time.m },
    { label: "Secs", val: time.s },
  ];

  return (
    <div className="flex items-center gap-3">
      {boxes.map(({ label, val }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--surface)] border-2 border-[var(--danger)] flex items-center justify-center shadow-lg shadow-red-900/10">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={val}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                  className="text-2xl md:text-3xl font-black text-[var(--danger)]"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {pad(val)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--danger)] mt-2 opacity-60">
              {label}
            </span>
          </div>
          {i < 2 && (
            <div className="flex flex-col gap-1.5 mt-[-1rem]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--danger)]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--danger)]/30" />
            </div>
          )}
        </div>
      ))}

      {/* Milliseconds for urgency */}
      <div className="flex flex-col items-center ml-2 border-l border-[var(--border)] pl-4">
        <span className="text-xl md:text-2xl font-black text-[var(--danger)] opacity-30 tabular-nums">
          {pad(time.ms)}
        </span>
        <span className="text-[8px] font-black uppercase tracking-widest opacity-20">MS</span>
      </div>
    </div>
  );
}
