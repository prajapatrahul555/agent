"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeeSchema } from "@/lib/validators/fee";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DollarSign, UserCheck, Calendar, Save, ArrowLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FeeForm() {
  const router = useRouter();
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FeeSchema),
    defaultValues: {
      status: "Pending",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: 1500,
    },
  });

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStudentsList(data.data);
      });

    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setClassesList(data.data);
      });
  }, []);

  const handleStudentSelect = (studentId: string) => {
    const selected = studentsList.find((s) => s._id === studentId);
    if (selected && selected.classId) {
      const classIdVal = typeof selected.classId === 'object' ? selected.classId._id : selected.classId;
      setValue("classId", classIdVal);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success("Fee record created successfully!");
        router.push("/dashboard/admin/fees");
        router.refresh();
      } else {
        toast.error(resData.message || "Failed to create fee record");
      }
    } catch (err) {
      toast.error("Error submitting fee form");
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs max-w-lg mx-auto font-sans">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-display">Record Student Fee</h2>
          <p className="text-xs text-slate-500 mt-0.5">Assign tuition fees and payment ledger entries.</p>
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
          <label htmlFor="fee-studentId" className="block text-xs font-semibold text-slate-700 mb-1">
            Select Student <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <UserCheck className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              id="fee-studentId"
              {...register("studentId")}
              onChange={(e) => {
                register("studentId").onChange(e);
                handleStudentSelect(e.target.value);
              }}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            >
              <option value="">Select Student</option>
              {studentsList.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.userId?.name || s.rollNumber} ({s.rollNumber})
                </option>
              ))}
            </select>
          </div>
          {errors.studentId && (
            <p className="text-rose-600 text-xs font-medium mt-1">{errors.studentId.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor="fee-classId" className="block text-xs font-semibold text-slate-700 mb-1">
            Class <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Layers className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              id="fee-classId"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fee-amount" className="block text-xs font-semibold text-slate-700 mb-1">
              Fee Amount ($) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="fee-amount"
                type="number"
                {...register("amount")}
                placeholder="1500"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all font-mono"
              />
            </div>
            {errors.amount && (
              <p className="text-rose-600 text-xs font-medium mt-1">{errors.amount.message as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="fee-dueDate" className="block text-xs font-semibold text-slate-700 mb-1">
              Due Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="fee-dueDate"
                type="date"
                {...register("dueDate")}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
            {errors.dueDate && (
              <p className="text-rose-600 text-xs font-medium mt-1">{errors.dueDate.message as string}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="fee-status" className="block text-xs font-semibold text-slate-700 mb-1">
            Payment Status <span className="text-rose-500">*</span>
          </label>
          <select
            id="fee-status"
            {...register("status")}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
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
            {isSubmitting ? "Creating..." : "Save Fee Record"}
          </Button>
        </div>
      </form>
    </div>
  );
}
