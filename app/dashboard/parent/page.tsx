import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Users, DollarSign, Award, Bell } from "lucide-react";

export default async function ParentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user.role !== "Parent") {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Parent Portal</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{(session as any).user.name}</span>! Track your child's academic progress and fee status.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Enrolled Children</p>
            <h3 className="text-3xl font-bold text-slate-900">1</h3>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
            <Users className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Fee Status</p>
            <h3 className="text-3xl font-bold text-emerald-600">Paid</h3>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
            <DollarSign className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Child's Attendance</p>
            <h3 className="text-3xl font-bold text-slate-900">98%</h3>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50 text-violet-600">
            <Award className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Child Information Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Child Academic Overview</h2>
        <p className="text-xs text-slate-500 mb-6">Current grades and recent notices.</p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Alex Doe (Grade 10-A)</h4>
            <p className="text-xs text-slate-500">Roll Number: 1045 • Standing: Excellent</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
            GPA: 3.90
          </span>
        </div>
      </div>
    </div>
  );
}

