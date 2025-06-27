"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud } from "lucide-react"

export default function WeatherForecastPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Weather Forecast</h1>
          <p className="text-muted-foreground">Get weather information for any location</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Weather Information
              </CardTitle>
              <CardDescription>Current weather and forecasts worldwide</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Cloud className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Detailed weather forecasts with maps and meteorological data.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
