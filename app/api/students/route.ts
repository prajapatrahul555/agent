import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { StudentSchema } from "@/lib/validators/student";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await req.json();
  
  try {
    const validatedData = StudentSchema.parse(body);
    const newStudent = await Student.create(validatedData);
    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error creating student" }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const students = await Student.find().populate("userId", "name email");
  return NextResponse.json({ success: true, data: students });
}

