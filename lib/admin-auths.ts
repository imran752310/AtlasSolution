// import { cookies } from "next/headers"

// const ADMIN_EMAIL = "admin@nexora.digital"
// const ADMIN_PASSWORD = "nexora2024"
// const SESSION_COOKIE = "admin_session"
// const SESSION_TOKEN = "nexora-admin-authenticated"

// export function validateAdmin(email: string, password: string): boolean {
//   return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
// }

// export async function createSession() {
//   const cookieStore = await cookies()
//   cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24, // 24 hours
//   })
// }

// export async function getSession(): Promise<boolean> {
//   const cookieStore = await cookies()
//   const session = cookieStore.get(SESSION_COOKIE)
//   return session?.value === SESSION_TOKEN
// }

// export async function destroySession() {
//   const cookieStore = await cookies()
//   cookieStore.delete(SESSION_COOKIE)
// }
