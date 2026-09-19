"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimetableSchema } from "@/lib/validators/timetable";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TimetableForm() {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(TimetableSchema),
    defaultValues: {
        periods: [{ subject: "", teacherId: "", startTime: "", endTime: "" }]
    }
  });

  const { fields, append } = useFieldArray({ control, name: "periods" });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Timetable created successfully");
      router.push("/dashboard/admin/timetable");
      router.refresh();
    } else {
      toast.error("Failed to create timetable");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <input {...register("classId")} placeholder="Class ID" className="w-full p-2 border rounded" />
      <input {...register("section")} placeholder="Section" className="w-full p-2 border rounded" />
      <select {...register("dayOfWeek")} className="w-full p-2 border rounded">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => <option key={day} value={day}>{day}</option>)}
      </select>
      
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2 p-2 border rounded">
            <input {...register(`periods.${index}.subject`)} placeholder="Subject" className="w-full p-2 border rounded" />
            <input {...register(`periods.${index}.teacherId`)} placeholder="Teacher ID" className="w-full p-2 border rounded" />
            <div className="flex gap-2">
                <input {...register(`periods.${index}.startTime`)} placeholder="Start Time" className="w-1/2 p-2 border rounded" />
                <input {...register(`periods.${index}.endTime`)} placeholder="End Time" className="w-1/2 p-2 border rounded" />
            </div>
        </div>
      ))}
      <button type="button" onClick={() => append({ subject: "", teacherId: "", startTime: "", endTime: "" })} className="text-sm text-blue-600">+ Add Period</button>
      <br/>
      <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">Create Timetable</button>
    </form>
  );
}
