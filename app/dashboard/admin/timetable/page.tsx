"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Calendar, Clock, User, Layers, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toolbar } from "@/components/ui/Toolbar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/Button";

export default function TimetablePage() {
  const [timetables, setTimetables] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTimetables(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTimetables = timetables.filter(
    (t: any) =>
      t.dayOfWeek?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.classId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.section?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <PageHeader
        title="Timetable & Class Schedules"
        description="Organize weekly class periods, subjects, and period allocations for all grades."
        breadcrumbs={[{ label: "Timetable" }]}
        action={
          <Link href="/dashboard/admin/timetable/new">
            <Button variant="gold" icon={<PlusCircle className="w-4 h-4" />}>
              Create Timetable
            </Button>
          </Link>
        }
      />

      {/* Toolbar */}
      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by day of week, class, or section..."
      >
        <div className="text-xs text-slate-500 font-semibold px-2.5 py-1 bg-slate-100 rounded-lg">
          Schedules: <span className="text-slate-900 font-bold tabular-nums">{filteredTimetables.length}</span>
        </div>
      </Toolbar>

      {/* Timetable Cards Grid */}
      {loading ? (
        <SkeletonLoader type="cards" rows={4} />
      ) : filteredTimetables.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTimetables.map((t: any) => (
            <div
              key={t._id}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-amber-50 border border-amber-200/70 text-amber-800 rounded-xl">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 font-display">
                        {t.classId?.name || "Class"} — <span className="text-amber-800">{t.section || "Section A"}</span>
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" /> Day: <span className="font-semibold text-slate-700">{t.dayOfWeek}</span>
                      </p>
                    </div>
                  </div>
                  <Badge variant="gold">{t.periods?.length || 0} Periods</Badge>
                </div>

                {/* Periods Listing */}
                <div className="space-y-2.5">
                  {t.periods && t.periods.length > 0 ? (
                    t.periods.map((p: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900 block">{p.subject}</span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <User className="w-3 h-3 text-slate-400" />
                              {p.teacherId?.userId?.name || p.teacherId?.employeeId || "Instructor Assigned"}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {p.startTime} - {p.endTime}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No period slots added yet.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No timetables found"
          description={
            searchTerm
              ? `No schedule entries matched "${searchTerm}".`
              : "No class timetables have been created yet."
          }
          action={
            <Link href="/dashboard/admin/timetable/new">
              <Button variant="gold" size="sm" icon={<PlusCircle className="w-4 h-4" />}>
                Create Schedule
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
