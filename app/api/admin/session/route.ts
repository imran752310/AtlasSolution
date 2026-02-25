import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET() {
  const token = (await cookies()).get("token")?.value
  if (!token) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
}