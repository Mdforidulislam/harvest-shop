import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "success" | "warning" | "danger" | "info";

const variants: Record<Variant, string> = {
  primary: "badge-primary",
  accent: "badge-accent",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "bg-blue-50 text-blue-600",
};

export default function Badge({ children, variant = "primary", className }: { children: React.ReactNode; variant?: Variant; className?: string }) {
  return <span className={cn("badge", variants[variant], className)}>{children}</span>;
}
