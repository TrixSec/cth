"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Copy, Link, BarChart3, QrCode, Calendar, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface ShortenedUrl {
  id: string
  originalUrl: string
  shortUrl: string
  customAlias?: string
  clicks: number
  createdAt: Date
  expiresAt?: Date
  qrCode: string
}

export default function URLShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [customAlias, setCustomAlias] = useState("")
  const [useCustomAlias, setUseCustomAlias] = useState(false)
  const [expirationDays, setExpirationDays] = useState("")
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const generateShortCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const generateQRCode = (url: string) => {
    // In a real implementation, you'd use a QR code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
  }

  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      })
      return
    }

    if (!isValidUrl(originalUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL (include http:// or https://)",
        variant: "destructive",
      })
      return
    }

    if (useCustomAlias && !customAlias.trim()) {
      toast({
        title: "Error",
        description: "Please enter a custom alias",
        variant: "destructive",
      })
      return
    }

    if (useCustomAlias && shortenedUrls.some((url) => url.customAlias === customAlias)) {
      toast({
        title: "Error",
        description: "This custom alias is already taken",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const shortCode = useCustomAlias ? customAlias : generateShortCode()
      const shortUrl = `https://short.ly/${shortCode}`
      const expiresAt = expirationDays
        ? new Date(Date.now() + Number.parseInt(expirationDays) * 24 * 60 * 60 * 1000)
        : undefined

      const newUrl: ShortenedUrl = {
        id: crypto.randomUUID(),
        originalUrl,
        shortUrl,
        customAlias: useCustomAlias ? customAlias : undefined,
        clicks: 0,
        createdAt: new Date(),
        expiresAt,
        qrCode: generateQRCode(shortUrl),
      }

      setShortenedUrls((prev) => [newUrl, ...prev])

      // Reset form
      setOriginalUrl("")
      setCustomAlias("")
      setExpirationDays("")
      setUseCustomAlias(false)

      toast({
        title: "URL Shortened!",
        description: "Your URL has been shortened successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      })
    }
  }

  const simulateClick = (id: string) => {
    setShortenedUrls((prev) => prev.map((url) => (url.id === id ? { ...url, clicks: url.clicks + 1 } : url)))
  }

  const isExpired = (url: ShortenedUrl) => {
    return url.expiresAt && url.expiresAt < new Date()
  }

  const getTotalClicks = () => {
    return shortenedUrls.reduce((total, url) => total + url.clicks, 0)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced URL Shortener</h1>
          <p className="text-muted-foreground">
            Create short, trackable links with custom aliases, expiration dates, and QR codes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* URL Shortener Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Shorten URL
                </CardTitle>
                <CardDescription>Create a shortened version of your long URL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="original-url">Original URL</Label>
                  <Input
                    id="original-url"
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="https://example.com/very-long-url..."
                    className="font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="custom-alias" checked={useCustomAlias} onCheckedChange={setUseCustomAlias} />
                  <Label htmlFor="custom-alias">Use custom alias</Label>
                </div>

                {useCustomAlias && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-alias-input">Custom Alias</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        short.ly/
                      </span>
                      <Input
                        id="custom-alias-input"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
                        placeholder="my-custom-link"
                        className="rounded-l-none font-mono"
                        maxLength={20}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration (optional)</Label>
                  <Input
                    id="expiration"
                    type="number"
                    value={expirationDays}
                    onChange={(e) => setExpirationDays(e.target.value)}
                    placeholder="Days until expiration"
                    min="1"
                    max="365"
                  />
                </div>

                <Button onClick={shortenUrl} disabled={isProcessing} className="w-full">
                  <Link className="h-4 w-4 mr-2" />
                  {isProcessing ? "Shortening..." : "Shorten URL"}
                </Button>
              </CardContent>
            </Card>

            {/* Shortened URLs List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Shortened URLs</CardTitle>
                <CardDescription>Manage and track your shortened links</CardDescription>
              </CardHeader>
              <CardContent>
                {shortenedUrls.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No URLs shortened yet</p>
                ) : (
                  <div className="space-y-4">
                    {shortenedUrls.map((url) => (
                      <div
                        key={url.id}
                        className={`p-4 border rounded-lg space-y-3 ${isExpired(url) ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm truncate">{url.shortUrl}</p>
                              {isExpired(url) && <Badge variant="destructive">Expired</Badge>}
                              {url.customAlias && <Badge variant="outline">Custom</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{url.originalUrl}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BarChart3 className="h-3 w-3" />
                                {url.clicks} clicks
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {url.createdAt.toLocaleDateString()}
                              </span>
                              {url.expiresAt && <span>Expires: {url.expiresAt.toLocaleDateString()}</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(url.shortUrl)}
                            disabled={isExpired(url)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              simulateClick(url.id)
                              window.open(url.originalUrl, "_blank")
                            }}
                            disabled={isExpired(url)}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => window.open(url.qrCode, "_blank")}>
                            <QrCode className="h-3 w-3 mr-1" />
                            QR Code
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{shortenedUrls.length}</div>
                    <div className="text-xs text-muted-foreground">Total URLs</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{getTotalClicks()}</div>
                    <div className="text-xs text-muted-foreground">Total Clicks</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Active URLs</div>
                  <div className="text-2xl font-bold">{shortenedUrls.filter((url) => !isExpired(url)).length}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Custom Aliases</div>
                  <div className="text-2xl font-bold">{shortenedUrls.filter((url) => url.customAlias).length}</div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Custom aliases for branded links</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Click tracking and analytics</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>QR code generation</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Expiration date settings</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Bulk URL management</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
