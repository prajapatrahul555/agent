import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ClipboardList, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

const homeworkList = [
  {
    subject: "Mathematics",
    title: "Chapter 5 — Quadratic Equations",
    description: "Solve exercises 5.1 to 5.4. Show all working steps.",
    dueDate: "2024-10-05",
    status: "Pending",
  },
  {
    subject: "Science",
    title: "Lab Report — Chemical Reactions",
    description: "Write a detailed lab report on the experiment performed in class.",
    dueDate: "2024-10-03",
    status: "Submitted",
  },
  {
    subject: "English",
    title: "Essay — Environmental Awareness",
    description: "Write a 500-word essay on the importance of environmental conservation.",
    dueDate: "2024-10-07",
    status: "Pending",
  },
  {
    subject: "Social Studies",
    title: "Map Work — Indian States",
    description: "Mark all capital cities and rivers on the outline map of India.",
    dueDate: "2024-10-04",
    status: "Submitted",
  },
  {
    subject: "Computer Science",
    title: "Python Program — Fibonacci Series",
    description: "Write a Python program to print Fibonacci series up to n terms.",
    dueDate: "2024-10-08",
    status: "Pending",
  },
];

export default async function HomeworkPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Student") redirect("/login");

  const pending = homeworkList.filter((h) => h.status === "Pending").length;
  const submitted = homeworkList.filter((h) => h.status === "Submitted").length;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto font-sans">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-amber-500" /> Homework
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Pending and submitted assignments for all subjects</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-xl">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-extrabold text-amber-700">{pending}</p>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Submitted</p>
            <p className="text-3xl font-extrabold text-emerald-700">{submitted}</p>
          </div>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {homeworkList.map((hw, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl border p-5 shadow-sm flex items-start gap-4 ${
              hw.status === "Pending" ? "border-amber-200" : "border-emerald-200"
            }`}
          >
            <div className={`p-2.5 rounded-xl border ${
              hw.status === "Pending"
                ? "bg-amber-50 border-amber-100 text-amber-600"
                : "bg-emerald-50 border-emerald-100 text-emerald-600"
            }`}>
              {hw.status === "Pending" ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {hw.subject}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  hw.status === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                  {hw.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-1">{hw.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{hw.description}</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                Due: <span className="font-semibold text-slate-600">{hw.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
