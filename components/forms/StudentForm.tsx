"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentSchema } from "@/lib/validators/student";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function StudentForm({ defaultValues }: { defaultValues?: any }) {
  const router = useRouter();
  const formRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(StudentSchema),
    defaultValues
  });

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const onSubmit = async (data: any) => {
    const url = defaultValues ? `/api/students/${defaultValues._id}` : "/api/students";
    const method = defaultValues ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success(defaultValues ? "Student updated" : "Student created");
      router.push("/dashboard/admin/students");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">{defaultValues ? "Edit Student" : "Add Student"}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
        </div>
        <div>
          <input {...register("rollNumber")} placeholder="Roll Number" className="w-full p-2 border rounded" />
          {errors.rollNumber && <p className="text-red-500 text-sm">{errors.rollNumber.message as string}</p>}
        </div>
        <div>
          <input {...register("age")} placeholder="Age" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register("fatherName")} placeholder="Father Name" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register("motherName")} placeholder="Mother Name" className="w-full p-2 border rounded" />
        </div>
        <div>
          <input {...register("dob")} type="date" className="w-full p-2 border rounded" />
        </div>
        <div className="col-span-2">
          <textarea {...register("authorInformation")} placeholder="Author Information" className="w-full p-2 border rounded" rows={3} />
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition">
        {defaultValues ? "Update" : "Create"}
      </button>
    </form>
  );
}
