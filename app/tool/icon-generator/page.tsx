"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export default function IconGeneratorPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Icon Generator</h1>
          <p className="text-muted-foreground">Generate custom icons and favicons</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Icon Creation
              </CardTitle>
              <CardDescription>Create custom icons and favicons</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Generate custom icons and favicons with various styles and formats.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
