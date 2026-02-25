// /app/api/admin/logout/route.ts
import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" })

  // Delete the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",            // must match login cookie path
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,            // immediately expires
  })

  return response
}

// import { destroySession } from "@/lib/admin-auths"
// import { NextResponse } from "next/server"

// export async function POST() {
//   try {
//     await destroySession()
//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Logout error:", error)
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }
