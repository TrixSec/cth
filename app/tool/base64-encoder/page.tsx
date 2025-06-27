"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Copy, ArrowUpDown } from "lucide-react"

export default function Base64EncoderPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const { toast } = useToast()

  const processText = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to process",
        variant: "destructive",
      })
      return
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(input)
        setOutput(encoded)
      } else {
        const decoded = atob(input)
        setOutput(decoded)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for decoding",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Base64 Encoder/Decoder</h1>
          <p className="text-muted-foreground">Encode and decode Base64 strings</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="flex border rounded-lg p-1">
              <Button
                variant={mode === "encode" ? "default" : "ghost"}
                onClick={() => setMode("encode")}
                className="rounded-r-none"
              >
                Encode
              </Button>
              <Button
                variant={mode === "decode" ? "default" : "ghost"}
                onClick={() => setMode("decode")}
                className="rounded-l-none"
              >
                Decode
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>
                  {mode === "encode" ? "Enter text to encode" : "Enter Base64 to decode"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === "encode" ? "Enter text here..." : "Enter Base64 here..."}
                  className="min-h-[200px] font-mono"
                />
                <Button onClick={processText} className="w-full">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  {mode === "encode" ? "Encode" : "Decode"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Output</span>
                  {output && (
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(output)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>{mode === "encode" ? "Base64 encoded result" : "Decoded text result"}</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Result will appear here..."
                  className="min-h-[200px] font-mono"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
