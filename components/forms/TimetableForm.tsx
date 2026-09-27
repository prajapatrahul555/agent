"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimetableSchema } from "@/lib/validators/timetable";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Plus, Trash2, Save, ArrowLeft, Clock, Layers, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TimetableForm() {
  const router = useRouter();
  const [classesList, setClassesList] = useState<any[]>([]);
  const [teachersList, setTeachersList] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TimetableSchema),
    defaultValues: {
      section: "Section A",
      dayOfWeek: "Monday",
      periods: [{ subject: "Mathematics", teacherId: "", startTime: "09:00 AM", endTime: "10:00 AM" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "periods" });

  useEffect(() => {
    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setClassesList(data.data);
      });

    fetch("/api/teachers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTeachersList(data.data);
      });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success("Timetable entry created successfully!");
        router.push("/dashboard/admin/timetable");
        router.refresh();
      } else {
        toast.error(resData.message || "Failed to create timetable");
      }
    } catch (err) {
      toast.error("Error creating timetable");
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs max-w-xl mx-auto font-sans">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-display">Create Class Timetable</h2>
          <p className="text-xs text-slate-500 mt-0.5">Define weekly periods, subject slots, and assigned instructors.</p>
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tt-classId" className="block text-xs font-semibold text-slate-700 mb-1">
              Select Class <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                id="tt-classId"
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
            <label htmlFor="tt-section" className="block text-xs font-semibold text-slate-700 mb-1">
              Section <span className="text-rose-500">*</span>
            </label>
            <select
              id="tt-section"
              {...register("section")}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            >
              <option value="Section A">Section A</option>
              <option value="Section B">Section B</option>
              <option value="Section C">Section C</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="tt-dayOfWeek" className="block text-xs font-semibold text-slate-700 mb-1">
            Day of Week <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              id="tt-dayOfWeek"
              {...register("dayOfWeek")}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Periods Dynamic Section */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-lg">
              Class Periods & Schedule Slots
            </h3>
            <button
              type="button"
              onClick={() => append({ subject: "", teacherId: "", startTime: "10:00 AM", endTime: "11:00 AM" })}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100/60 border border-amber-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Period Slot
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Period #{index + 1}
                  </span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove period"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Subject</label>
                    <input
                      {...register(`periods.${index}.subject`)}
                      placeholder="e.g. Mathematics"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Assigned Teacher</label>
                    <select
                      {...register(`periods.${index}.teacherId`)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    >
                      <option value="">Select Teacher</option>
                      {teachersList.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.userId?.name || t.employeeId} ({t.subjects?.[0] || 'Teacher'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Start Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      <input
                        {...register(`periods.${index}.startTime`)}
                        placeholder="09:00 AM"
                        className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">End Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      <input
                        {...register(`periods.${index}.endTime`)}
                        placeholder="10:00 AM"
                        className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            {isSubmitting ? "Saving..." : "Save Timetable Entry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
