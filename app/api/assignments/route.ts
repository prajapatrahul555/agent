import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Assignment from "@/models/Assignment";
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
    const newAssignment = await Assignment.create({
      ...body,
      teacherId: (session as any).user.id,
    });
    return NextResponse.json({ success: true, data: newAssignment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Error creating assignment" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  await dbConnect();
  const assignments = await Assignment.find().populate("classId", "name");
  return NextResponse.json({ success: true, data: assignments });
}
