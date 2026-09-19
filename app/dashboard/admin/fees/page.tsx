"use client";

import { useState, useEffect } from "react";
import { DollarSign, Search } from "lucide-react";

export default function FeesPage() {
  const [fees, setFees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/fees")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFees(data.data);
      });
  }, []);

  const filteredFees = fees.filter((f: any) =>
    f.studentId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Fee Management</h1>
          <p className="text-slate-500 mt-1">Track payments and handle fee statuses.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr className="text-xs uppercase text-slate-600 font-semibold">
              <th className="py-4 px-6">Student</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {filteredFees.map((f: any) => (
              <tr key={f._id} className="hover:bg-slate-50">
                <td className="py-4 px-6 font-semibold">{f.studentId?.name || "N/A"}</td>
                <td className="py-4 px-6">${f.amount}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${f.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
