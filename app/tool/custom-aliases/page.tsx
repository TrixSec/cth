"use client"

 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "lucide-react"

export default function CustomAliasesPage() {
  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Custom Aliases</h1>
          <p className="text-muted-foreground">Create custom URL aliases</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                URL Alias Management
              </CardTitle>
              <CardDescription>Create memorable, custom aliases for your URLs</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Link className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Create memorable, custom aliases for your shortened URLs perfect for branding.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
