"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementSchema } from "@/lib/validators/announcement";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AnnouncementForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AnnouncementSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Announcement posted");
      router.push("/dashboard/admin/announcements");
      router.refresh();
    } else {
      toast.error("Failed to post announcement");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <input {...register("title")} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea {...register("message")} placeholder="Message" className="w-full p-2 border rounded" />
      <select {...register("targetRole")} className="w-full p-2 border rounded">
        {['Admin', 'Teacher', 'Student', 'Parent', 'All'].map(role => <option key={role} value={role}>{role}</option>)}
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Post Announcement</button>
    </form>
  );
}
