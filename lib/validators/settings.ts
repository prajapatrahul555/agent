import { z } from "zod";

export const SettingsSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  academicYear: z.string().min(1, "Academic year is required"),
  theme: z.enum(['light', 'dark']).default('light'),
});
