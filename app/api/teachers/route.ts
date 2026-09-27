import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { TeacherSchema } from "@/lib/validators/teacher";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  
  try {
    const body = await req.json();
    const validatedData = TeacherSchema.parse(body);

    // Check existing email
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password || "password123", 10);

    // 1. Create User
    const userDoc = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: "Teacher",
      isActive: true,
    });

    // 2. Create Teacher profile
    const teacherDoc = await Teacher.create({
      userId: userDoc._id,
      employeeId: validatedData.employeeId,
      subjects: Array.isArray(validatedData.subjects) ? validatedData.subjects : [validatedData.subjects],
      qualification: validatedData.qualification || "M.Sc.",
      experience: validatedData.experience || "5 years",
      salary: validatedData.salary || 60000,
    });

    return NextResponse.json({ success: true, data: teacherDoc }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error creating teacher" }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const teachers = await Teacher.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: teachers });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error fetching teachers" }, { status: 500 });
  }
}
