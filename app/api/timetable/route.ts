import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Timetable from "@/models/Timetable";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  
  try {
    const body = await req.json();
    
    // Clean up empty teacher IDs if provided as empty string
    if (body.periods && Array.isArray(body.periods)) {
      body.periods = body.periods.map((p: any) => ({
        ...p,
        teacherId: p.teacherId ? p.teacherId : undefined,
      }));
    }

    const timetable = await Timetable.create(body);
    return NextResponse.json({ success: true, data: timetable }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error creating timetable" }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const timetables = await Timetable.find()
      .populate("classId", "name")
      .populate({
        path: "periods.teacherId",
        populate: { path: "userId", select: "name" }
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: timetables });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error fetching timetables" }, { status: 500 });
  }
}
