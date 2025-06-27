"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"

export default function SQLFormatterPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">SQL Formatter</h1>
          <p className="text-muted-foreground">Format and beautify SQL queries</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                SQL Formatting
              </CardTitle>
              <CardDescription>Format SQL queries for better readability</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Database className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Professional SQL formatting with syntax highlighting and validation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
