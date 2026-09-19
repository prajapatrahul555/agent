import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Result from "@/models/Result";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Teacher") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();
  const body = await req.json();

  try {
    const newResult = await Result.create(body);
    return NextResponse.json({ success: true, data: newResult }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Error saving result" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const examId = searchParams.get("examId");
  const studentId = searchParams.get("studentId");

  const query: any = {};
  if (examId) query.examId = examId;
  if (studentId) query.studentId = studentId;

  const results = await Result.find(query)
    .populate("studentId", "name rollNumber")
    .populate("subjectId", "name");
  return NextResponse.json({ success: true, data: results });
}
