import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Attendance from "@/models/Attendance";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { AttendanceSchema } from "@/lib/validators/attendance";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session as any).user?.role !== "Teacher") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();
  const body = await req.json();

  try {
    const validatedData = AttendanceSchema.parse(body);
    const record = await Attendance.create({ 
      ...validatedData, 
      markedBy: (session as any).user?.id, 
      date: new Date(validatedData.date) 
    });
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error marking attendance" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("classId");
  const date = searchParams.get("date");

  const query: any = {};
  if (classId) query.classId = classId;
  if (date) query.date = new Date(date);

  const attendance = await Attendance.find(query).populate("studentId", "name rollNumber");
  return NextResponse.json({ success: true, data: attendance });
}
