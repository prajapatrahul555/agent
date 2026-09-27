import Link from "next/link";
import { School, ArrowRight, ShieldCheck, Users, GraduationCap, BarChart3, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Editorial subtle pattern lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Warm brass ambient glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-200/80 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-slate-900 rounded-xl text-amber-400 shadow-md shadow-slate-900/10 border border-slate-800">
            <School className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display block">EduFlow</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block">Academy Platform</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button variant="gold" icon={<ArrowRight className="w-4 h-4" />}>
              Sign In to Portal
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 text-center relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200/80 rounded-full text-amber-900 text-xs font-semibold mb-8 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Institutional Academic Management Suite</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mb-6 leading-[1.15] font-display">
          Elevating Academic Excellence through <span className="font-editorial italic font-normal text-amber-700">Intelligent Management</span>
        </h1>

        <p className="text-slate-600 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          Streamline admissions, attendance tracking, fee collection, gradebooks, and multi-portal academic operations in one modern editorial platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />} className="w-full">
              Access Institutional Portal
            </Button>
          </Link>
          <Link href="/dashboard/admin" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              Admin Overview
            </Button>
          </Link>
        </div>

        {/* Feature Cards Grid - Index Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all group">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl w-fit mb-5 border border-amber-200/60 group-hover:bg-amber-100/60 transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Student & Faculty Records</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Centralized academic profiles, class enrollments, teacher assignments, and contact directories.</p>
          </div>

          <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all group">
            <div className="p-3 bg-slate-100 text-slate-800 rounded-xl w-fit mb-5 border border-slate-200 group-hover:bg-slate-200/70 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Role-Tailored Portals</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Dedicated administrative, instructor, student, and guardian dashboards structured for clarity.</p>
          </div>

          <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all group">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit mb-5 border border-emerald-200/60 group-hover:bg-emerald-100/60 transition-colors">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Analytics & Financial Ledger</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Real-time enrollment trends, tuition status monitoring, attendance logs, and exam schedules.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200/80 text-center text-xs text-slate-500 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 EduFlow SMS Platform. Academic Systems Division.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="inline-flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Documentation</span>
          <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> WCAG AA Compliant</span>
        </div>
      </footer>
    </div>
  );
}

