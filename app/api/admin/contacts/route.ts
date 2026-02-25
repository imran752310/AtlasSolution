import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { getSession } from "@/lib/admin-auths"

export async function GET() {
  try {
    const isAuthenticated = await getSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const filePath = path.join(process.cwd(), "data", "contacts.json")

    try {
      const data = await fs.readFile(filePath, "utf-8")
      const contacts = JSON.parse(data)
      return NextResponse.json(contacts)
    } catch {
      // File doesn't exist yet — no contacts
      return NextResponse.json([])
    }
  } catch (error) {
    console.error("Contacts fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
