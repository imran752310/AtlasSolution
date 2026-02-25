import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

type JwtPayload = {
  userId: string
  email: string
}

export async function getAuthUser(): Promise<JwtPayload | null> {
  
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) return null

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload
  } catch {
    return null
  }
}