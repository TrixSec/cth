"use client"

import { useState, useEffect } from "react"
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Eye, BarChart3 } from "lucide-react"

export default function TextCounterPage() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  })

  useEffect(() => {
    const calculateStats = () => {
      const characters = text.length
      const charactersNoSpaces = text.replace(/\s/g, "").length
      const words = text.trim() ? text.trim().split(/\s+/).length : 0
      const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0
      const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0
      const readingTime = Math.ceil(words / 200) // 200 words per minute
      const speakingTime = Math.ceil(words / 150) // 150 words per minute

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime,
        speakingTime,
      })
    }

    calculateStats()
  }, [text])

  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced Text Counter</h1>
          <p className="text-muted-foreground">Analyze your text with detailed statistics and reading time estimates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Text Input
                </CardTitle>
                <CardDescription>Enter or paste your text to analyze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="text-input">Your Text</Label>
                  <Textarea
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text here..."
                    className="min-h-[400px] font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Text Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.characters}</div>
                    <div className="text-xs text-muted-foreground">Characters</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
                    <div className="text-xs text-muted-foreground">No Spaces</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.words}</div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
                    <div className="text-xs text-muted-foreground">Sentences</div>
                  </div>
                </div>

                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
                  <div className="text-xs text-muted-foreground">Paragraphs</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Reading Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Reading</span>
                  </div>
                  <Badge variant="outline">
                    {stats.readingTime} min{stats.readingTime !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Speaking</span>
                  </div>
                  <Badge variant="outline">
                    {stats.speakingTime} min{stats.speakingTime !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Text Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Average words per sentence:</span>
                  <span className="font-medium">
                    {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average characters per word:</span>
                  <span className="font-medium">
                    {stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Reading level:</span>
                  <span className="font-medium">
                    {stats.words < 100 ? "Beginner" : stats.words < 500 ? "Intermediate" : "Advanced"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
