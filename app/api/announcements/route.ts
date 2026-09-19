import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Announcement from "@/models/Announcement";
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
    const newAnnouncement = await Announcement.create({
      ...body,
      createdBy: (session as any).user.id,
    });
    return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Error creating announcement" }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: announcements });
}
