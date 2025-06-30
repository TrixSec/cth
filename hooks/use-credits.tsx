"use client"
import { useState, useCallback, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

interface ProfileData {
  id: string
  max_credits: number
  credits_used: number
  user_type: "free" | "free_trial" | "premium"
}

export function useCredits() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    if (!user) return

    setLoading(true)

    const { data, error } = await supabase
      .from("profiles")
      .select("id, max_credits, credits_used, user_type")
      .eq("id", user.id)
      .single()

    if (error) {
      console.error("Failed to fetch profile:", error)
      setLoading(false)
      return
    }

    setProfile(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user, fetchProfile])

  const useCredits = async (toolName: string, isPremium: boolean): Promise<boolean> => {
    if (!profile) {
      toast({
        title: "Error",
        description: "Profile not loaded",
        variant: "destructive",
      })
      return false
    }

    const creditsToUse = isPremium ? 5 : 1
    const remaining = profile.max_credits - profile.credits_used

    if (remaining < creditsToUse) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits to use this tool.",
        variant: "destructive",
      })
      return false
    }

    const res = await fetch("/api/use-credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolName, isPremium }),
    })

    const json = await res.json()

    if (!res.ok) {
      toast({
        title: "Error",
        description: json.error || "Failed to use credits",
        variant: "destructive",
      })
      return false
    }

    // Optimistically update local state
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            credits_used: prev.credits_used + creditsToUse,
          }
        : null
    )

    toast({
      title: "Credits Used",
      description: `${creditsToUse} credit${creditsToUse > 1 ? "s" : ""} used for ${toolName}`,
    })

    return true
  }

  return {
    useCredits,
    creditsUsed: profile?.credits_used ?? 0,
    maxCredits: profile?.max_credits ?? 50,
    creditsRemaining: profile ? profile.max_credits - profile.credits_used : 50,
    hasCredits: (profile ? profile.max_credits - profile.credits_used : 50) > 0,
    refreshCredits: fetchProfile,
    loading,
    userType: profile?.user_type ?? "free",
  }
}