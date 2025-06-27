"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon } from "lucide-react"

export default function MemeGeneratorPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Meme Generator</h1>
          <p className="text-muted-foreground">Create custom memes with text</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Meme Creation
              </CardTitle>
              <CardDescription>Create memes with popular templates</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Create custom memes using popular templates or upload your own images.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
