import Link from "next/link";
import { School, ArrowRight, ShieldCheck, Users, GraduationCap, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/80 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <School className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">EduFlow SMS</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-7xl mx-auto px-6 py-20 text-center relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Next-Generation School Management System</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mb-6 leading-tight">
          Modernizing Education Management for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Administrators, Teachers & Students</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mb-10">
          Streamline student admissions, attendance tracking, fee collection, grade management, and multi-role portals in one unified platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold text-base shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-3"
          >
            <span>Access Portal</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard/admin"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-2xl font-semibold text-base transition-all flex items-center justify-center"
          >
            Admin Dashboard
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="p-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Student & Teacher Management</h3>
            <p className="text-sm text-slate-400">Comprehensive student records, roll numbers, class assignments, and teacher profiles.</p>
          </div>

          <div className="p-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multi-Role Access Portals</h3>
            <p className="text-sm text-slate-400">Dedicated secure portals tailored specifically for Admins, Teachers, Students, and Parents.</p>
          </div>

          <div className="p-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl">
            <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl w-fit mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Analytics & Finance</h3>
            <p className="text-sm text-slate-400">Real-time enrollment trends, fee collection analytics, attendance monitoring, and exam schedules.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-800/80 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 EduFlow School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
