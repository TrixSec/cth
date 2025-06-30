"use client"

import { useEffect, useState } from "react"
import { getGuestSessionId } from "@/lib/guest-session"

const GUEST_CREDITS_KEY = "guest_credits"
const MAX_GUEST_CREDITS = 50

export function useGuestCredits() {
  const [credits, setCredits] = useState<number>(50)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(GUEST_CREDITS_KEY)
    if (stored) {
      setCredits(parseInt(stored))
    }
  }, [])

  const deductCredits = async (toolName: string, isPremiumTool = false): Promise<boolean> => {
    const creditsToUse = isPremiumTool ? 5 : 1
    const remaining = credits - creditsToUse

    if (remaining < 0) {
      return false
    }

    setLoading(true)

    try {
      // Simulate API call (or send to backend later)
      setCredits(remaining)
      localStorage.setItem(GUEST_CREDITS_KEY, String(remaining))

      // Optional: Send to Supabase
      await fetch("/api/log-guest-usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool_name: toolName,
          credits_used: creditsToUse,
          session_id: getGuestSessionId(),
        }),
      })

      return true
    } catch (error) {
      console.error("Failed to log guest usage:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const resetCredits = () => {
    setCredits(MAX_GUEST_CREDITS)
    localStorage.setItem(GUEST_CREDITS_KEY, String(MAX_GUEST_CREDITS))
  }

  const hasCredits = credits > 0

  return { credits, deductCredits, loading, resetCredits, hasCredits }
}