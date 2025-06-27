"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

export default function SteganographyToolPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Steganography Tool</h1>
          <p className="text-muted-foreground">Hide messages within images</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Message Hiding
              </CardTitle>
              <CardDescription>Conceal secret messages within image files</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Eye className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Hide secret messages within images using advanced steganography techniques.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
