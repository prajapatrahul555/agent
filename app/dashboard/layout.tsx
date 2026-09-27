import Sidebar from "@/components/layout/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#F8FAF9] font-sans antialiased text-slate-900">
      <Sidebar role={(session as any).user.role} />
      <main className="flex-1 w-full min-w-0 pt-14 lg:pt-0 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}

