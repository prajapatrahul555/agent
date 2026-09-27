import { z } from "zod";

export const StudentSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().optional(),
  rollNumber: z.string().min(1, "Roll number is required"),
  classId: z.string().min(1, "Class is required"),
  sectionId: z.string().min(1, "Section is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  age: z.string().optional(),
  dob: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  address: z.string().optional(),
  bloodGroup: z.string().optional(),
  authorInformation: z.string().optional(),
});
