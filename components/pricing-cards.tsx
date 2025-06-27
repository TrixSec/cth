"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["10 tools per day", "Basic encryption tools", "Text utilities", "Community support"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    description: "Best for professionals",
    features: [
      "Unlimited tool usage",
      "All premium tools",
      "Priority support",
      "Advanced features",
      "API access",
      "Custom integrations",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$29",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management",
      "SSO integration",
      "Custom branding",
      "Dedicated support",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
]

export function PricingCards() {
  const { user } = useAuth()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
          {plan.popular && (
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          )}

          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== "$0" && <span className="text-muted-foreground">/month</span>}
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              variant={plan.popular ? "default" : "outline"}
              disabled={!user && plan.name !== "Free"}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
