"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useUsage } from "@/hooks/use-usage"
import { Activity, Calendar, TrendingUp } from "lucide-react"

export function UsageStats() {
  const { credits, maxCredits, usagePercentage, usedToday, usedThisWeek, usedThisMonth } = useUsage()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
        <CardDescription>Track your tool usage and credits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Monthly Credits</span>
            <span className="text-sm text-muted-foreground">
              {maxCredits - credits} / {maxCredits} used
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">{Math.round(usagePercentage)}% of monthly credits used</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Today</span>
            </div>
            <span className="text-sm font-bold">{usedToday} tools</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <span className="text-sm font-bold">{usedThisWeek} tools</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">This Month</span>
            </div>
            <span className="text-sm font-bold">{usedThisMonth} tools</span>
          </div>
        </div>

        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Credits reset on the 1st of each month</p>
        </div>
      </CardContent>
    </Card>
  )
}
