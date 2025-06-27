import { PricingCards } from "@/components/pricing-cards"
import { PricingFAQ } from "@/components/pricing-faq"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works best for you. Upgrade or downgrade at any time.
        </p>
      </div>

      <PricingCards />
      <PricingFAQ />
    </div>
  )
}
