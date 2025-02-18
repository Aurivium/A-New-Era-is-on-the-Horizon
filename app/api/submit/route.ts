import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, reason } = await request.json()

    if (!name || !email || !phone || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check for existing entries
    const { data: existingEntries, error: searchError } = await supabase
      .from("waitlist")
      .select()
      .or(`email.eq.${email},phone.eq.${phone}`)

    if (searchError) {
      console.error("Error searching for existing entries:", searchError)
      return NextResponse.json({ error: "Error checking existing entries: " + searchError.message }, { status: 500 })
    }

    if (existingEntries && existingEntries.length > 0) {
      return NextResponse.json(
        {
          message: "You've already joined, we'll have updates and news for you soon!",
          isDuplicate: true,
        },
        { status: 409 },
      )
    }

    // Insert new entry
    const { data, error } = await supabase.from("waitlist").insert([{ name, email, phone, reason }]).select()

    if (error) {
      console.error("Error inserting waitlist entry:", error)
      return NextResponse.json({ error: "Error saving data: " + error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Submission successful", data, isDuplicate: false }, { status: 200 })
  } catch (error) {
    console.error("Request error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

