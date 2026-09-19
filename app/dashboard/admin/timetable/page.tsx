"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, Calendar } from "lucide-react";

export default function TimetablePage() {
  const [timetables, setTimetables] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTimetables(data.data);
      });
  }, []);

  const filteredTimetables = timetables.filter((t: any) =>
    t.dayOfWeek?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.classId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Timetable Management</h1>
          <p className="text-slate-500 mt-1">Organize and view class schedules and weekly periods.</p>
        </div>
        <Link
          href="/dashboard/admin/timetable/new"
          className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Timetable</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by day of week or class name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase font-semibold tracking-wider">
                <th className="py-4 px-6">Class</th>
                <th className="py-4 px-6">Day of Week</th>
                <th className="py-4 px-6 text-right">Periods</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredTimetables.length > 0 ? (
                filteredTimetables.map((t: any) => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span>{t.classId?.name || "N/A"}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                        {t.dayOfWeek}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-slate-600">
                      {t.periods?.length || 0} periods scheduled
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-400">
                    <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">No timetables found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

