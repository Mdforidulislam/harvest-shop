"use client";
import { useEffect, useState } from "react";

export type ChartColors = {
  primary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  text: string;
  textMuted: string;
  border: string;
  surface: string;
  surface2: string;
  successSoft: string;
  dangerSoft: string;
};

function read(name: string): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function snapshot(): ChartColors {
  return {
    primary:     read("--primary"),
    accent:      read("--accent"),
    success:     read("--success"),
    warning:     read("--warning"),
    danger:      read("--danger"),
    info:        read("--info"),
    text:        read("--text"),
    textMuted:   read("--text-muted"),
    border:      read("--border"),
    surface:     read("--surface"),
    surface2:    read("--surface-2"),
    successSoft: read("--success-soft"),
    dangerSoft:  read("--danger-soft"),
  };
}

const EMPTY: ChartColors = {
  primary: "", accent: "", success: "", warning: "", danger: "",
  info: "", text: "", textMuted: "", border: "", surface: "",
  surface2: "", successSoft: "", dangerSoft: "",
};

export function useChartColors(): ChartColors {
  const [colors, setColors] = useState<ChartColors>(EMPTY);

  useEffect(() => {
    setColors(snapshot());
    // Re-read whenever the theme class on <html> changes (dark ↔ light)
    const observer = new MutationObserver(() => setColors(snapshot()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
