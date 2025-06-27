import { HeroSection } from "@/components/hero-section"
import { FeaturedTools } from "@/components/featured-tools"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedTools />
      <StatsSection />
    </div>
  )
}
