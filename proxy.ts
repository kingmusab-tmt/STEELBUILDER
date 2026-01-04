import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Proxy for route protection
 * This uses the modern Next.js proxy pattern
 * Protects admin routes from unauthorized access
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export async function proxy(req: NextRequest) {
  // Get the JWT token from NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protect admin routes - require authentication and Admin role
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check if user has admin role
    if (token.role !== "Admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Protect user dashboard - require authentication
  if (req.nextUrl.pathname.startsWith("/userDashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Auto-redirect admins to admin page
    if (token.role === "Admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

/**
 * Configure which routes to apply middleware to
 * Using matcher for the modern proxy pattern approach
 */
export const config = {
  matcher: ["/admin/:path*", "/userDashboard/:path*"],
};
