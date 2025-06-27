"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

export default function LoanCalculatorPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Loan Calculator</h1>
          <p className="text-muted-foreground">Calculate loan payments and interest</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan Calculations
              </CardTitle>
              <CardDescription>Calculate monthly payments and amortization</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Advanced loan calculations with amortization schedules and payment breakdowns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
