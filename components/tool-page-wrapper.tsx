"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { getIcon } from "@/lib/icon-map"
import type { Tool } from "@/lib/tools-data"

interface ToolPageWrapperProps {
  tool: Tool
  children?: React.ReactNode
}

export function ToolPageWrapper({ tool, children }: ToolPageWrapperProps) {
  const IconComponent = getIcon(tool.iconName)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/tools">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{tool.name}</h1>
                  {tool.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tool Content */}
          <div className="lg:col-span-3">
            {children || (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Coming Soon
                  </CardTitle>
                  <CardDescription>
                    This tool is currently under development and will be available soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="p-4 rounded-lg bg-muted/50 inline-block mb-4">
                      <IconComponent className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">{tool.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">This tool will be available in a future update.</p>
                      <p className="text-sm text-muted-foreground">
                        Check back soon or explore our other available tools.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tool Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Category</h4>
                  <Badge variant="outline" className="capitalize">
                    {tool.category.replace("-", " ")}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Credits Required</h4>
                  <p className="text-sm text-muted-foreground">
                    {tool.credits} credit{tool.credits !== 1 ? "s" : ""} per use
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Access Level</h4>
                  <p className="text-sm text-muted-foreground">
                    {tool.isPremium ? "Premium subscribers only" : "Free for all users"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
