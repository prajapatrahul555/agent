import { z } from "zod";

export const AnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  targetRole: z.enum(['Admin', 'Teacher', 'Student', 'Parent', 'All']),
  classId: z.string().optional(),
});
