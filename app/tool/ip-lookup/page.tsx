"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"

export default function IPLookupPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">IP Lookup</h1>
          <p className="text-muted-foreground">Get information about IP addresses</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                IP Address Information
              </CardTitle>
              <CardDescription>Detailed IP address analysis and geolocation</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Comprehensive IP address lookup with location and security analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
