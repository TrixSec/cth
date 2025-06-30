"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Copy, RefreshCw, Shield } from "lucide-react"
import { useCredits } from "@/hooks/use-credits"
import { useAuth } from "@/hooks/use-auth"

export default function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const { toast } = useToast()

  const { user } = useAuth()
  const { useCredits: deductCredits, loading } = useCredits()

  // Treat guest and free the same
  const isGuest = !user
  const userType = user?.user_metadata?.user_type || "guest"
  const isPremiumUser = userType === "premium" || userType === "free_trial"

  const toolName = "Password Generator"
  const isPremiumTool = false // Set to true if this feature costs more for free/guest

  const generatePassword = async () => {
    if (!isPremiumUser && isGuest) {
      // Guest or free user
      const success = await deductCredits(toolName, isPremiumTool)
      if (!success) return
    } else if (!isPremiumUser) {
      // Signed in but not premium or trial
      const success = await deductCredits(toolName, isPremiumTool)
      if (!success) return
    }

    let charset = ""

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "")
    }

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      })
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(result)
  }

  const copyToClipboard = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      toast({ title: "Copied!", description: "Password copied to clipboard" })
    } catch {
      toast({ title: "Failed", description: "Could not copy password", variant: "destructive" })
    }
  }

  const getStrengthColor = () => {
    if (length[0] < 8) return "text-red-500"
    if (length[0] < 12) return "text-yellow-500"
    return "text-green-500"
  }

  const getStrengthText = () => {
    if (length[0] < 8) return "Weak"
    if (length[0] < 12) return "Medium"
    return "Strong"
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Password Generator
          </CardTitle>
          <CardDescription>Generate secure, random passwords with customizable options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Generated Password</Label>
            <div className="flex gap-2">
              <Input
                value={password}
                readOnly
                placeholder="Click generate to create a password"
                className="font-mono"
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!password}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Password Length: {length[0]}</Label>
                <span className={`text-sm font-medium ${getStrengthColor()}`}>{getStrengthText()}</span>
              </div>
              <Slider value={length} onValueChange={setLength} max={128} min={4} step={1} className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(!!checked)} />
                <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={(checked) => setIncludeLowercase(!!checked)} />
                <Label htmlFor="lowercase">Lowercase (a-z)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(!!checked)} />
                <Label htmlFor="numbers">Numbers (0-9)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(!!checked)} />
                <Label htmlFor="symbols">Symbols (!@#$)</Label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="exclude-similar" checked={excludeSimilar} onCheckedChange={(checked) => setExcludeSimilar(!!checked)} />
              <Label htmlFor="exclude-similar">Exclude similar characters (i, l, 1, L, o, 0, O)</Label>
            </div>
          </div>

          <Button
            onClick={generatePassword}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Password
              </>
            )}
          </Button>

          {!isPremiumUser && !isGuest && (
            <p className="text-center text-sm text-muted-foreground">
              You're out of credits! Upgrade to premium for unlimited usage.
            </p>
          )}

          {!isPremiumUser && isGuest && (
            <p className="text-center text-sm text-muted-foreground">
              Guests have limited credits. Sign up to unlock more!
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password Security Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Use at least 12 characters for better security</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>• Avoid using personal information in passwords</li>
            <li>• Use a unique password for each account</li>
            <li>• Consider using a password manager</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
