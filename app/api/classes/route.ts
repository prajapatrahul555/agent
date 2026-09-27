import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Class from "@/models/Class";

export async function GET() {
  try {
    await dbConnect();
    const classes = await Class.find().sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: classes });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch classes" }, { status: 500 });
  }
}
