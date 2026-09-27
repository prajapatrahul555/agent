"use client";

import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType | React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  icon: Icon,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-slate-900 text-slate-50 hover:bg-slate-800 active:bg-slate-950 shadow-sm border border-slate-800",
    gold:
      "bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 shadow-sm shadow-amber-600/20 border border-amber-500/30",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200/80 active:bg-slate-300 border border-slate-200/80",
    outline:
      "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-300 shadow-xs",
    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    destructive:
      "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm border border-rose-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5 font-semibold",
  };

  let renderedIcon = null;
  if (Icon) {
    if (React.isValidElement(Icon)) {
      renderedIcon = Icon;
    } else if (typeof Icon === "function" || (typeof Icon === "object" && Icon !== null)) {
      const Comp = Icon as React.ElementType;
      renderedIcon = <Comp className={clsx("shrink-0", size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4")} />;
    }
  }

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {renderedIcon}
      <span>{children}</span>
    </button>
  );
}
