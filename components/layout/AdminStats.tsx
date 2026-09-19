"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, DollarSign, CalendarCheck } from "lucide-react";

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      });
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  const statItems = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "bg-blue-500 text-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      icon: GraduationCap,
      color: "bg-emerald-500 text-emerald-500",
      lightColor: "bg-emerald-50",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "bg-violet-500 text-violet-500",
      lightColor: "bg-violet-50",
    },
    {
      title: "Attendance Today",
      value: stats.todayAttendance,
      icon: CalendarCheck,
      color: "bg-amber-500 text-amber-500",
      lightColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100/80 hover:shadow-md transition-all duration-300 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{item.title}</p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{item.value}</h3>
            </div>
            <div className={`p-4 rounded-2xl ${item.lightColor}`}>
              <Icon className={`w-7 h-7 ${item.color.split(" ")[1]}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

