"use client";

import React from "react";
import { clsx } from "clsx";

interface SkeletonLoaderProps {
  type?: "table" | "cards" | "form";
  rows?: number;
  className?: string;
}

export function SkeletonLoader({ type = "table", rows = 4, className }: SkeletonLoaderProps) {
  if (type === "cards") {
    return (
      <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs animate-pulse h-32 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="w-20 h-3 bg-slate-200 rounded" />
                <div className="w-28 h-7 bg-slate-200 rounded" />
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-xl" />
            </div>
            <div className="w-36 h-3 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={clsx("bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs animate-pulse", className)}>
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
        <div className="w-24 h-4 bg-slate-200 rounded" />
        <div className="w-32 h-4 bg-slate-200 rounded" />
        <div className="w-20 h-4 bg-slate-200 rounded" />
      </div>
      <div className="divide-y divide-slate-100 p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200" />
              <div className="space-y-1.5">
                <div className="w-36 h-4 bg-slate-200 rounded" />
                <div className="w-20 h-3 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="w-16 h-6 bg-slate-100 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
