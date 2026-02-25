// /app/api/admin/login/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // create JWT
    const payload = { userId: admin.id, email: admin.email }
    console.log(payload)

    const token = jwt.sign(
      payload, process.env.JWT_SECRET!, 
      { expiresIn: "5h" })

    const response = NextResponse.json({
      message: "Logged in successfully",
      redirect: "/admin"
    })

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",                 // accessible on all routes
      sameSite: "lax",           // localhost-friendly
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
    
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}