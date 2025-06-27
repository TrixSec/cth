"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Copy, Type, RotateCcw } from "lucide-react"

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState("")
  const { toast } = useToast()

  const conversions = [
    {
      name: "UPPERCASE",
      description: "Convert all text to uppercase",
      convert: (text: string) => text.toUpperCase(),
    },
    {
      name: "lowercase",
      description: "Convert all text to lowercase",
      convert: (text: string) => text.toLowerCase(),
    },
    {
      name: "Title Case",
      description: "Capitalize the first letter of each word",
      convert: (text: string) =>
        text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    },
    {
      name: "Sentence case",
      description: "Capitalize the first letter of each sentence",
      convert: (text: string) => text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
    },
    {
      name: "camelCase",
      description: "Remove spaces and capitalize each word except the first",
      convert: (text: string) =>
        text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
          .replace(/\s+/g, ""),
    },
    {
      name: "PascalCase",
      description: "Remove spaces and capitalize each word",
      convert: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, ""),
    },
    {
      name: "snake_case",
      description: "Replace spaces with underscores and lowercase",
      convert: (text: string) => text.toLowerCase().replace(/\s+/g, "_"),
    },
    {
      name: "kebab-case",
      description: "Replace spaces with hyphens and lowercase",
      convert: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
    },
    {
      name: "CONSTANT_CASE",
      description: "Uppercase with underscores",
      convert: (text: string) => text.toUpperCase().replace(/\s+/g, "_"),
    },
    {
      name: "aLtErNaTiNg CaSe",
      description: "Alternate between uppercase and lowercase",
      convert: (text: string) =>
        text
          .split("")
          .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
          .join(""),
    },
    {
      name: "iNVERSE cASE",
      description: "Invert the case of each character",
      convert: (text: string) =>
        text
          .split("")
          .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
          .join(""),
    },
    {
      name: "Reverse Text",
      description: "Reverse the order of characters",
      convert: (text: string) => text.split("").reverse().join(""),
    },
  ]

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

  const clearText = () => {
    setInputText("")
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced Case Converter</h1>
          <p className="text-muted-foreground">
            Convert text between different cases and formats with multiple options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Input Text
                </CardTitle>
                <CardDescription>Enter the text you want to convert</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Your Text</Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="min-h-[200px]"
                  />
                </div>
                <Button variant="outline" onClick={clearText} className="w-full bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Text
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conversions.map((conversion, index) => {
                const convertedText = inputText ? conversion.convert(inputText) : ""

                return (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{conversion.name}</CardTitle>
                      <CardDescription className="text-sm">{conversion.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="min-h-[100px] p-3 border rounded-lg bg-muted/50">
                        <div className="text-sm font-mono break-words">
                          {convertedText || "Enter text to see conversion..."}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(convertedText)}
                        disabled={!convertedText}
                        className="w-full"
                      >
                        <Copy className="h-3 w-3 mr-2" />
                        Copy
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
