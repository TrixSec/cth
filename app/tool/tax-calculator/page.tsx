"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Receipt } from "lucide-react"

export default function TaxCalculatorPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Tax Calculator</h1>
          <p className="text-muted-foreground">Calculate taxes for different regions</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Tax Calculations
              </CardTitle>
              <CardDescription>Calculate income and sales taxes</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Comprehensive tax calculations for multiple countries and regions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
