"use client"

import { use } from "react"
import { CategoryToolsGrid } from "@/components/category-tools-grid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { categories, tools } from "@/lib/tools-data"
import { getIcon } from "@/lib/icon-map"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = use(params)

  const category = categories.find((cat) => cat.id === categoryId)

  if (!category) {
    notFound()
  }

  const categoryTools = tools.filter((tool) => tool.category === categoryId)
  const Icon = getIcon(category.iconName)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {categoryTools.length} tools available in this category
          </Badge>
        </div>
      </div>

      <CategoryToolsGrid tools={categoryTools} />
    </div>
  )
}