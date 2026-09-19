import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Exam from "@/models/Exam";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();
  const body = await req.json();

  try {
    const newExam = await Exam.create(body);
    return NextResponse.json({ success: true, data: newExam }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Error creating exam" }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const exams = await Exam.find().populate("classId", "name");
  return NextResponse.json({ success: true, data: exams });
}
