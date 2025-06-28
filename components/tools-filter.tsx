// components/tools-filter.tsx
"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import { categories, Tool } from "@/lib/tools-data"
import { getIcon } from "@/lib/icon-map"

interface ToolsFilterProps {
  tools: Tool[]
  onFilter: Dispatch<SetStateAction<Tool[]>>
}

export function ToolsFilter({ tools: allTools, onFilter }: ToolsFilterProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [premiumFilter, setPremiumFilter] = useState<boolean | null>(null)

  // Apply filters whenever they change
  useEffect(() => {
    const filtered = allTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                          tool.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !selectedCategory || tool.category === selectedCategory
      const matchesPremium = premiumFilter === null || tool.isPremium === premiumFilter
      
      return matchesSearch && matchesCategory && matchesPremium
    })
    
    onFilter(filtered)
  }, [search, selectedCategory, premiumFilter, allTools, onFilter])

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? "" : categoryId)
  }

  const handlePremiumFilter = (isPremium: boolean | null) => {
    setPremiumFilter(isPremium)
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedCategory("")
    setPremiumFilter(null)
  }

  const hasActiveFilters = search || selectedCategory || premiumFilter !== null

  // Count tools in each category from the original list
  const categoryCounts = categories.map(category => ({
    ...category,
    count: allTools.filter(tool => tool.category === category.id).length
  }))

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters</span>
              <Badge variant="secondary">{allTools.length} tools</Badge>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          {/* Premium Filter */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Access Level</span>
            <div className="flex gap-2">
              <Button
                variant={premiumFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => handlePremiumFilter(null)}
              >
                All Tools
              </Button>
              <Button
                variant={premiumFilter === false ? "default" : "outline"}
                size="sm"
                onClick={() => handlePremiumFilter(false)}
              >
                Free Tools
              </Button>
              <Button
                variant={premiumFilter === true ? "default" : "outline"}
                size="sm"
                onClick={() => handlePremiumFilter(true)}
              >
                Premium Tools
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <span className="text-sm font-medium">Categories</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {categoryCounts.map((category) => {
                const Icon = getIcon(category.iconName)
                const isSelected = selectedCategory === category.id

                return (
                  <Button
                    key={category.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.id)}
                    className="justify-between h-auto p-3"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-medium truncate">{category.name}</span>
                    </div>
                    <Badge variant={isSelected ? "secondary" : "outline"} className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}