"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useUsage } from "@/hooks/use-usage"
import { getIcon } from "@/lib/icon-map"
import { categories, tools } from "@/lib/tools-data"
import { Home, Wrench, CreditCard, User, Crown, LogIn, UserPlus, Grid3X3, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "All Tools", href: "/tools", icon: Wrench },
  { name: "Categories", href: "/categories", icon: Grid3X3 },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { credits, maxCredits, usagePercentage, usedToday } = useUsage()
  const { isMobile, setOpen } = useSidebar()

  // Close sidebar on navigation for mobile
  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [pathname, isMobile, setOpen])

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sidebar collapsible="offcanvas" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            CTH
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base">Cipher Tools Hub</span>
            <span className="text-sm text-muted-foreground">Online Tools Platform</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium px-2 py-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} className="h-10 px-3">
                      <Link href={item.href} onClick={handleLinkClick}>
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium px-2 py-2">Tool Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between h-10 px-3 mb-2">
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="h-5 w-5" />
                    <span className="text-sm font-medium">Browse All Categories</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="ml-4 space-y-1">
                  {categories.map((category) => {
                    const Icon = getIcon(category.iconName)
                    const toolCount = tools.filter((tool) => tool.category === category.id).length
                    return (
                      <SidebarMenuSubItem key={category.id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === `/categories/${category.id}`}
                          className="h-9 px-3 w-full justify-between"
                        >
                          <Link href={`/categories/${category.id}`} onClick={handleLinkClick}>
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <Icon className="h-4 w-4 flex-shrink-0" />
                              <span className="text-sm truncate">{category.name}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs px-2 py-0.5 flex-shrink-0">
                              {toolCount}
                            </Badge>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm font-medium px-2 py-2">Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/profile"} className="h-10 px-3">
                    <Link href="/profile" onClick={handleLinkClick}>
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="text-sm font-medium">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </p>
                <p className="text-xs text-muted-foreground truncate">{usedToday} tools used today</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Credits</span>
                <Badge variant={credits > 10 ? "default" : "destructive"} className="text-xs">
                  {credits}/{maxCredits}
                </Badge>
              </div>
              <Progress value={usagePercentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {Math.round(usagePercentage)}% used this month
              </div>
            </div>

            <Button size="sm" className="w-full" asChild>
              <Link href="/pricing" onClick={handleLinkClick}>
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground text-center mb-4">
              Sign in to track usage and access premium tools
            </div>
            <Button size="sm" variant="default" className="w-full" asChild>
              <Link href="/login" onClick={handleLinkClick}>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/signup" onClick={handleLinkClick}>
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
