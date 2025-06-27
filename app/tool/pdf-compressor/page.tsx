"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

export default function PDFCompressorPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">PDF Compressor</h1>
          <p className="text-muted-foreground">Reduce PDF file sizes</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                PDF Compression
              </CardTitle>
              <CardDescription>Reduce PDF file sizes while maintaining quality</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Compress PDF files to reduce size while maintaining document quality.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
