"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementSchema } from "@/lib/validators/announcement";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Megaphone, Users, MessageSquare, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AnnouncementForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      targetRole: "All",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success("Announcement posted successfully!");
        router.push("/dashboard/admin/announcements");
        router.refresh();
      } else {
        toast.error(resData.message || "Failed to post announcement");
      }
    } catch (err) {
      toast.error("Error submitting announcement");
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs max-w-lg mx-auto font-sans">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-display">Post Announcement</h2>
          <p className="text-xs text-slate-500 mt-0.5">Broadcast an official notice to campus members.</p>
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
          <label htmlFor="ann-title" className="block text-xs font-semibold text-slate-700 mb-1">
            Notice Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Megaphone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="ann-title"
              {...register("title")}
              placeholder="e.g. Annual Sports Day Schedule"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            />
          </div>
          {errors.title && (
            <p className="text-rose-600 text-xs font-medium mt-1">{errors.title.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor="ann-targetRole" className="block text-xs font-semibold text-slate-700 mb-1">
            Target Audience <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Users className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              id="ann-targetRole"
              {...register("targetRole")}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
            >
              {["Admin", "Teacher", "Student", "Parent", "All"].map((role) => (
                <option key={role} value={role}>
                  {role === "All" ? "All School Personnel" : `${role}s Only`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="ann-message" className="block text-xs font-semibold text-slate-700 mb-1">
            Announcement Body <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none font-sans" />
            <textarea
              id="ann-message"
              {...register("message")}
              placeholder="Write the full announcement message here..."
              rows={4}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all font-sans"
            />
          </div>
          {errors.message && (
            <p className="text-rose-600 text-xs font-medium mt-1">{errors.message.message as string}</p>
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
            {isSubmitting ? "Posting..." : "Broadcast Notice"}
          </Button>
        </div>
      </form>
    </div>
  );
}
