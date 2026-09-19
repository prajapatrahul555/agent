"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, Search, GraduationCap } from "lucide-react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/teachers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTeachers(data.data);
      });
  }, []);

  const filteredTeachers = teachers.filter((t: any) =>
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Teacher Management</h1>
          <p className="text-slate-500 mt-1">View, search, and manage faculty members.</p>
        </div>
        <Link
          href="/dashboard/admin/teachers/new"
          className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Teacher</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by teacher name or employee ID..."
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
                <th className="py-4 px-6">Employee ID</th>
                <th className="py-4 px-6">Teacher Name</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((t: any) => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">{t.employeeId}</td>
                    <td className="py-4 px-6 font-medium text-slate-900 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                        {t.name?.charAt(0) || "T"}
                      </div>
                      <span>{t.name}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                        Active Faculty
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-400">
                    <GraduationCap className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">No teachers found</p>
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

