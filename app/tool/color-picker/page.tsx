"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Palette, Copy } from "lucide-react"

export default function ColorPickerPage() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const { toast } = useToast()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Color code copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy color code",
        variant: "destructive",
      })
    }
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null

    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(selectedColor)
  const hsl = hexToHsl(selectedColor)

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Color Picker</h1>
          <p className="text-muted-foreground">Pick colors and get codes in multiple formats</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Picker
              </CardTitle>
              <CardDescription>Select a color using the picker below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="w-full h-32 rounded-lg border" style={{ backgroundColor: selectedColor }} />

                <div className="space-y-2">
                  <Label htmlFor="color-input">Color Picker</Label>
                  <Input
                    id="color-input"
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hex-input">Hex Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="hex-input"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="font-mono"
                    />
                    <Button variant="outline" onClick={() => copyToClipboard(selectedColor)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Formats</CardTitle>
              <CardDescription>Color codes in different formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">HEX</div>
                    <div className="text-sm text-muted-foreground font-mono">{selectedColor}</div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(selectedColor)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                {rgb && (
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">RGB</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        rgb({rgb.r}, {rgb.g}, {rgb.b})
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {hsl && (
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">HSL</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
