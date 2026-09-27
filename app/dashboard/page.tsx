import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = (session as any).user?.role;
  if (role === "Teacher") {
    redirect("/dashboard/teacher");
  } else if (role === "Student") {
    redirect("/dashboard/student");
  } else if (role === "Parent") {
    redirect("/dashboard/parent");
  } else {
    redirect("/dashboard/admin");
  }
}
