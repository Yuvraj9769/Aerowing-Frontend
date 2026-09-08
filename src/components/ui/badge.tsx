import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info"
    | "purple";
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-blue-600 text-white border-transparent",
  secondary: "bg-slate-100 text-slate-800 border-transparent",
  destructive: "bg-rose-50 text-rose-700 border-rose-200/80",
  outline: "text-slate-700 border-slate-200/90 bg-white",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 border-amber-200/80",
  info: "bg-blue-50 text-blue-700 border-blue-200/80",
  purple: "bg-violet-50 text-violet-700 border-violet-200/80",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors focus:outline-none shadow-2xs",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
