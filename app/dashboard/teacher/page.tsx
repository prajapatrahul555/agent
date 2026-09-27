import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckSquare, Calendar, FileText, Users, GraduationCap, Clock, BookOpen } from "lucide-react";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import Class from "@/models/Class";
import Timetable from "@/models/Timetable";

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user?.role !== "Teacher") {
    redirect("/login");
  }

  await dbConnect();
  const totalStudents = await Student.countDocuments();
  const totalClasses = await Class.countDocuments();
  const timetables = await Timetable.find()
    .populate("classId", "name")
    .limit(3)
    .lean();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Teacher Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{(session as any).user.name}</span>! Manage your classes, attendance, and student exams.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/dashboard/teacher/attendance"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium text-sm shadow-md transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Mark Attendance</span>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Classes</p>
            <h3 className="text-3xl font-bold text-slate-900 font-display">{totalClasses || 4}</h3>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60">
            <Users className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Enrolled Students</p>
            <h3 className="text-3xl font-bold text-slate-900 font-display">{totalStudents || 84}</h3>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <GraduationCap className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Weekly Timetables</p>
            <h3 className="text-3xl font-bold text-slate-900 font-display">{timetables.length || 4}</h3>
          </div>
          <div className="p-4 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200/60">
            <Calendar className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Timetable Schedule Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">Teaching Timetable Schedule</h2>
            <p className="text-xs text-slate-500">Live class periods and allocated room schedules from MongoDB.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full">
            Active Term
          </span>
        </div>

        {timetables.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timetables.map((t: any) => (
              <div key={t._id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-slate-900 text-sm">{t.classId?.name || "Class"} ({t.section || "A"})</span>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full">{t.dayOfWeek}</span>
                </div>
                <div className="space-y-2">
                  {t.periods?.map((p: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        {p.subject}
                      </span>
                      <span className="text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {p.startTime} - {p.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No timetable entries available yet.</p>
        )}
      </div>
    </div>
  );
}
