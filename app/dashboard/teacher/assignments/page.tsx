"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar } from "lucide-react";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("/api/assignments")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAssignments(data.data);
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Assignments Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((a: any) => (
          <div key={a._id} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{a.title}</h3>
                <p className="text-sm text-slate-500">{a.classId?.name || "All Classes"}</p>
              </div>
            </div>
            <p className="text-slate-600 mb-4">{a.description}</p>
            <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Due: {new Date(a.dueDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
