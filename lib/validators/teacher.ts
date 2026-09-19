import { z } from "zod";

export const TeacherSchema = z.object({
  name: z.string().min(2, "Name is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  subjects: z.array(z.string()).min(1, "At least one subject required"),
  qualification: z.string().optional(),
  experience: z.string().optional(),
  salary: z.coerce.number().optional(),
});
