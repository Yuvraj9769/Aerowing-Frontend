import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-blue-600 text-white shadow-xs hover:bg-blue-700 active:scale-[0.99] focus-visible:ring-blue-500",
  destructive:
    "bg-rose-600 text-white shadow-xs hover:bg-rose-700 active:scale-[0.99] focus-visible:ring-rose-500",
  outline:
    "border border-slate-200/90 bg-white text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] focus-visible:ring-slate-300",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.99] focus-visible:ring-slate-300",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-200",
  link: "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500 p-0 h-auto",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 px-3.5 py-2 text-xs",
  lg: "h-11 px-5 py-2.5 text-base",
  icon: "h-9 w-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
