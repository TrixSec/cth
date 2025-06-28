"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useCredits } from "@/hooks/use-credits"
import { Activity, Calendar, TrendingUp } from "lucide-react"

export function UsageStats() {
  const { creditsUsed, maxCredits } = useCredits()
  const creditsLeft = maxCredits - creditsUsed
  const usagePercentage = (creditsUsed / maxCredits) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Usage</CardTitle>
        <CardDescription>Track your monthly credit consumption</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Monthly Credits</span>
            <span className="text-sm text-muted-foreground">
              {creditsUsed} / {maxCredits}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">{Math.round(usagePercentage)}% used</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <StatItem icon={<Activity />} label="Used This Month" value={`${creditsUsed}`} />
          <StatItem icon={<Calendar />} label="Credits Left" value={`${creditsLeft}`} />
          <StatItem icon={<TrendingUp />} label="Max Monthly Credits" value={`${maxCredits}`} />
        </div>

        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Credits reset on the 1st of each month</p>
        </div>
      </CardContent>
    </Card>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm font-bold">{value}</span>
    </div>
  )
}