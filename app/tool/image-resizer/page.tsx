"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon } from "lucide-react"

export default function ImageResizerPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Image Resizer</h1>
          <p className="text-muted-foreground">Resize images to specific dimensions</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Resizing
              </CardTitle>
              <CardDescription>Resize images to exact dimensions or percentages</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Resize images to exact dimensions while maintaining aspect ratio or custom sizing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
