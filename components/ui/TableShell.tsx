"use client";

import React from "react";
import { clsx } from "clsx";

interface TableShellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableShell({ children, className }: TableShellProps) {
  return (
    <div className={clsx("bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">{children}</table>
      </div>
    </div>
  );
}

export function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <thead className={clsx("bg-slate-50/80 border-b border-slate-200/80 sticky top-0 backdrop-blur-xs z-10", className)}>
      {children}
    </thead>
  );
}

export function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={clsx("py-3.5 px-5 text-slate-600 text-xs uppercase font-bold tracking-wider select-none", className)}>
      {children}
    </th>
  );
}

export function TableBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tbody className={clsx("divide-y divide-slate-100 text-sm text-slate-700 font-normal", className)}>{children}</tbody>;
}

export function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <tr className={clsx("hover:bg-slate-50/80 transition-colors duration-150 group", className)}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={clsx("py-3.5 px-5 align-middle", className)}>{children}</td>;
}
