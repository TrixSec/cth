"use client"

import { CategoryGrid } from "@/components/category-grid"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tool Categories</h1>
        <p className="text-xl text-muted-foreground">Browse tools by category to find exactly what you need</p>
      </div>

      <CategoryGrid />
    </div>
  )
}
