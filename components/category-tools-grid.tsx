"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getIcon } from "@/lib/icon-map"
import { Crown, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Tool } from "@/lib/tools-data"

interface CategoryToolsGridProps {
  tools: Tool[]
}

export function CategoryToolsGrid({ tools = [] }: CategoryToolsGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <h3 className="text-lg font-semibold mb-2">No tools found</h3>
          <p className="text-muted-foreground mb-4">
            No tools found for the selected category. Try browsing other categories or check back later.
          </p>
          <Button asChild>
            <Link href="/tools">Browse All Tools</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => {
        const Icon = getIcon(tool.iconName)

        return (
          <Card
            key={tool.id}
            className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold truncate">{tool.name}</CardTitle>
                    {tool.isPremium && (
                      <Badge variant="secondary" className="mt-1">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {tool.description}
              </CardDescription>

              {tool.tags && tool.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tool.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tool.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <Button asChild className="w-full group">
                <Link href={`/tool/${tool.slug}`}>
                  Use Tool
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
