"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CheckSquare,
  DollarSign,
  FileText,
  Calendar,
  Megaphone,
  Settings,
  LogOut,
  School,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const baseRole = role ? role.toLowerCase() : "admin";

  const links = [
    { label: "Overview", href: `/dashboard/${baseRole}`, icon: LayoutDashboard },
    { label: "Students", href: "/dashboard/admin/students", icon: Users },
    { label: "Teachers", href: "/dashboard/admin/teachers", icon: GraduationCap },
    { label: "Attendance", href: "/dashboard/teacher/attendance", icon: CheckSquare },
    { label: "Fees & Ledger", href: "/dashboard/admin/fees", icon: DollarSign },
    { label: "Exams & Grades", href: "/dashboard/admin/exams", icon: FileText },
    { label: "Timetable", href: "/dashboard/admin/timetable", icon: Calendar },
    { label: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 shadow-2xl">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight font-display">EduFlow SMS</h1>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              {role} Portal
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-1"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Academic Navigation
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`relative flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? "bg-slate-800 text-amber-300 font-bold shadow-xs border border-slate-700/60"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              {/* Left Accent Bar for Active State */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-amber-500 rounded-r-full shadow-xs" />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? "text-amber-400" : "text-slate-400 group-hover:text-amber-300"
                }`}
              />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Sign Out */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Bar Trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-40">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
            <School className="w-4 h-4" />
          </div>
          <span className="text-sm font-extrabold text-white font-display">EduFlow SMS</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 border border-slate-700"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-xs h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}


