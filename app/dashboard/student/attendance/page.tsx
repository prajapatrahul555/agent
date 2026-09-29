import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { CheckSquare, XCircle, Clock } from "lucide-react";

const attendanceData = [
  { month: "June 2024", present: 22, absent: 2, late: 1, total: 25 },
  { month: "July 2024", present: 24, absent: 1, late: 0, total: 25 },
  { month: "August 2024", present: 20, absent: 3, late: 2, total: 25 },
  { month: "September 2024", present: 23, absent: 1, late: 1, total: 25 },
  { month: "October 2024", present: 21, absent: 2, late: 2, total: 25 },
];

export default async function AttendancePage() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Student") redirect("/login");

  const totalPresent = attendanceData.reduce((s, m) => s + m.present, 0);
  const totalAbsent = attendanceData.reduce((s, m) => s + m.absent, 0);
  const totalDays = attendanceData.reduce((s, m) => s + m.total, 0);
  const overallPct = ((totalPresent / totalDays) * 100).toFixed(1);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto font-sans">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-amber-500" /> Attendance
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Monthly attendance record for the current academic year</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Days Present</p>
          <p className="text-3xl font-extrabold text-emerald-700">{totalPresent}</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center">
          <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">Days Absent</p>
          <p className="text-3xl font-extrabold text-rose-700">{totalAbsent}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Attendance %</p>
          <p className="text-3xl font-extrabold text-amber-700">{overallPct}%</p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Monthly Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left font-semibold">Month</th>
                <th className="px-6 py-3 text-center font-semibold">Present</th>
                <th className="px-6 py-3 text-center font-semibold">Absent</th>
                <th className="px-6 py-3 text-center font-semibold">Late</th>
                <th className="px-6 py-3 text-center font-semibold">Total Days</th>
                <th className="px-6 py-3 text-center font-semibold">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceData.map((row) => {
                const pct = ((row.present / row.total) * 100).toFixed(0);
                return (
                  <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{row.month}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-emerald-600 font-bold">
                        <CheckSquare className="w-3.5 h-3.5" /> {row.present}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-rose-600 font-bold">
                        <XCircle className="w-3.5 h-3.5" /> {row.absent}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-amber-600 font-bold">
                        <Clock className="w-3.5 h-3.5" /> {row.late}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 font-medium">{row.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        Number(pct) >= 90 ? "bg-emerald-100 text-emerald-700" :
                        Number(pct) >= 75 ? "bg-amber-100 text-amber-700" :
                        "bg-rose-100 text-rose-700"
                      }`}>
                        {pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
