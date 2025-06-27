"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, Shield, Globe } from "lucide-react"

const stats = [
  {
    name: "Active Users",
    value: "10,000+",
    description: "Developers and professionals trust our tools",
    icon: Users,
  },
  {
    name: "Tools Available",
    value: "50+",
    description: "Comprehensive suite of online utilities",
    icon: Zap,
  },
  {
    name: "Uptime",
    value: "99.9%",
    description: "Reliable service you can count on",
    icon: Shield,
  },
  {
    name: "Countries",
    value: "150+",
    description: "Used worldwide by global teams",
    icon: Globe,
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Trusted Worldwide
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Join thousands of satisfied users</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform is trusted by developers, designers, and professionals worldwide for their daily tool needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="font-medium mb-1">{stat.name}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
