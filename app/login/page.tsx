"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { School, Lock, Mail, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);
    if (result?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful!");
      const session = await getSession();
      const role = session?.user?.role;
      if (role === "Teacher") {
        router.push("/dashboard/teacher");
      } else if (role === "Student") {
        router.push("/dashboard/student");
      } else if (role === "Parent") {
        router.push("/dashboard/parent");
      } else {
        router.push("/dashboard/admin");
      }
      router.refresh();
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Editorial background accent lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Warm ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-900/5 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-slate-900 rounded-2xl text-amber-400 shadow-md border border-slate-800 mb-4">
            <School className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">Welcome Back</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Sign in to EduFlow Institutional Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="login-email"
                type="email"
                placeholder="admin@sms.com"
                value={email}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:bg-white transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={isLoading}
            className="w-full mt-3"
            icon={isLoading ? undefined : ArrowRight}
          >
            {isLoading ? "Signing in..." : "Sign In to Portal"}
          </Button>
        </form>

        {/* Demo Quick Fill Options */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Quick Fill Demo Accounts (Password: password123)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@sms.com")}
              className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-lg text-xs font-medium text-center transition cursor-pointer"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("teacher1@sms.com")}
              className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-lg text-xs font-medium text-center transition cursor-pointer"
            >
              Teacher 1
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("student1@sms.com")}
              className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-medium text-center transition cursor-pointer"
            >
              Student 1
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5 text-amber-700" />
          <span>Protected institutional environment. Authorized access only.</span>
        </div>
      </div>
    </div>
  );
}
