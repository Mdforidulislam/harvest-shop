"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
        "hover:bg-[var(--surface-2)]",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} style={{ color: "var(--text-muted)" }} />
      ) : (
        <Moon size={18} style={{ color: "var(--text-muted)" }} />
      )}
    </button>
  );
}
