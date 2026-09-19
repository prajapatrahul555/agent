import { z } from "zod";

export const ExamSchema = z.object({
  name: z.string().min(1, "Exam name is required"),
  classId: z.string().min(1, "Class is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  examDate: z.string().min(1, "Date is required"),
  term: z.string().min(1, "Term is required"),
  academicYear: z.string().min(1, "Academic year is required"),
});
