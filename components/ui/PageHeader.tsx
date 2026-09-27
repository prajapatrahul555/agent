"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { clsx } from "clsx";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs = [],
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={clsx("mb-8 pb-6 border-b border-slate-200/80 flex flex-col md:flex-row md:items-end md:justify-between gap-4", className)}>
      <div>
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <li>
                <Link href="/dashboard/admin" className="hover:text-slate-700 transition-colors flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              {breadcrumbs.map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-slate-700 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-amber-700 font-semibold">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          {title}
        </h1>
        {description && <p className="text-sm text-slate-500 mt-1 max-w-2xl">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
