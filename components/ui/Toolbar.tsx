"use client";

import React from "react";
import { Search } from "lucide-react";
import { clsx } from "clsx";

interface ToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Toolbar({
  searchValue,
  onSearchChange,
  placeholder = "Search...",
  children,
  className,
}: ToolbarProps) {
  return (
    <div
      className={clsx(
        "p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3",
        className
      )}
    >
      <div className="relative w-full sm:w-80 md:w-96">
        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
        />
      </div>

      {children && <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">{children}</div>}
    </div>
  );
}
