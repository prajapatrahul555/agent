import { z } from "zod";

export const ExamSchema = z.object({
  name: z.string().min(1, "Exam name is required"),
  classId: z.string().min(1, "Class is required"),
  subjects: z.string().min(1, "Subjects are required"),
  examDate: z.string().optional(),
  term: z.string().optional(),
  academicYear: z.string().optional(),
});
