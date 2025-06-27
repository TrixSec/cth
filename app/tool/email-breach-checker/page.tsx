"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Shield, AlertTriangle, CheckCircle, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EmailBreachCheckerPage() {
  const [email, setEmail] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { toast } = useToast()

  const checkBreach = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    setIsChecking(true)

    // Simulate breach check
    setTimeout(() => {
      const mockResult = {
        breached: Math.random() > 0.5,
        breaches: [
          { name: "Adobe", date: "2013-10-04", accounts: "152,445,165" },
          { name: "LinkedIn", date: "2012-05-05", accounts: "164,611,595" },
        ],
      }
      setResult(mockResult)
      setIsChecking(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Email Breach Checker</h1>
          <p className="text-muted-foreground">Check if your email has been compromised in known data breaches</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Breach Check
              </CardTitle>
              <CardDescription>Enter your email to check against known data breaches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <Button onClick={checkBreach} disabled={isChecking} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                {isChecking ? "Checking..." : "Check for Breaches"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.breached ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  Breach Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.breached ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        ⚠️ Your email was found in {result.breaches.length} data breach(es)
                      </p>
                    </div>
                    <div className="space-y-2">
                      {result.breaches.map((breach: any, index: number) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{breach.name}</p>
                              <p className="text-sm text-muted-foreground">Breached on {breach.date}</p>
                            </div>
                            <Badge variant="destructive">{breach.accounts} accounts</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      ✅ Good news! Your email was not found in any known breaches
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
