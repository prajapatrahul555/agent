import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await req.json();
  
  try {
    const message = await Message.create({ ...body, senderId: (session as any).user?.id });
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error sending message" }, { status: 400 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  await dbConnect();
  const messages = await Message.find({
    $or: [{ senderId: (session as any).user?.id }, { receiverId: (session as any).user?.id }]
  }).sort({ timestamp: -1 });
  
  return NextResponse.json({ success: true, data: messages });
}
