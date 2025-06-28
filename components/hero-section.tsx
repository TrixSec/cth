"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/hooks/use-auth"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <Zap className="mr-1 h-3 w-3" />
              50+ Tools Available
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Your Ultimate
              <span className="text-primary"> Online Tools </span>
              Platform
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Access powerful encryption, development, and productivity tools all in one place. From password generators
              to file converters, we've got everything you need.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user ? (
                <Button size="lg" asChild>
                  <Link href="/tools">
                    Explore Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" onClick={() => setShowAuthModal(true)}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              <Button variant="outline" size="lg" asChild>
                <Link href="/tools">View All Tools</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                  Secure & Private
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  All processing happens locally in your browser. Your data never leaves your device.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  Lightning Fast
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Optimized tools that work instantly without any delays or loading times.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  Developer Friendly
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Built by developers, for developers. Clean interfaces and powerful features.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
        defaultTab="signup" 
      />
    </>
  )
}