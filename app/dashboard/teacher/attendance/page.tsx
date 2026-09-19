"use client";

import { useState } from "react";
import AttendanceForm from "@/components/forms/AttendanceForm";
import { toast } from "sonner";

// Mock data - in a real app, this would be fetched from the API
const students = [
  { id: "1", name: "Alice Student", rollNumber: "101" },
  { id: "2", name: "Bob Student", rollNumber: "102" },
];

export default function AttendancePage() {
  const [classId] = useState("class-1"); // Simplified

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Roll No</th>
              <th className="p-4">Name</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b last:border-b-0">
                <td className="p-4">{s.rollNumber}</td>
                <td className="p-4">{s.name}</td>
                <td className="p-4">
                  <AttendanceForm studentId={s.id} classId={classId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
