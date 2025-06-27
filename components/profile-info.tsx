"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useUsage } from "@/hooks/use-usage"
import { Calendar, Mail, Crown } from "lucide-react"

export function ProfileInfo() {
  const { user } = useAuth()
  const { credits, maxCredits } = useUsage()

  if (!user) return null

  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your account details and subscription status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="text-lg">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{user.user_metadata?.full_name || user.email?.split("@")[0]}</h3>
            <div className="flex items-center text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              {user.email}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Joined {joinDate}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Subscription</span>
            <Badge variant="secondary">
              <Crown className="h-3 w-3 mr-1" />
              Free Plan
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Credits</span>
            <Badge variant={credits > 10 ? "default" : "destructive"}>
              {credits} / {maxCredits}
            </Badge>
          </div>
        </div>

        <Button className="w-full">
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Pro
        </Button>
      </CardContent>
    </Card>
  )
}
