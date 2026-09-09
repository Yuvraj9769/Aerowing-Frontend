import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone: "blue" | "violet" | "amber" | "green" | "rose";
  hint?: string;
}

const toneStyles: Record<
  MetricCardProps["tone"],
  {
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    borderAccent: string;
  }
> = {
  blue: {
    iconBg: "bg-blue-50 text-blue-600 border-blue-100",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50/70 text-blue-700",
    borderAccent: "hover:border-blue-300/80",
  },
  violet: {
    iconBg: "bg-violet-50 text-violet-600 border-violet-100",
    iconColor: "text-violet-600",
    badgeBg: "bg-violet-50/70 text-violet-700",
    borderAccent: "hover:border-violet-300/80",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-50/70 text-amber-700",
    borderAccent: "hover:border-amber-300/80",
  },
  green: {
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50/70 text-emerald-700",
    borderAccent: "hover:border-emerald-300/80",
  },
  rose: {
    iconBg: "bg-rose-50 text-rose-600 border-rose-100",
    iconColor: "text-rose-600",
    badgeBg: "bg-rose-50/70 text-rose-700",
    borderAccent: "hover:border-rose-300/80",
  },
};

export const MetricCard = memo(function MetricCard({
  label,
  value,
  icon: Icon,
  tone,
  hint,
}: MetricCardProps) {
  const currentTone = toneStyles[tone];

  return (
    <div
      className={cn(
        "group relative min-w-0 flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover sm:p-5",
        currentTone.borderAccent,
      )}
    >
      <div className="relative min-w-0 pr-12">
        <div className="min-w-0">
          <p className="break-words text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums sm:text-[26px]">
              {value}
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute right-4 top-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 sm:right-5 sm:top-5",
          currentTone.iconBg,
        )}
      >
        <Icon className={cn("h-5 w-5", currentTone.iconColor)} />
      </div>

      <div className="mt-3.5 pt-2 border-t border-slate-100/80">
        {hint ? (
          <p className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
            <ArrowUpRight size={13} className="shrink-0 text-emerald-600" />
            <span className="truncate">{hint}</span>
          </p>
        ) : (
          <p className="text-[11px] font-normal text-slate-400">
            Updated in real-time
          </p>
        )}
      </div>
    </div>
  );
});
