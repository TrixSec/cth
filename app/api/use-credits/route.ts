import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { toolName, isPremium = false } = await request.json()
    const creditsToUse = isPremium ? 5 : 1

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch profile with max_credits and credits_used
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, max_credits, credits_used")
      .eq("id", user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
    }

    const creditsLeft = profile.max_credits - profile.credits_used

    // Check if enough credits
    if (creditsLeft < creditsToUse) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 400 })
    }

    // Deduct credits by updating credits_used
    const newCreditsUsed = profile.credits_used + creditsToUse
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ credits_used: newCreditsUsed })
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
      console.error("Usage logging failed:", logError)
    }

    return NextResponse.json({
      success: true,
      remainingCredits: profile.max_credits - newCreditsUsed,
      usedCredits: newCreditsUsed,
    })
  } catch (error) {
    console.error("Error using credits:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}