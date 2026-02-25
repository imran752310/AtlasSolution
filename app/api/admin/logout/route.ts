import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" })

  // Delete the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",            
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,            
  })

  return response
}
