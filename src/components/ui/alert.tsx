import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Alert({
  message,
  onDismiss,
  success = false,
  className,
}: {
  message: string;
  onDismiss?: () => void;
  success?: boolean;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-sm shadow-md transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2",
        success
          ? "border-emerald-200/90 bg-emerald-50/95 text-emerald-900"
          : "border-rose-200/90 bg-rose-50/95 text-rose-900",
        className,
      )}
    >
      <span className={cn("mt-0.5 shrink-0", success ? "text-emerald-600" : "text-rose-600")}>
        {success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      </span>
      <span className="flex-1 font-medium leading-5">{message}</span>
      {onDismiss ? (
        <button
          aria-label="Dismiss notification"
          onClick={onDismiss}
          className={cn(
            "rounded-md p-0.5 transition-colors focus:outline-none focus:ring-2",
            success
              ? "text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800 focus:ring-emerald-400"
              : "text-rose-600 hover:bg-rose-100 hover:text-rose-800 focus:ring-rose-400",
          )}
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
