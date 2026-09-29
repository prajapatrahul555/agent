import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Hash, School } from "lucide-react";

export default async function StudentInformationPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user?.role !== "Student") {
    redirect("/login");
  }

  const studentName = (session as any).user.name;
  const studentEmail = (session as any).user.email;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto font-sans">
      {/* Page Header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Information</h1>
        <p className="text-slate-500 mt-1 text-sm">Your personal and academic profile details.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden mb-6">
        {/* Header Banner */}
        <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-700 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-20 h-20 rounded-2xl bg-amber-500 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-3xl font-extrabold text-white">
                {studentName?.charAt(0)?.toUpperCase() || "S"}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-14 pb-6 px-8">
          <h2 className="text-2xl font-extrabold text-slate-900">{studentName}</h2>
          <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <School className="w-3 h-3" /> Student
          </span>
        </div>

        {/* Info Grid */}
        <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow icon={<Mail className="w-4 h-4 text-amber-600" />} label="Email Address" value={studentEmail} />
          <InfoRow icon={<Hash className="w-4 h-4 text-amber-600" />} label="Student ID" value="STU-2024-001" />
          <InfoRow icon={<BookOpen className="w-4 h-4 text-amber-600" />} label="Class / Section" value="Class 10 — Section A" />
          <InfoRow icon={<Calendar className="w-4 h-4 text-amber-600" />} label="Admission Year" value="2022" />
          <InfoRow icon={<Phone className="w-4 h-4 text-amber-600" />} label="Contact Number" value="+91 98765 43210" />
          <InfoRow icon={<MapPin className="w-4 h-4 text-amber-600" />} label="Address" value="123 School Lane, City" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "View Marksheet", href: "/dashboard/student/marksheet", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
          { label: "Attendance Record", href: "/dashboard/student/attendance", color: "bg-sky-50 border-sky-200 text-sky-800" },
          { label: "Homework", href: "/dashboard/student/homework", color: "bg-violet-50 border-violet-200 text-violet-800" },
          { label: "Timetable", href: "/dashboard/student/timetable", color: "bg-amber-50 border-amber-200 text-amber-800" },
          { label: "Notices", href: "/dashboard/student/notices", color: "bg-rose-50 border-rose-200 text-rose-800" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center justify-center py-3 px-4 rounded-2xl border font-semibold text-sm transition hover:opacity-80 ${item.color}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
      <div className="mt-0.5 p-2 bg-amber-50 rounded-lg border border-amber-100">{icon}</div>
      <div>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
