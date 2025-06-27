"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"

interface UsageData {
  credits: number
  maxCredits: number
  usagePercentage: number
  usedToday: number
  usedThisWeek: number
  usedThisMonth: number
  lastResetDate: string
}

const DEFAULT_USAGE: UsageData = {
  credits: 50,
  maxCredits: 50,
  usagePercentage: 0,
  usedToday: 0,
  usedThisWeek: 0,
  usedThisMonth: 0,
  lastResetDate: new Date().toISOString().split("T")[0],
}

export function useUsage() {
  const { user } = useAuth()
  const [usage, setUsage] = useState<UsageData>(DEFAULT_USAGE)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("usage-data")
      if (stored) {
        try {
          const parsedUsage = JSON.parse(stored)
          const today = new Date().toISOString().split("T")[0]

          // Reset daily counter if it's a new day
          if (parsedUsage.lastResetDate !== today) {
            parsedUsage.usedToday = 0
            parsedUsage.lastResetDate = today
          }

          setUsage(parsedUsage)
        } catch (error) {
          console.error("Error parsing usage data:", error)
          setUsage(DEFAULT_USAGE)
        }
      }
    }
  }, [])

  const updateUsage = (creditsUsed = 1) => {
    setUsage((prev) => {
      const newUsage = {
        ...prev,
        credits: Math.max(0, prev.credits - creditsUsed),
        usedToday: prev.usedToday + creditsUsed,
        usedThisWeek: prev.usedThisWeek + creditsUsed,
        usedThisMonth: prev.usedThisMonth + creditsUsed,
        usagePercentage: Math.min(100, ((prev.usedThisMonth + creditsUsed) / prev.maxCredits) * 100),
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("usage-data", JSON.stringify(newUsage))
      }

      return newUsage
    })
  }

  const resetCredits = () => {
    const resetUsage = {
      ...DEFAULT_USAGE,
      lastResetDate: new Date().toISOString().split("T")[0],
    }
    setUsage(resetUsage)

    if (typeof window !== "undefined") {
      localStorage.setItem("usage-data", JSON.stringify(resetUsage))
    }
  }

  return {
    ...usage,
    updateUsage,
    resetCredits,
    hasCredits: usage.credits > 0,
  }
}
