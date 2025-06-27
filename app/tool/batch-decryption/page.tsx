"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderOpen } from "lucide-react"

export default function BatchDecryptionPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Batch Decryption</h1>
          <p className="text-muted-foreground">Decrypt multiple files at once</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Bulk File Decryption
              </CardTitle>
              <CardDescription>Process multiple encrypted files simultaneously</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Decrypt multiple files simultaneously to save time and effort.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
