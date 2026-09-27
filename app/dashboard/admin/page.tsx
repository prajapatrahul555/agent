import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { EnrollmentChart } from "@/components/charts/EnrollmentChart";
import AdminStats from "@/components/layout/AdminStats";
import Link from "next/link";
import { UserPlus, PlusCircle, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user?.role !== "Admin") {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Admin Overview"
        description={`Welcome back, ${(session as any).user.name}. Here is your real-time institutional overview.`}
        breadcrumbs={[{ label: "Overview" }]}
        action={
          <div className="flex items-center gap-2.5">
            <Link href="/dashboard/admin/students/new">
              <Button variant="gold" icon={<UserPlus className="w-4 h-4" />} size="md">
                Add Student
              </Button>
            </Link>
            <Link href="/dashboard/admin/teachers/new">
              <Button variant="outline" icon={<PlusCircle className="w-4 h-4" />} size="md">
                Add Teacher
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Stats Grid */}
      <AdminStats />

      {/* Analytics & Quick Links Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight font-display">
                Student Enrollment Metrics
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Monthly breakdown of newly registered admissions</p>
            </div>
            <span className="px-3 py-1 bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold rounded-full">
              2026 Academic Year
            </span>
          </div>
          <EnrollmentChart />
        </div>

        {/* Quick Links Index Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 mb-1 font-display">Administrative Tools</h2>
            <p className="text-xs text-slate-500 mb-6">Frequently used management portals</p>

            <div className="space-y-3">
              <Link
                href="/dashboard/admin/fees"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-200 transition group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800">Fee Collection & Ledger</p>
                  <p className="text-[11px] text-slate-500">Track student tuition statuses</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/dashboard/admin/exams"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-200 transition group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800">Exam Schedules & Grades</p>
                  <p className="text-[11px] text-slate-500">Manage term assessments</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/dashboard/admin/announcements"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-200 transition group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800">School Notices & Broadcasts</p>
                  <p className="text-[11px] text-slate-500">Post announcements to campus</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>EduFlow Platform v2.5</span>
            <span className="font-semibold text-emerald-700">● Systems Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}


