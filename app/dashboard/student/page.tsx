import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { BookOpen, Award, CalendarCheck, Clock, User, Layers } from "lucide-react";
import dbConnect from "@/lib/db";
import Timetable from "@/models/Timetable";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user?.role !== "Student") {
    redirect("/login");
  }

  await dbConnect();
  const timetables = await Timetable.find()
    .populate("classId", "name")
    .populate({
      path: "periods.teacherId",
      populate: { path: "userId", select: "name" }
    })
    .limit(3)
    .lean();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Student Portal</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{(session as any).user.name}</span>! View your courses, schedule, and attendance.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Enrolled Subjects</p>
            <h3 className="text-3xl font-bold text-slate-900 font-display">5</h3>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Overall GPA</p>
            <h3 className="text-3xl font-bold text-slate-900 font-display">3.85</h3>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <Award className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Attendance Rate</p>
            <h3 className="text-3xl font-bold text-slate-900 font-display">96%</h3>
          </div>
          <div className="p-4 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200/60">
            <CalendarCheck className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Class Timetable Schedule */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">Class Timetable & Schedule</h2>
            <p className="text-xs text-slate-500">Live class periods from institutional database.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full">
            Semester Schedule
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
                      <div>
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                          {p.subject}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <User className="w-3 h-3 text-slate-400" />
                          {p.teacherId?.userId?.name || p.teacherId?.employeeId || "Instructor Assigned"}
                        </span>
                      </div>
                      <span className="text-slate-600 font-mono flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-400" /> {p.startTime} - {p.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center">
            No class timetable entries posted yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}
