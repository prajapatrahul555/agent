"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExamSchema } from "@/lib/validators/exam";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ExamForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ExamSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, subjects: data.subjects.split(",") }),
    });

    if (res.ok) {
      toast.success("Exam created successfully");
      router.push("/dashboard/admin/exams");
      router.refresh();
    } else {
      toast.error("Failed to create exam");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <input {...register("name")} placeholder="Exam Name" className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
      </div>
      <div>
        <input {...register("classId")} placeholder="Class ID" className="w-full p-2 border rounded" />
        {errors.classId && <p className="text-red-500">{errors.classId.message as string}</p>}
      </div>
      <div>
        <input {...register("subjects")} placeholder="Subjects (comma separated)" className="w-full p-2 border rounded" />
        {errors.subjects && <p className="text-red-500">{errors.subjects.message as string}</p>}
      </div>
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Create Exam</button>
    </form>
  );
}
