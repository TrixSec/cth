"use client"

import { useState } from "react"
import { ToolsGrid } from "@/components/tools-grid"
import { ToolsFilter } from "@/components/tools-filter"
import { tools } from "@/lib/tools-data"

export default function ToolsPage() {
  const [filteredTools, setFilteredTools] = useState(tools)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Tools</h1>
        <p className="text-xl text-muted-foreground">
          Discover our complete collection of security, productivity, and development tools
        </p>
      </div>

      <ToolsFilter tools={tools} onFilter={setFilteredTools} />
      <ToolsGrid tools={filteredTools} />
    </div>
  )
}
