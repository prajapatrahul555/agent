"use client";

import React from "react";
import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";

interface StatTileProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  context?: string;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export function StatTile({
  title,
  value,
  icon: Icon,
  trend,
  context,
  iconBg = "bg-amber-50 border-amber-100",
  iconColor = "text-amber-700",
  className,
}: StatTileProps) {
  return (
    <div
      className={clsx(
        "p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">{value}</h3>
        </div>
        <div className={clsx("p-3 rounded-xl border shrink-0 transition-transform group-hover:scale-105", iconBg)}>
          <Icon className={clsx("w-6 h-6", iconColor)} />
        </div>
      </div>

      {(trend || context) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend && (
            <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              ↑ {trend}
            </span>
          )}
          {context && <span className="text-slate-400 font-medium ml-auto">{context}</span>}
        </div>
      )}
    </div>
  );
}
