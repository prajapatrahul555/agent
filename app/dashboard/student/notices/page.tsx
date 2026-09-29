import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Bell, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

const notices = [
  {
    type: "important",
    title: "Annual Examination Schedule Released",
    message:
      "The annual examination schedule for Class 10 has been released. Exams begin from November 15, 2024. Please collect your hall tickets from the office.",
    date: "2024-09-28",
  },
  {
    type: "info",
    title: "School Closed — Gandhi Jayanti",
    message:
      "The school will remain closed on October 2, 2024 (Wednesday) on account of Gandhi Jayanti. Classes resume on October 3.",
    date: "2024-09-25",
  },
  {
    type: "info",
    title: "Parent-Teacher Meeting",
    message:
      "A Parent-Teacher Meeting is scheduled for October 10, 2024 from 9:00 AM to 1:00 PM. All parents are requested to attend.",
    date: "2024-09-22",
  },
  {
    type: "important",
    title: "Sports Day Registration Open",
    message:
      "Registration for the Annual Sports Day is now open. Interested students must register with the Physical Education teacher by October 5, 2024.",
    date: "2024-09-20",
  },
  {
    type: "general",
    title: "Library Books Return Reminder",
    message:
      "All students are reminded to return borrowed library books by September 30, 2024. Late returns will incur a fine of ₹2 per day.",
    date: "2024-09-18",
  },
];

const noticeConfig: Record<string, { icon: any; bg: string; border: string; label: string; labelColor: string }> = {
  important: {
    icon: AlertTriangle,
    bg: "bg-rose-50",
    border: "border-rose-200",
    label: "Important",
    labelColor: "bg-rose-100 text-rose-700",
  },
  info: {
    icon: Info,
    bg: "bg-sky-50",
    border: "border-sky-200",
    label: "Information",
    labelColor: "bg-sky-100 text-sky-700",
  },
  general: {
    icon: CheckCircle2,
    bg: "bg-slate-50",
    border: "border-slate-200",
    label: "General",
    labelColor: "bg-slate-100 text-slate-600",
  },
};

export default async function NoticesPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Student") redirect("/login");

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto font-sans">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Bell className="w-8 h-8 text-amber-500" /> Notices
        </h1>
        <p className="text-slate-500 mt-1 text-sm">School announcements and important notices for students</p>
      </div>

      <div className="space-y-4">
        {notices.map((notice, idx) => {
          const cfg = noticeConfig[notice.type] || noticeConfig.general;
          const Icon = cfg.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl border p-5 shadow-sm ${cfg.bg} ${cfg.border}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl bg-white border ${cfg.border}`}>
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="font-bold text-slate-900">{notice.title}</h3>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${cfg.labelColor}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{notice.message}</p>
                  <p className="text-xs text-slate-400 font-medium mt-3">{notice.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
