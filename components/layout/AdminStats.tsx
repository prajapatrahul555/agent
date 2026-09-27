"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, DollarSign, CalendarCheck } from "lucide-react";
import { StatTile } from "@/components/ui/StatTile";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

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
    return <SkeletonLoader type="cards" rows={4} />;
  }

  const statItems = [
    {
      title: "Enrolled Students",
      value: stats.totalStudents ?? 0,
      icon: Users,
      trend: "+8.4%",
      context: "Active academic year",
      iconBg: "bg-amber-50 border-amber-200/60",
      iconColor: "text-amber-700",
    },
    {
      title: "Faculty Members",
      value: stats.totalTeachers ?? 0,
      icon: GraduationCap,
      context: "Across all departments",
      iconBg: "bg-slate-100 border-slate-200",
      iconColor: "text-slate-800",
    },
    {
      title: "Total Fee Collection",
      value: `$${(stats.totalRevenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      trend: "+12.1%",
      context: "YTD collected",
      iconBg: "bg-emerald-50 border-emerald-200/60",
      iconColor: "text-emerald-700",
    },
    {
      title: "Attendance Today",
      value: stats.todayAttendance ?? 0,
      icon: CalendarCheck,
      context: "Logged entries today",
      iconBg: "bg-sky-50 border-sky-200/60",
      iconColor: "text-sky-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {statItems.map((item, index) => (
        <StatTile
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
          trend={item.trend}
          context={item.context}
          iconBg={item.iconBg}
          iconColor={item.iconColor}
        />
      ))}
    </div>
  );
}


