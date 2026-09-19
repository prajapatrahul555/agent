import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Fee from "@/models/Fee";
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
    const newFee = await Fee.create(body);
    return NextResponse.json({ success: true, data: newFee }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Error recording fee" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  await dbConnect();
  const fees = await Fee.find().populate("studentId", "name rollNumber");
  return NextResponse.json({ success: true, data: fees });
}
