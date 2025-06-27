"use client"

import { useUsage } from "@/hooks/use-usage"
import { useToast } from "@/hooks/use-toast"

export function useCredits() {
  const { useCredits: useCreditsFromUsage } = useUsage()
  const { toast } = useToast()

  const handleUseCredits = async (toolName: string, isPremium: boolean): Promise<boolean> => {
    let success: boolean | null = null

    try {
      // Hook call remains at top level
      success = useCreditsFromUsage(toolName, isPremium)

      if (success) {
        toast({
          title: "Credits Used",
          description: `${isPremium ? 5 : 1} credit${isPremium ? "s" : ""} used for ${toolName}`,
        })
        return true
      } else {
        toast({
          title: "Insufficient Credits",
          description: "You don't have enough credits to use this tool",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process credits",
        variant: "destructive",
      })
      return false
    }
  }

  return handleUseCredits
}
