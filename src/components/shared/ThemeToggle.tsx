"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-14 h-8 rounded-full flex items-center p-1 transition-all duration-500",
        isDark ? "bg-[#2F2D28] border border-white/10" : "bg-[#F5F1E8] border border-black/5",
        className
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center shadow-lg",
          isDark ? "bg-[#F39556]" : "bg-[#2F6B3A]"
        )}
      >
        {isDark ? (
          <Moon size={12} className="text-white" fill="white" />
        ) : (
          <Sun size={12} className="text-white" fill="white" />
        )}
      </motion.div>
      <div className="flex-1 flex justify-center items-center">
        <Sparkles size={10} className={cn("transition-opacity", isDark ? "text-white/20" : "text-black/5")} />
      </div>
    </button>
  );
}
