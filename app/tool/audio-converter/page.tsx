"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music } from "lucide-react"

export default function AudioConverterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Audio Converter</h1>
          <p className="text-muted-foreground">Convert audio files to different formats</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Audio Conversion
              </CardTitle>
              <CardDescription>Convert between MP3, WAV, FLAC, AAC and more</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Professional audio conversion with quality preservation and batch processing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
