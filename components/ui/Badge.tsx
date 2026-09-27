"use client";

import React from "react";
import { clsx } from "clsx";
import { CheckCircle2, Clock, AlertCircle, XCircle, MinusCircle } from "lucide-react";

interface BadgeProps {
  status?: string;
  variant?: "success" | "warning" | "danger" | "neutral" | "info" | "gold";
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export function Badge({ status, variant, children, showIcon = true, className }: BadgeProps) {
  let resolvedVariant = variant || "neutral";
  let Icon = MinusCircle;
  let label = children || status;

  if (status) {
    const s = status.toLowerCase();
    if (s === "paid" || s === "present" || s === "active" || s === "passed" || s === "completed") {
      resolvedVariant = "success";
      Icon = CheckCircle2;
    } else if (s === "pending" || s === "late" || s === "review" || s === "due") {
      resolvedVariant = "warning";
      Icon = Clock;
    } else if (s === "unpaid" || s === "absent" || s === "failed" || s === "overdue" || s === "rejected") {
      resolvedVariant = "danger";
      Icon = XCircle;
    } else if (s === "scheduled" || s === "draft" || s === "unassigned") {
      resolvedVariant = "info";
      Icon = AlertCircle;
    }
  }

  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    warning: "bg-amber-50 text-amber-800 border-amber-200/80",
    danger: "bg-rose-50 text-rose-700 border-rose-200/80",
    info: "bg-sky-50 text-sky-700 border-sky-200/80",
    gold: "bg-amber-100/60 text-amber-900 border-amber-300/60",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border tracking-tight transition-colors select-none",
        styles[resolvedVariant],
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span className="capitalize">{label}</span>
    </span>
  );
}
