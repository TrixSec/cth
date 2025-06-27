"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Unlock } from "lucide-react"

export default function MD5DecryptPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">MD5 Decrypt</h1>
          <p className="text-muted-foreground">Decrypt MD5 hashes with ease</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Unlock className="h-5 w-5" />
                MD5 Hash Decryption
              </CardTitle>
              <CardDescription>Attempt to decrypt MD5 hashes using rainbow tables</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Unlock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Attempt to decrypt MD5 hashes using rainbow tables and common password databases.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
