"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AttendanceSchema } from "@/lib/validators/attendance";
import { toast } from "sonner";

export default function AttendanceForm({ studentId, classId }: { studentId: string, classId: string }) {
  const { register, handleSubmit } = useForm<any>({
    resolver: zodResolver(AttendanceSchema),
    defaultValues: { studentId, classId, date: new Date().toISOString().split('T')[0], status: "Present" }
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) toast.success("Attendance marked");
    else toast.error("Failed");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <select {...register("status")} className="p-1 border rounded">
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
        <option value="Leave">Leave</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-2 rounded">Mark</button>
    </form>
  );
}
