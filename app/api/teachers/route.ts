import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Teacher from "@/models/Teacher";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await req.json();
  
  try {
    const newTeacher = await Teacher.create(body);
    return NextResponse.json({ success: true, data: newTeacher }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating teacher" }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const teachers = await Teacher.find();
  return NextResponse.json({ success: true, data: teachers });
}
