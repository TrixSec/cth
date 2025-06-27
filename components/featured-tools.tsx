"use client"

import { ToolsGrid } from "@/components/tools-grid"
import { getFeaturedTools } from "@/lib/tools-data"

export function FeaturedTools() {
  const featuredTools = getFeaturedTools()

  return (
    <section className="py-12">
      <div className="container px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with our most popular free tools. No account required.
          </p>
        </div>
        <ToolsGrid tools={featuredTools} />
      </div>
    </section>
  )
}
