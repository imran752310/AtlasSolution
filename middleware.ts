// middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // allow next internals and login page
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/admin/login"
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value

  console.log("Middleware token:", token)

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }


return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
