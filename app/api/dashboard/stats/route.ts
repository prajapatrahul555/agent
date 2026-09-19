import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Fee from "@/models/Fee";
import Attendance from "@/models/Attendance";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  if (!session || session.user?.role !== "Admin") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalRevenue = await Fee.aggregate([{ $match: { status: 'Paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]);
    const todayAttendance = await Attendance.countDocuments({ date: { $gte: new Date().setHours(0,0,0,0) } });

    return NextResponse.json({ 
      success: true, 
      data: {
        totalStudents,
        totalTeachers,
        totalRevenue: totalRevenue[0]?.total || 0,
        todayAttendance
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching stats" }, { status: 500 });
  }
}
