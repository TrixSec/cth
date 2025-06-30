import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getGuestSessionId } from "@/lib/guest-session"

export async function POST(request: Request) {
  try {
    const { toolName, isPremiumTool = false } = await request.json()
    const creditsToUse = isPremiumTool ? 5 : 1

    const supabase = createRouteHandlerClient({ cookies })

    // Get current user
    const { 
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    // If not signed in, treat as guest
    if (userError || !user) {
      // Get guest session ID
      const sessionId = getGuestSessionId()

      // Fetch existing guest usage from Supabase
      const { data: guestUsage, error: guestUsageError } = await supabase
        .from("usage_logs")
        .select("credits_used")
        .eq("session_id", sessionId)
        .single()

      if (guestUsageError && guestUsageError.code !== 'PGRST116') {
        console.error("Error fetching guest usage:", guestUsageError)
        return NextResponse.json({ error: "Failed to check guest credits" }, { status: 500 })
      }

      const totalUsed = guestUsage?.credits_used ?? 0
      const remaining = 50 - totalUsed

      if (remaining < creditsToUse) {
        return NextResponse.json(
          { error: "Insufficient guest credits" }, 
          { status: 400 }
        )
      }

      // Update guest usage
      const { error: logError } = await supabase
        .from("usage_logs")
        .upsert({
          session_id: sessionId,
          tool_name: toolName,
          credits_used: totalUsed + creditsToUse,
          user_type: "guest",
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'session_id'
        })

      if (logError) {
        console.error("Failed to log guest usage:", logError)
        return NextResponse.json({ error: "Failed to log usage" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        remainingCredits: remaining - creditsToUse,
        userType: "guest",
      })
    }

    // Signed-in user logic
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits, max_credits, user_type")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("Profile error:", profileError)
      return NextResponse.json({ error: "Profile not found" }, { status: 500 })
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    if (profile.credits < creditsToUse) {
      return NextResponse.json(
        { error: "Insufficient credits" }, 
        { status: 400 }
      )
    }

    // Deduct credits
    const newCredits = profile.credits - creditsToUse
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", user.id)

    if (updateError) {
      console.error("Update error:", updateError)
      return NextResponse.json(
        { error: "Failed to update credits" }, 
        { status: 500 }
      )
    }

    // Log usage
    const { error: logError } = await supabase
      .from("usage_logs")
      .insert({
        user_id: user.id,
        tool_name: toolName,
        credits_used: creditsToUse,
        user_type: profile.user_type,
        created_at: new Date().toISOString()
      })

    if (logError) {
      console.error("Usage logging failed:", logError)
    }

    return NextResponse.json({
      success: true,
      remainingCredits: newCredits,
      userType: profile.user_type,
    })
  } catch (error) {
    console.error("Error using credits:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}