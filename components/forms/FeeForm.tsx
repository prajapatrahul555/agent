"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeeSchema } from "@/lib/validators/fee";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FeeForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FeeSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Fee record created");
      router.push("/dashboard/admin/fees");
      router.refresh();
    } else {
      toast.error("Failed to create fee record");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <input {...register("studentId")} placeholder="Student ID (Mongo)" className="w-full p-2 border rounded" />
        {errors.studentId && <p className="text-red-500">{errors.studentId.message as string}</p>}
      </div>
      <div>
        <input {...register("amount")} type="number" placeholder="Amount" className="w-full p-2 border rounded" />
        {errors.amount && <p className="text-red-500">{errors.amount.message as string}</p>}
      </div>
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Create Record</button>
    </form>
  );
}
