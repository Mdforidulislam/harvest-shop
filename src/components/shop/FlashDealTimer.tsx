"use client";
import { useState, useEffect } from "react";

function pad(n: number) { return n.toString().padStart(2, "0"); }

export default function FlashDealTimer({ endsAt }: { endsAt: Date }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, Math.floor((endsAt.getTime() - Date.now()) / 1000));
      setTime({ h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 });
    }
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [endsAt]);

  const box = "flex flex-col items-center px-2 py-1 rounded-lg text-white font-bold min-w-[2.5rem]";

  return (
    <div className="flex items-center gap-1">
      {[["h", time.h], ["m", time.m], ["s", time.s]].map(([label, val]) => (
        <span key={label as string} className={box} style={{ background: "var(--danger)" }}>
          <span className="text-lg leading-none">{pad(val as number)}</span>
          <span className="text-[9px] font-medium opacity-80">{label as string}</span>
        </span>
      ))}
    </div>
  );
}
