"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema } from "@/lib/validators/message";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MessageForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Message sent");
      router.push("/dashboard/admin/messages");
      router.refresh();
    } else {
      toast.error("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <input {...register("receiverId")} placeholder="Receiver ID (User)" className="w-full p-2 border rounded" />
      <textarea {...register("content")} placeholder="Type your message here..." className="w-full p-2 border rounded" />
      <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Send Message</button>
    </form>
  );
}
