"use client"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"

interface ProfileData {
  full_name: string | null
  email: string
  user_type: string
  plan: string
  trial_ends: string | null
  subscription_ends: string | null
}

export function ProfileInfo() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email, user_type, plan, trial_ends, subscription_ends")
        .eq("id", user.id)
        .single()

      if (error) return console.error("Failed to load profile:", error)
      setProfile(data)
    }

    fetchProfile()
  }, [user])

  if (!profile) {
    return <div>Loading...</div>
  }

  const getPlanLabel = () => {
    switch (profile.user_type) {
      case "free":
        return "Free Plan"
      case "free_trial":
        return "Free Trial"
      case "premium":
        return profile.plan === "monthly" ? "Premium Monthly" : "Premium Yearly"
      default:
        return "Unknown Plan"
    }
  }

  const getEndDate = () => {
    if (profile.user_type === "free_trial" && profile.trial_ends) {
      return new Date(profile.trial_ends).toLocaleDateString()
    }
    if (profile.user_type === "premium" && profile.subscription_ends) {
      return new Date(profile.subscription_ends).toLocaleDateString()
    }
    return "N/A"
  }

  const getDaysLeft = () => {
    if (profile.user_type === "free") return "--"
    const endDate = profile.user_type === "free_trial" ? profile.trial_ends : profile.subscription_ends
    if (!endDate) return "--"

    const diffTime = new Date(endDate).getTime() - new Date().getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? `${diffDays} day(s)` : "Expired"
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Premium Ribbon */}
      {profile.user_type !== "free" && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          {profile.user_type === "premium" ? "PREMIUM" : "TRIAL"}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{profile.full_name || "User"}</h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">Plan</span>
            <Badge variant={profile.user_type === "premium" ? "default" : "secondary"}>
              {getPlanLabel()}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">Ends On</span>
            <div className="flex items-center gap-1 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{getEndDate()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">Days Left</span>
            <div className="flex items-center gap-1 text-sm">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span>{getDaysLeft()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}