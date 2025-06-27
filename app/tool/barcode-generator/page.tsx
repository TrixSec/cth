"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScanLine } from "lucide-react"

export default function BarcodeGeneratorPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Barcode Generator</h1>
          <p className="text-muted-foreground">Generate various types of barcodes</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanLine className="h-5 w-5" />
                Barcode Creation
              </CardTitle>
              <CardDescription>Generate barcodes in multiple formats</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <ScanLine className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Generate barcodes in multiple formats including UPC, EAN, Code 128, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
