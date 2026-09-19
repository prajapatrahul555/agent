import { z } from "zod";

export const StudentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  classId: z.string().min(1, "Class is required"),
  sectionId: z.string().min(1, "Section is required"),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  bloodGroup: z.string().optional(),
  age: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  authorInformation: z.string().optional(),
});
