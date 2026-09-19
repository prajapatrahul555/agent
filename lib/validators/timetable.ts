import { z } from "zod";

export const TimetableSchema = z.object({
  classId: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  periods: z.array(z.object({
    subject: z.string(),
    teacherId: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  })),
});
