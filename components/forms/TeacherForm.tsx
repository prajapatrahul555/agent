"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherSchema } from "@/lib/validators/teacher";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, BadgeCheck, BookOpen, GraduationCap, DollarSign, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TeacherForm({ defaultValues }: { defaultValues?: any }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TeacherSchema),
    defaultValues: defaultValues ? {
      name: defaultValues.userId?.name || defaultValues.name || "",
      email: defaultValues.userId?.email || defaultValues.email || "",
      employeeId: defaultValues.employeeId || "",
      subjects: Array.isArray(defaultValues.subjects) ? defaultValues.subjects[0] : defaultValues.subjects || "",
      qualification: defaultValues.qualification || "",
      experience: defaultValues.experience || "",
      salary: defaultValues.salary || 60000,
    } : {},
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success("Teacher added successfully");
        router.push("/dashboard/admin/teachers");
        router.refresh();
      } else {
        toast.error(resData.message || "Failed to add teacher");
      }
    } catch (err) {
      toast.error("Error submitting teacher form");
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs max-w-xl mx-auto font-sans">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-display">
            {defaultValues ? "Edit Teacher" : "Add Faculty Member"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Register a new instructor into the school directory.</p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="teacher-name" className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="teacher-name"
                {...register("name")}
                placeholder="e.g. Dr. Sarah Jenkins"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
            {errors.name && (
              <p className="text-rose-600 text-xs font-medium mt-1">{errors.name.message as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="teacher-email" className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="teacher-email"
                type="email"
                {...register("email")}
                placeholder="teacher16@sms.com"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-rose-600 text-xs font-medium mt-1">{errors.email.message as string}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="teacher-password" className="block text-xs font-semibold text-slate-700 mb-1">
              Password <span className="text-slate-400 font-normal">(Default: password123)</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="teacher-password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="teacher-employeeId" className="block text-xs font-semibold text-slate-700 mb-1">
              Employee ID <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <BadgeCheck className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="teacher-employeeId"
                {...register("employeeId")}
                placeholder="e.g. EMP016"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all font-mono"
              />
            </div>
            {errors.employeeId && (
              <p className="text-rose-600 text-xs font-medium mt-1">{errors.employeeId.message as string}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="teacher-subjects" className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Subject <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="teacher-subjects"
                {...register("subjects")}
                placeholder="e.g. Mathematics"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
            {errors.subjects && (
              <p className="text-rose-600 text-xs font-medium mt-1">{errors.subjects.message as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="teacher-qualification" className="block text-xs font-semibold text-slate-700 mb-1">
              Qualification
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="teacher-qualification"
                {...register("qualification")}
                placeholder="e.g. Ph.D. Mathematics"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="teacher-experience" className="block text-xs font-semibold text-slate-700 mb-1">
              Experience
            </label>
            <input
              id="teacher-experience"
              {...register("experience")}
              placeholder="e.g. 8 years"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="teacher-salary" className="block text-xs font-semibold text-slate-700 mb-1">
              Monthly Salary ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="teacher-salary"
                type="number"
                {...register("salary")}
                placeholder="60000"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gold"
            disabled={isSubmitting}
            icon={<Save className="w-4 h-4" />}
          >
            {isSubmitting ? "Saving..." : "Create Teacher Record"}
          </Button>
        </div>
      </form>
    </div>
  );
}
