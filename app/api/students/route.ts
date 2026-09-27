import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import User from "@/models/User";
import Class from "@/models/Class";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { StudentSchema } from "@/lib/validators/student";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user?.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  
  try {
    const body = await req.json();
    const validatedData = StudentSchema.parse(body);

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password || "password123", 10);

    // 1. Create User Document
    const userDoc = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: "Student",
      isActive: true,
    });

    // 2. Create Student Profile Document
    const studentDoc = await Student.create({
      userId: userDoc._id,
      rollNumber: validatedData.rollNumber,
      classId: validatedData.classId,
      sectionId: validatedData.sectionId,
      gender: validatedData.gender,
      age: validatedData.age,
      dob: validatedData.dob ? new Date(validatedData.dob) : undefined,
      fatherName: validatedData.fatherName,
      motherName: validatedData.motherName,
      guardianName: validatedData.guardianName,
      guardianContact: validatedData.guardianContact,
      address: validatedData.address,
      bloodGroup: validatedData.bloodGroup,
      authorInformation: validatedData.authorInformation,
    });

    return NextResponse.json({ success: true, data: studentDoc }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error creating student" }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const students = await Student.find()
      .populate("userId", "name email")
      .populate("classId", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Error fetching students" }, { status: 500 });
  }
}
