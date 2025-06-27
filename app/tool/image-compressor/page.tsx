"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { ImageIcon, Upload, Zap } from "lucide-react"

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState([80])
  const [isCompressing, setIsCompressing] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
    } else {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      })
    }
  }

  const compressImage = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select an image to compress",
        variant: "destructive",
      })
      return
    }

    setIsCompressing(true)

    // Simulate compression
    setTimeout(() => {
      toast({
        title: "Image Compressed!",
        description: `Image compressed to ${quality[0]}% quality`,
      })
      setIsCompressing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Image Compressor</h1>
          <p className="text-muted-foreground">Compress images while maintaining quality</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Compression
              </CardTitle>
              <CardDescription>Upload an image and adjust compression settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Select Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                    Choose Image
                  </Button>
                  {file && (
                    <div className="mt-4 p-2 bg-muted rounded text-sm">
                      <p>
                        <strong>File:</strong> {file.name}
                      </p>
                      <p>
                        <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quality: {quality[0]}%</Label>
                <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} className="w-full" />
              </div>

              <Button onClick={compressImage} disabled={isCompressing} className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                {isCompressing ? "Compressing..." : "Compress Image"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
