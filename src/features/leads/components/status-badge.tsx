import type { LeadStatus } from "@/constants/lead.constants";
import { cn } from "@/lib/utils";

const config: Record<
  LeadStatus,
  { bg: string; text: string; border: string; dot: string; ping?: boolean }
> = {
  New: {
    bg: "bg-blue-50/90",
    text: "text-blue-700",
    border: "border-blue-200/80",
    dot: "bg-blue-500",
    ping: true,
  },
  Contacted: {
    bg: "bg-purple-50/90",
    text: "text-purple-700",
    border: "border-purple-200/80",
    dot: "bg-purple-500",
  },
  Qualified: {
    bg: "bg-amber-50/90",
    text: "text-amber-800",
    border: "border-amber-200/80",
    dot: "bg-amber-500",
  },
  Converted: {
    bg: "bg-emerald-50/90",
    text: "text-emerald-800",
    border: "border-emerald-200/80",
    dot: "bg-emerald-500",
  },
  Lost: {
    bg: "bg-rose-50/90",
    text: "text-rose-700",
    border: "border-rose-200/80",
    dot: "bg-rose-500",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: LeadStatus;
  className?: string;
}) {
  const item = config[status] ?? config.New;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 shadow-2xs",
        item.bg,
        item.text,
        item.border,
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
        {item.ping && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75 duration-1000" />
        )}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", item.dot)} />
      </span>
      {status}
    </span>
  );
}
