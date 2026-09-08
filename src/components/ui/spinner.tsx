import { cn } from "@/lib/utils";

export function Spinner({
  light = false,
  className = "",
  size = "md",
}: {
  light?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = {
    sm: "h-3.5 w-3.5 border-2",
    md: "h-4 w-4 border-2",
    lg: "h-6 w-6 border-2",
  };

  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full",
        sizeMap[size],
        light
          ? "border-white/30 border-t-white"
          : "border-blue-200 border-t-blue-600",
        className,
      )}
      aria-label="Loading"
      role="status"
    />
  );
}
