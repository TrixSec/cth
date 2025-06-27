"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat } from "lucide-react"

export default function RecipeFinderPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Recipe Finder</h1>
          <p className="text-muted-foreground">Find recipes based on ingredients</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Recipe Discovery
              </CardTitle>
              <CardDescription>Find recipes based on available ingredients</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <ChefHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Discover recipes based on ingredients, dietary restrictions, and preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
