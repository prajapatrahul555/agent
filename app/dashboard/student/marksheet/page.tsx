import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { FileText, TrendingUp, Award, BookOpen } from "lucide-react";

const subjects = [
  { name: "Mathematics", marks: 88, total: 100, grade: "A" },
  { name: "Science", marks: 92, total: 100, grade: "A+" },
  { name: "English", marks: 76, total: 100, grade: "B+" },
  { name: "Social Studies", marks: 81, total: 100, grade: "A" },
  { name: "Hindi", marks: 85, total: 100, grade: "A" },
  { name: "Computer Science", marks: 95, total: 100, grade: "A+" },
];

export default async function MarksheetPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Student") redirect("/login");

  const total = subjects.reduce((s, sub) => s + sub.marks, 0);
  const maxTotal = subjects.reduce((s, sub) => s + sub.total, 0);
  const percentage = ((total / maxTotal) * 100).toFixed(1);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto font-sans">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <FileText className="w-8 h-8 text-amber-500" /> Marksheet
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Academic Examination Result — Class 10, Section A</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Marks</p>
          <p className="text-3xl font-extrabold text-slate-900">{total}/{maxTotal}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Percentage</p>
          <p className="text-3xl font-extrabold text-emerald-600">{percentage}%</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Overall Grade</p>
          <p className="text-3xl font-extrabold text-amber-600">A</p>
        </div>
      </div>

      {/* Marks Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <h2 className="font-bold text-slate-800">Subject-wise Marks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 text-left font-semibold">Subject</th>
                <th className="px-6 py-3 text-center font-semibold">Marks Obtained</th>
                <th className="px-6 py-3 text-center font-semibold">Out Of</th>
                <th className="px-6 py-3 text-center font-semibold">Grade</th>
                <th className="px-6 py-3 text-left font-semibold">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((sub) => {
                const pct = (sub.marks / sub.total) * 100;
                return (
                  <tr key={sub.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{sub.name}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-900">{sub.marks}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{sub.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        sub.grade === "A+" ? "bg-emerald-100 text-emerald-700" :
                        sub.grade === "A" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {sub.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-amber-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
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
