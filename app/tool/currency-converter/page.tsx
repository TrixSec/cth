"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export default function CurrencyConverterPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Currency Converter</h1>
          <p className="text-muted-foreground">Convert between different currencies</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Currency Conversion
              </CardTitle>
              <CardDescription>Real-time currency exchange rates</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <DollarSign className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Real-time currency conversion with 150+ world currencies.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
