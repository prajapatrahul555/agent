import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname === "/login" || pathname === "/register" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token.role as string;

  // Role-based access control
  if (pathname.startsWith("/dashboard/admin") && role !== "Admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/dashboard/teacher") && role !== "Teacher") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/dashboard/student") && role !== "Student") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/dashboard/parent") && role !== "Parent") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

