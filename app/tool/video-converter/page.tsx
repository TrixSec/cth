"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Upload, Settings, Download } from "lucide-react"

export default function VideoConverterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Video Converter</h1>
          <p className="text-muted-foreground">Convert videos between different formats</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Conversion
              </CardTitle>
              <CardDescription>Advanced video format conversion tool</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                Advanced video conversion with support for MP4, AVI, MOV, WebM and more formats.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Upload className="h-8 w-8 mb-2 text-primary" />
                  <span className="font-medium">Upload</span>
                  <span className="text-muted-foreground">Multiple formats</span>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Settings className="h-8 w-8 mb-2 text-primary" />
                  <span className="font-medium">Configure</span>
                  <span className="text-muted-foreground">Quality settings</span>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Download className="h-8 w-8 mb-2 text-primary" />
                  <span className="font-medium">Download</span>
                  <span className="text-muted-foreground">Converted file</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
