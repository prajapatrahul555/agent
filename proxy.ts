import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  // Public routes — always allow
  if (pathname === "/login" || pathname === "/register" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Not logged in — redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token.role as string;

  // ── Role-based access control ──────────────────────────────────────────────

  // Admin routes — only Admin
  if (pathname.startsWith("/dashboard/admin") && role !== "Admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Teacher routes — only Teacher
  if (pathname.startsWith("/dashboard/teacher") && role !== "Teacher") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Parent routes — only Parent
  if (pathname.startsWith("/dashboard/parent") && role !== "Parent") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Student routes — only Student, and only allowed sub-pages
  if (pathname.startsWith("/dashboard/student") && role !== "Student") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Block students from accessing anything outside their allowed pages
  if (role === "Student") {
    const allowedStudentPaths = [
      "/dashboard/student",
      "/dashboard/student/marksheet",
      "/dashboard/student/attendance",
      "/dashboard/student/homework",
      "/dashboard/student/timetable",
      "/dashboard/student/notices",
    ];
    const isAllowed = allowedStudentPaths.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    );
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
