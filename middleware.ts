import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const role = token?.role as string | undefined;

    // If a Student tries to access any route outside /dashboard/student, block them
    if (role === "Student") {
      const allowedPrefixes = [
        "/dashboard/student",
        "/login",
        "/api/auth",
      ];
      const isAllowed = allowedPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
      );
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
      }
    }

    // If a Teacher tries to access admin routes, redirect to teacher dashboard
    if (role === "Teacher") {
      const allowedPrefixes = [
        "/dashboard/teacher",
        "/login",
        "/api/auth",
      ];
      const isAllowed = allowedPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
      );
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
