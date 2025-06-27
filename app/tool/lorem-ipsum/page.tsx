"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function LoremIpsumPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Lorem Ipsum Generator</h1>
          <p className="text-muted-foreground">Generate placeholder text</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Placeholder Text
              </CardTitle>
              <CardDescription>Generate Lorem Ipsum text in various lengths</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Generate Lorem Ipsum placeholder text with customizable options.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
