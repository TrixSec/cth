"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Type } from "lucide-react"

export default function FontPairingPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Font Pairing Tool</h1>
          <p className="text-muted-foreground">Find perfect font combinations</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Font Combinations
              </CardTitle>
              <CardDescription>Discover perfect font pairings</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Type className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Find perfect font combinations with preview and recommendations.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
