import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  try {
    const student = await Student.findById(id).populate("userId", "name email");
    if (!student) return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching student" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating student" }, { status: 400 });
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
    const student = await Student.findById(id);
    if (student && student.userId) {
      await User.findByIdAndDelete(student.userId);
    }
    await Student.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting student" }, { status: 400 });
  }
}
