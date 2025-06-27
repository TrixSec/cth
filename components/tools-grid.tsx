"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getIcon } from "@/lib/icon-map"
import type { Tool } from "@/lib/tools-data"
import { Crown } from "lucide-react"

interface ToolsGridProps {
  tools?: Tool[]
  showCategory?: boolean
  maxItems?: number
}

export function ToolsGrid({ tools = [], showCategory = false, maxItems }: ToolsGridProps) {
  const displayTools = maxItems ? tools.slice(0, maxItems) : tools

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tools found for the selected category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayTools.map((tool) => {
        const IconComponent = getIcon(tool.iconName)
        return (
          <Link key={tool.id} href={`/tool/${tool.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
                      {showCategory && <p className="text-xs text-muted-foreground mt-1 capitalize">{tool.category}</p>}
                    </div>
                  </div>
                  {tool.isPremium && (
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                    >
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">{tool.credits} credit(s)</span>
                  <span className="text-xs text-primary font-medium group-hover:underline">Try it →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
