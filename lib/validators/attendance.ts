import { z } from "zod";

export const AttendanceSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  classId: z.string().min(1, "Class is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Present", "Absent", "Late", "Leave"]),
});
