"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"

interface UsageData {
  credits: number // Remaining credits = max_credits - credits_used
  maxCredits: number
  usagePercentage: number
  usedToday: number
  usedThisWeek: number
  usedThisMonth: number
  lastResetDate: string
}

export function useUsage() {
  const { user } = useAuth()
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)

  // Helper functions for date ranges
  const getStartOfDay = () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  }

  const getStartOfWeek = () => {
    const now = new Date()
    const day = now.getDay()
    const diff = now.getDate() - day
    const startOfWeek = new Date(now.setDate(diff))
    return new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()).toISOString()
  }

  const getStartOfMonth = () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  }

  useEffect(() => {
    const fetchUsage = async () => {
      if (!user) {
        setUsage(null)
        setLoading(false)
        return
      }

      setLoading(true)

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("max_credits, credits_used, last_reset_date")
        .eq("id", user.id)
        .single()

      if (profileError) {
        console.error("Failed to fetch profile:", profileError)
        setLoading(false)
        return
      }

      const today = getStartOfDay()
      const week = getStartOfWeek()
      const month = getStartOfMonth()

      // Fetch log stats
      const { count: todayCount } = await supabase
        .from("usage_logs")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .gte("created_at", today)

      const { count: weekCount } = await supabase
        .from("usage_logs")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .gte("created_at", week)

      const { count: monthCount } = await supabase
        .from("usage_logs")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .gte("created_at", month)

      const creditsRemaining = profile.max_credits - profile.credits_used
      const usagePercentage = Math.min(100, (profile.credits_used / profile.max_credits) * 100)

      const usageData: UsageData = {
        credits: creditsRemaining,
        maxCredits: profile.max_credits,
        usagePercentage,
        usedToday: todayCount || 0,
        usedThisWeek: weekCount || 0,
        usedThisMonth: monthCount || 0,
        lastResetDate: profile.last_reset_date,
      }

      setUsage(usageData)
      setLoading(false)
    }

    fetchUsage()
  }, [user])

  return {
    ...usage,
    loading,
    hasCredits: usage?.credits ? usage.credits > 0 : false,
    credits: usage?.credits ?? 0,
    maxCredits: usage?.maxCredits ?? 50,
    usagePercentage: usage?.usagePercentage ?? 0,
    usedToday: usage?.usedToday ?? 0,
    usedThisWeek: usage?.usedThisWeek ?? 0,
    usedThisMonth: usage?.usedThisMonth ?? 0,
    lastResetDate: usage?.lastResetDate ?? "",
  }
}