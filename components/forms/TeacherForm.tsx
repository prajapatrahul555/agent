"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherSchema } from "@/lib/validators/teacher";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TeacherForm({ defaultValues }: { defaultValues?: any }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(TeacherSchema),
    defaultValues
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Teacher added successfully");
      router.push("/dashboard/admin/teachers");
      router.refresh();
    } else {
      toast.error("Failed to add teacher");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <input {...register("name")} placeholder="Full Name" className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
      </div>
      <div>
        <input {...register("employeeId")} placeholder="Employee ID" className="w-full p-2 border rounded" />
        {errors.employeeId && <p className="text-red-500">{errors.employeeId.message as string}</p>}
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create Teacher</button>
    </form>
  );
}
