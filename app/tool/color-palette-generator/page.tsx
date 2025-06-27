"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette } from "lucide-react"

export default function ColorPaletteGeneratorPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Color Palette Generator</h1>
          <p className="text-muted-foreground">Generate beautiful color palettes</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Palette Creation
              </CardTitle>
              <CardDescription>Generate harmonious color schemes</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Palette className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Professional color palette generation with color theory principles.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
