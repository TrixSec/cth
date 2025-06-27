import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cipher Tools Hub - Advanced Security & Productivity Tools",
  description:
    "Professional-grade tools for security, encryption, productivity, and development. Generate passwords, hash data, compress images, and more.",
  keywords: "password generator, hash generator, encryption tools, productivity tools, developer utilities",
  authors: [{ name: "Cipher Tools Hub" }],
  creator: "Cipher Tools Hub",
  publisher: "Cipher Tools Hub",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ciphertoolshub.com",
    title: "Cipher Tools Hub - Advanced Security & Productivity Tools",
    description: "Professional-grade tools for security, encryption, productivity, and development.",
    siteName: "Cipher Tools Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipher Tools Hub - Advanced Security & Productivity Tools",
    description: "Professional-grade tools for security, encryption, productivity, and development.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <SidebarProvider defaultOpen={false} collapsible="offcanvas">
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                </div>
              </div>
              <Toaster />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
