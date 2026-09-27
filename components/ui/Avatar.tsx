"use client";

import React from "react";
import { clsx } from "clsx";

interface AvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ name = "User", size = "md", className }: AvatarProps) {
  const getInitials = (str: string) => {
    if (!str) return "U";
    const parts = str.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const getHashColor = (str: string) => {
    const colors = [
      "bg-amber-100 text-amber-800 border-amber-300",
      "bg-slate-100 text-slate-800 border-slate-300",
      "bg-emerald-100 text-emerald-800 border-emerald-300",
      "bg-indigo-100 text-indigo-800 border-indigo-300",
      "bg-rose-100 text-rose-800 border-rose-300",
      "bg-cyan-100 text-cyan-800 border-cyan-300",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const sizes = {
    sm: "w-7 h-7 text-xs font-bold border",
    md: "w-9 h-9 text-xs font-extrabold border",
    lg: "w-12 h-12 text-sm font-extrabold border-2",
  };

  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center shrink-0 tracking-wider shadow-xs select-none",
        getHashColor(name),
        sizes[size],
        className
      )}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
