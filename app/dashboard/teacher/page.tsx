import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckSquare, Calendar, FileText, Users, GraduationCap } from "lucide-react";

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user.role !== "Teacher") {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Teacher Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{(session as any).user.name}</span>! Manage your classes, attendance, and student exams.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/dashboard/teacher/attendance"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Mark Attendance</span>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Assigned Classes</p>
            <h3 className="text-3xl font-bold text-slate-900">4</h3>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
            <Users className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Students</p>
            <h3 className="text-3xl font-bold text-slate-900">120</h3>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
            <GraduationCap className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Exams Pending Grading</p>
            <h3 className="text-3xl font-bold text-slate-900">2</h3>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50 text-violet-600">
            <FileText className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Quick Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Attendance Management</h2>
          <p className="text-xs text-slate-500 mb-6">Quickly update daily student attendance records.</p>
          <Link
            href="/dashboard/teacher/attendance"
            className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 transition group"
          >
            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">Mark Today's Attendance</span>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">Open</span>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Class Schedule</h2>
          <p className="text-xs text-slate-500 mb-6">View your teaching timetable and room assignments.</p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Next Class: Mathematics (Grade 10-A)</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">10:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

