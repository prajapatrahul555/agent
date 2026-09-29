import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Calendar, BookOpen, User, Clock } from "lucide-react";
import dbConnect from "@/lib/db";
import Timetable from "@/models/Timetable";

export default async function StudentTimetablePage() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Student") redirect("/login");

  await dbConnect();
  const timetables = await Timetable.find()
    .populate("classId", "name")
    .populate({
      path: "periods.teacherId",
      populate: { path: "userId", select: "name" },
    })
    .lean();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto font-sans">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Calendar className="w-8 h-8 text-amber-500" /> Class Timetable
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Weekly schedule for your class — current semester</p>
      </div>

      {timetables.length > 0 ? (
        <div className="space-y-6">
          {timetables.map((t: any) => (
            <div key={t._id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Day Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-900">{t.dayOfWeek}</span>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  {t.classId?.name || "Class"} — {t.section || "A"}
                </span>
              </div>

              {/* Periods */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {t.periods?.length > 0 ? (
                  t.periods.map((p: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/60 hover:border-amber-200 transition-colors"
                    >
                      <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-sm">{p.subject}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <User className="w-3 h-3" />
                          {p.teacherId?.userId?.name || "Instructor Assigned"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {p.startTime} – {p.endTime}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 col-span-2 text-center py-4">No periods defined for this day.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No timetable entries available yet.</p>
          <p className="text-xs text-slate-400 mt-1">Check back soon — your teacher will post the schedule shortly.</p>
        </div>
      )}
    </div>
  );
}
