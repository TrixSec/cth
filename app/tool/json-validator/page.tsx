"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Code, Copy } from "lucide-react"

export default function JSONValidatorPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [formattedJson, setFormattedJson] = useState("")
  const [error, setError] = useState("")
  const { toast } = useToast()

  const validateAndFormat = () => {
    if (!jsonInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON to validate",
        variant: "destructive",
      })
      return
    }

    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, 2)
      setFormattedJson(formatted)
      setIsValid(true)
      setError("")
      toast({
        title: "Valid JSON!",
        description: "Your JSON is valid and has been formatted",
      })
    } catch (err) {
      setIsValid(false)
      setFormattedJson("")
      setError(err instanceof Error ? err.message : "Invalid JSON")
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy JSON",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">JSON Validator & Formatter</h1>
          <p className="text-muted-foreground">Validate and format JSON data with detailed error reporting</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                JSON Input
              </CardTitle>
              <CardDescription>Paste your JSON data here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="json-input">JSON Data</Label>
                <Textarea
                  id="json-input"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"name": "John", "age": 30}'
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <Button onClick={validateAndFormat} className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Validate & Format JSON
              </Button>

              {isValid !== null && (
                <div
                  className={`p-4 rounded-lg border ${
                    isValid
                      ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span
                      className={`font-medium ${
                        isValid ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                      }`}
                    >
                      {isValid ? "Valid JSON" : "Invalid JSON"}
                    </span>
                  </div>
                  {error && <p className="text-sm text-red-700 dark:text-red-300 font-mono">{error}</p>}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Formatted JSON</span>
                {formattedJson && (
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(formattedJson)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
              <CardDescription>Properly formatted and indented JSON</CardDescription>
            </CardHeader>
            <CardContent>
              {formattedJson ? (
                <div className="space-y-2">
                  <Textarea value={formattedJson} readOnly className="min-h-[300px] font-mono text-sm" />
                </div>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground">Formatted JSON will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
