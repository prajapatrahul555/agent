import { z } from "zod";

export const FeeSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  classId: z.string().min(1, "Class ID is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["Paid", "Pending", "Overdue"]).default("Pending"),
});
