"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dices } from "lucide-react"

export default function DiceRollerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dice Roller</h1>
          <p className="text-muted-foreground">Roll virtual dice for games</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dices className="h-5 w-5" />
                Virtual Dice
              </CardTitle>
              <CardDescription>Roll dice with customizable sides and quantities</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Dices className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Roll virtual dice with customizable sides and quantities for games and decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
