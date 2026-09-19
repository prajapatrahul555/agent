import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { BookOpen, Award, CalendarCheck, Clock } from "lucide-react";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user.role !== "Student") {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Portal</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{(session as any).user.name}</span>! View your courses, grades, and attendance.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Enrolled Courses</p>
            <h3 className="text-3xl font-bold text-slate-900">6</h3>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Overall GPA</p>
            <h3 className="text-3xl font-bold text-slate-900">3.85</h3>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
            <Award className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Attendance Rate</p>
            <h3 className="text-3xl font-bold text-slate-900">96%</h3>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50 text-violet-600">
            <CalendarCheck className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Recent Courses / Timetable */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Today's Schedule</h2>
        <p className="text-xs text-slate-500 mb-6">Your classes for today.</p>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">Advanced Mathematics</h4>
              <p className="text-xs text-slate-500">Room 204 • Mr. Anderson</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 mr-1" /> 09:00 AM
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">Physics Laboratory</h4>
              <p className="text-xs text-slate-500">Science Wing • Dr. Roberts</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 mr-1" /> 11:00 AM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

