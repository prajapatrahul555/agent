"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, FileText } from "lucide-react";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setExams(data.data);
      });
  }, []);

  const filteredExams = exams.filter((e: any) =>
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.academicYear?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Examination Management</h1>
          <p className="text-slate-500 mt-1">Schedule and manage school exams and grading terms.</p>
        </div>
        <Link
          href="/dashboard/admin/exams/new"
          className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Schedule New Exam</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by exam name or academic year..."
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
                <th className="py-4 px-6">Exam Name</th>
                <th className="py-4 px-6">Class</th>
                <th className="py-4 px-6 text-right">Academic Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredExams.length > 0 ? (
                filteredExams.map((e: any) => (
                  <tr key={e._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span>{e.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                        {e.classId?.name || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-slate-600">
                      {e.academicYear}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-400">
                    <FileText className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">No exams found</p>
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

