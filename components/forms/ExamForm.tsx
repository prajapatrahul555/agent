"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExamSchema } from "@/lib/validators/exam";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, BookOpen, Layers, Calendar, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ExamForm() {
  const router = useRouter();
  const [classesList, setClassesList] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ExamSchema),
    defaultValues: {
      term: "Term 1",
      academicYear: "2026",
      examDate: new Date().toISOString().split('T')[0],
      subjects: "Mathematics, Physics, Chemistry, English",
    },
  });

  useEffect(() => {
    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setClassesList(data.data);
      });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const subjectsArray = typeof data.subjects === 'string'
        ? data.subjects.split(",").map((s: string) => s.trim()).filter(Boolean)
        : data.subjects;

      const payload = {
        ...data,
        subjects: subjectsArray,
        examDate: data.examDate ? new Date(data.examDate) : new Date(),
      };

      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success("Exam schedule created successfully!");
        router.push("/dashboard/admin/exams");
        router.refresh();
      } else {
        toast.error(resData.message || "Failed to create exam");
      }
    } catch (err) {
      toast.error("Error creating exam schedule");
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs max-w-lg mx-auto font-sans">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-display">Schedule Examination</h2>
          <p className="text-xs text-slate-500 mt-0.5">Configure term test schedules and subjects.</p>
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
        <div>
          <label htmlFor="exam-name" className="block text-xs font-semibold text-slate-700 mb-1">
            Exam Title / Assessment Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="exam-name"
              {...register("name")}
              placeholder="e.g. Mid-Term Examination 2026"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>
          {errors.name && (
            <p className="text-rose-600 text-xs font-medium mt-1">{errors.name.message as string}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="exam-classId" className="block text-xs font-semibold text-slate-700 mb-1">
              Class Target <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="exam-classId"
                {...register("classId")}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              >
                <option value="">Select Class</option>
                {classesList.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.classId && (
              <p className="text-rose-600 text-xs font-medium mt-1">{errors.classId.message as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="exam-examDate" className="block text-xs font-semibold text-slate-700 mb-1">
              Exam Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="exam-examDate"
                type="date"
                {...register("examDate")}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="exam-subjects" className="block text-xs font-semibold text-slate-700 mb-1">
            Subjects (Comma Separated) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="exam-subjects"
              {...register("subjects")}
              placeholder="Mathematics, Physics, Chemistry, English"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>
          {errors.subjects && (
            <p className="text-rose-600 text-xs font-medium mt-1">{errors.subjects.message as string}</p>
          )}
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
            {isSubmitting ? "Creating..." : "Save Examination"}
          </Button>
        </div>
      </form>
    </div>
  );
}
