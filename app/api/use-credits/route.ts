import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { toolName, creditsToUse = 1 } = await request.json()
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's current credits
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: "Failed to get user profile" }, { status: 500 })
    }

    // Check if user has enough credits
    if (profile.credits < creditsToUse) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 400 })
    }

    // Deduct credits
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ credits: profile.credits - creditsToUse })
      .eq("id", user.id)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update credits" }, { status: 500 })
    }

    // Log usage
    const { error: logError } = await supabase.from("usage_logs").insert({
      user_id: user.id,
      tool_name: toolName,
      credits_used: creditsToUse,
    })

    if (logError) {
      console.error("Failed to log usage:", logError)
    }

    return NextResponse.json({
      success: true,
      remainingCredits: profile.credits - creditsToUse,
    })
  } catch (error) {
    console.error("Error using credits:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
