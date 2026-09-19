"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/lib/validators/settings";
import { toast } from "sonner";

export default function SettingsForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: { schoolName: "My School", academicYear: "2026-2027", theme: "light" }
  });

  const onSubmit = async (data: any) => {
    // In a real app, send this to /api/settings or a user profile API
    console.log(data);
    toast.success("Settings updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg bg-white p-6 rounded shadow">
      <div>
        <label className="block mb-1">School Name</label>
        <input {...register("schoolName")} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block mb-1">Academic Year</label>
        <input {...register("academicYear")} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">Save Settings</button>
    </form>
  );
}
