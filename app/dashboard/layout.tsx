import Sidebar from "@/components/layout/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) return <>{children}</>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={(session as any).user.role} />
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
