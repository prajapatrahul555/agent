"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { School, Lock, Mail, ArrowRight } from "lucide-react";

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
      router.push("/dashboard/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30 mb-4">
            <School className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to EduFlow School Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="admin@school.com"
                value={email}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            <span>{isLoading ? "Signing in..." : "Sign In to Portal"}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-500">
            Protected school management environment. Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}

