import { z } from "zod";

export const MessageSchema = z.object({
  receiverId: z.string().min(1, "Receiver is required"),
  content: z.string().min(1, "Message content is required"),
});
