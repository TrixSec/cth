"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Copy, Hash } from "lucide-react"
import CryptoJS from "crypto-js"

export default function HashGenerator() {
  const [input, setInput] = useState("")
  const [algorithm, setAlgorithm] = useState("sha256")
  const [output, setOutput] = useState("")
  const { toast } = useToast()

  const generateHash = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive",
      })
      return
    }

    let hash = ""

    switch (algorithm) {
      case "md5":
        hash = CryptoJS.MD5(input).toString()
        break
      case "sha1":
        hash = CryptoJS.SHA1(input).toString()
        break
      case "sha256":
        hash = CryptoJS.SHA256(input).toString()
        break
      case "sha512":
        hash = CryptoJS.SHA512(input).toString()
        break
      case "sha3":
        hash = CryptoJS.SHA3(input).toString()
        break
      default:
        hash = CryptoJS.SHA256(input).toString()
    }

    setOutput(hash)
  }

  const copyToClipboard = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      toast({
        title: "Copied!",
        description: "Hash copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy hash",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Hash Generator
          </CardTitle>
          <CardDescription>Generate cryptographic hashes using various algorithms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              placeholder="Enter text to hash..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Hash Algorithm</Label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="md5">MD5</SelectItem>
                <SelectItem value="sha1">SHA-1</SelectItem>
                <SelectItem value="sha256">SHA-256</SelectItem>
                <SelectItem value="sha512">SHA-512</SelectItem>
                <SelectItem value="sha3">SHA-3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateHash} className="w-full">
            <Hash className="h-4 w-4 mr-2" />
            Generate Hash
          </Button>

          {output && (
            <div className="space-y-2">
              <Label>Generated Hash</Label>
              <div className="flex gap-2">
                <Input value={output} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hash Algorithm Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <strong>MD5:</strong> 128-bit hash function. Fast but not cryptographically secure.
            </div>
            <div>
              <strong>SHA-1:</strong> 160-bit hash function. Deprecated for security applications.
            </div>
            <div>
              <strong>SHA-256:</strong> 256-bit hash function. Part of SHA-2 family, widely used.
            </div>
            <div>
              <strong>SHA-512:</strong> 512-bit hash function. More secure than SHA-256.
            </div>
            <div>
              <strong>SHA-3:</strong> Latest standard, different construction than SHA-2.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
