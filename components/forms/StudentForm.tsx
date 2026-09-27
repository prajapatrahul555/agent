"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentSchema } from "@/lib/validators/student";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { User, Mail, Lock, Hash, Calendar, FileText, ArrowLeft, Save, Layers, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function StudentForm({ defaultValues }: { defaultValues?: any }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [classesList, setClassesList] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(StudentSchema),
    defaultValues: defaultValues ? {
      name: defaultValues.userId?.name || defaultValues.name || "",
      email: defaultValues.userId?.email || defaultValues.email || "",
      rollNumber: defaultValues.rollNumber || "",
      classId: typeof defaultValues.classId === 'object' ? defaultValues.classId?._id : defaultValues.classId || "",
      sectionId: defaultValues.sectionId || "A",
      gender: defaultValues.gender || "Male",
      age: defaultValues.age || "",
      dob: defaultValues.dob ? new Date(defaultValues.dob).toISOString().split('T')[0] : "",
      fatherName: defaultValues.fatherName || "",
      motherName: defaultValues.motherName || "",
      guardianName: defaultValues.guardianName || "",
      guardianContact: defaultValues.guardianContact || "",
      address: defaultValues.address || "",
      bloodGroup: defaultValues.bloodGroup || "O+",
      authorInformation: defaultValues.authorInformation || "",
    } : {
      sectionId: "A",
      gender: "Male",
      bloodGroup: "O+",
    },
  });

  useEffect(() => {
    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setClassesList(data.data);
      })
      .catch(() => {});

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const onSubmit = async (data: any) => {
    const url = defaultValues ? `/api/students/${defaultValues._id}` : "/api/students";
    const method = defaultValues ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success(defaultValues ? "Student updated successfully" : "Student registered successfully!");
        router.push("/dashboard/admin/students");
        router.refresh();
      } else {
        toast.error(resData.message || "Failed to save student");
      }
    } catch (err: any) {
      toast.error("Error submitting form");
    }
  };

  return (
    <div ref={formRef} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto font-sans">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-display">
            {defaultValues ? "Edit Student Profile" : "Register New Student"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Fill out personal details, login credentials, and class assignment.</p>
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
        {/* Section 1: Basic & Login Credentials */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-lg w-fit">
            1. Personal & Login Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="student-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="student-name"
                  {...register("name")}
                  placeholder="e.g. John Doe"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
                />
              </div>
              {errors.name && (
                <p className="text-rose-600 text-xs font-medium mt-1">{errors.name.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="student-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="student-email"
                  type="email"
                  {...register("email")}
                  placeholder="student85@sms.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-rose-600 text-xs font-medium mt-1">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="student-password" className="block text-xs font-semibold text-slate-700 mb-1">
                Password <span className="text-slate-400 font-normal">(Default: password123)</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="student-password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="student-rollNumber" className="block text-xs font-semibold text-slate-700 mb-1">
                Roll Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="student-rollNumber"
                  {...register("rollNumber")}
                  placeholder="e.g. STU085"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all font-mono"
                />
              </div>
              {errors.rollNumber && (
                <p className="text-rose-600 text-xs font-medium mt-1">{errors.rollNumber.message as string}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Academic Assignment */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg w-fit">
            2. Class Assignment & Gender
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="student-classId" className="block text-xs font-semibold text-slate-700 mb-1">
                Class <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  id="student-classId"
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
              <label htmlFor="student-sectionId" className="block text-xs font-semibold text-slate-700 mb-1">
                Section <span className="text-rose-500">*</span>
              </label>
              <select
                id="student-sectionId"
                {...register("sectionId")}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div>
              <label htmlFor="student-gender" className="block text-xs font-semibold text-slate-700 mb-1">
                Gender <span className="text-rose-500">*</span>
              </label>
              <select
                id="student-gender"
                {...register("gender")}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Guardian Details */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg w-fit">
            3. Guardian Contacts & Personal Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="student-fatherName" className="block text-xs font-semibold text-slate-700 mb-1">Father's Name</label>
              <input
                id="student-fatherName"
                {...register("fatherName")}
                placeholder="Father's full name"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="student-motherName" className="block text-xs font-semibold text-slate-700 mb-1">Mother's Name</label>
              <input
                id="student-motherName"
                {...register("motherName")}
                placeholder="Mother's full name"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="student-guardianContact" className="block text-xs font-semibold text-slate-700 mb-1">Guardian Phone Contact</label>
              <input
                id="student-guardianContact"
                {...register("guardianContact")}
                placeholder="+1-555-0199"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="student-dob" className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                id="student-dob"
                type="date"
                {...register("dob")}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
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
            {isSubmitting ? "Saving..." : defaultValues ? "Update Student" : "Register Student"}
          </Button>
        </div>
      </form>
    </div>
  );
}
