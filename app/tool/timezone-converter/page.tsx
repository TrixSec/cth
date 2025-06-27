"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function TimezoneConverterPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Time Zone Converter</h1>
          <p className="text-muted-foreground">Convert time between time zones</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Zone Conversion
              </CardTitle>
              <CardDescription>Convert time across different time zones</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Easy time zone conversion with world clock functionality.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
