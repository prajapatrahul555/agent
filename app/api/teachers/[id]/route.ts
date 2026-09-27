import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const teacher = await Teacher.findById(id).populate("userId", "name email");
    if (!teacher) return NextResponse.json({ success: false, message: "Teacher not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: teacher });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching teacher" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  try {
    const teacher = await Teacher.findById(id);
    if (teacher && teacher.userId) {
      await User.findByIdAndDelete(teacher.userId);
    }
    await Teacher.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Teacher deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error deleting teacher" }, { status: 400 });
  }
}
