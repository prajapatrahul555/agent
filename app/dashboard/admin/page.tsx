import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { EnrollmentChart } from "@/components/charts/EnrollmentChart";
import AdminStats from "@/components/layout/AdminStats";
import Link from "next/link";
import { UserPlus, PlusCircle, FileSpreadsheet } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user?.role !== "Admin") {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Top Banner & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, <span className="font-semibold text-slate-700">{(session as any).user.name}</span>! Here is what's happening at your school today.</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Link
            href="/dashboard/admin/students/new"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </Link>
          <Link
            href="/dashboard/admin/teachers/new"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-medium text-sm shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            <span>Add Teacher</span>
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <AdminStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Student Enrollment Trends</h2>
              <p className="text-xs text-slate-500">Monthly breakdown of newly registered students</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">2026 Academic Year</span>
          </div>
          <EnrollmentChart />
        </div>

        {/* Quick Notices / Activity Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950 mb-1">Quick Links</h2>
            <p className="text-xs text-slate-500 mb-6">Frequently used management tools</p>
            
            <div className="space-y-3">
              <Link href="/dashboard/admin/fees" className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 transition group">
                <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">Fee Collection & Payments</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100 px-2.5 py-1 rounded-lg">Manage</span>
              </Link>
              <Link href="/dashboard/admin/exams" className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 transition group">
                <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">Exam Schedules & Grades</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100 px-2.5 py-1 rounded-lg">View</span>
              </Link>
              <Link href="/dashboard/admin/announcements" className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 transition group">
                <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">School Announcements</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100 px-2.5 py-1 rounded-lg">Post</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">EduFlow School Management v2.5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

