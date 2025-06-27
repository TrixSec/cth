"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function RandomQuotePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Random Quote Generator</h1>
          <p className="text-muted-foreground">Get inspirational quotes</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Quote className="h-5 w-5" />
                Inspirational Quotes
              </CardTitle>
              <CardDescription>Random quotes from famous authors and personalities</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Quote className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Generate random inspirational quotes from various categories and authors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
