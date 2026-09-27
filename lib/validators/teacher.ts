import { z } from "zod";

export const TeacherSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().optional(),
  employeeId: z.string().min(1, "Employee ID is required"),
  subjects: z.string().min(1, "Subject is required"),
  qualification: z.string().optional(),
  experience: z.string().optional(),
  salary: z.coerce.number().optional(),
});
