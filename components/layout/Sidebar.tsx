"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const baseRole = role ? role.toLowerCase() : "admin";

  const links = [
    { label: "Dashboard", href: `/dashboard/${baseRole}`, icon: LayoutDashboard },
    { label: "Students", href: "/dashboard/admin/students", icon: Users },
    { label: "Teachers", href: "/dashboard/admin/teachers", icon: GraduationCap },
    { label: "Attendance", href: "/dashboard/teacher/attendance", icon: CheckSquare },
    { label: "Fees & Finance", href: "/dashboard/admin/fees", icon: DollarSign },
    { label: "Exams & Grades", href: "/dashboard/admin/exams", icon: FileText },
    { label: "Timetable", href: "/dashboard/admin/timetable", icon: Calendar },
    { label: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800 shadow-xl">
      {/* Brand Header */}
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800 bg-slate-950/50">
        <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
          <School className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide">EduFlow SMS</h1>
          <p className="text-xs text-slate-400 font-medium capitalize">{role} Portal</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Main Menu
        </p>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                  : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

