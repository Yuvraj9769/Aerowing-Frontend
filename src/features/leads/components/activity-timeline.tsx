import {
  CalendarDays,
  CheckCircle2,
  GitCommit,
  MessageSquare,
  Sparkles,
  UserCheck,
} from "lucide-react";
import type { Activity } from "@/types/lead";
import { formatDateTime } from "@/utils/format";
import { cn } from "@/lib/utils";

const typeStyles: Record<
  Activity["type"],
  { icon: typeof Sparkles; bg: string; text: string; ring: string }
> = {
  created: {
    icon: Sparkles,
    bg: "bg-blue-50",
    text: "text-blue-600",
    ring: "ring-blue-100",
  },
  status_change: {
    icon: GitCommit,
    bg: "bg-purple-50",
    text: "text-purple-600",
    ring: "ring-purple-100",
  },
  note: {
    icon: MessageSquare,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  event: {
    icon: UserCheck,
    bg: "bg-amber-50",
    text: "text-amber-600",
    ring: "ring-amber-100",
  },
};

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        No recorded activities yet for this lead.
      </div>
    );
  }

  const sorted = [...activities].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  );

  return (
    <div className="relative space-y-0 pl-1">
      {sorted.map((activity, index) => {
        const itemConfig = typeStyles[activity.type] ?? typeStyles.created;
        const Icon = itemConfig.icon;

        return (
          <div
            className="relative flex gap-4 pb-7 last:pb-2"
            key={`${activity.createdAt}-${activity.title}-${index}`}
          >
            {/* Timeline connector line */}
            {index < sorted.length - 1 && (
              <span
                className="absolute left-[17px] top-8 h-full w-[2px] bg-slate-200/90"
                aria-hidden="true"
              />
            )}

            {/* Timeline node icon */}
            <div
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white shadow-xs ring-4",
                itemConfig.bg,
                itemConfig.text,
                itemConfig.ring,
              )}
            >
              <Icon size={16} />
            </div>

            {/* Activity content */}
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <p className="text-sm font-semibold text-slate-900">
                  {activity.title}
                </p>
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                  <CalendarDays size={12} className="text-slate-400" />
                  {formatDateTime(activity.createdAt)}
                </span>
              </div>

              {activity.description && (
                <div className="mt-1.5 rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs text-slate-600 leading-relaxed">
                  {activity.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
