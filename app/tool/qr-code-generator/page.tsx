"use client"

import { useState } from "react"
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { QrCode, Download, Palette, Smartphone } from "lucide-react"

export default function QRCodeGeneratorPage() {
  const [qrType, setQrType] = useState("text")
  const [content, setContent] = useState("")
  const [size, setSize] = useState([200])
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [errorCorrection, setErrorCorrection] = useState("M")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const { toast } = useToast()

  // WiFi specific fields
  const [wifiSSID, setWifiSSID] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")
  const [wifiSecurity, setWifiSecurity] = useState("WPA")
  const [wifiHidden, setWifiHidden] = useState(false)

  // Contact specific fields
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactOrg, setContactOrg] = useState("")

  const generateQRCode = () => {
    let qrContent = ""

    switch (qrType) {
      case "text":
        qrContent = content
        break
      case "url":
        qrContent = content
        break
      case "email":
        qrContent = `mailto:${content}`
        break
      case "phone":
        qrContent = `tel:${content}`
        break
      case "sms":
        qrContent = `sms:${content}`
        break
      case "wifi":
        qrContent = `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};H:${wifiHidden ? "true" : "false"};;`
        break
      case "contact":
        qrContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${contactPhone}\nEMAIL:${contactEmail}\nORG:${contactOrg}\nEND:VCARD`
        break
      default:
        qrContent = content
    }

    if (!qrContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter content for the QR code",
        variant: "destructive",
      })
      return
    }

    // Generate QR code URL using QR Server API
    const params = new URLSearchParams({
      size: `${size[0]}x${size[0]}`,
      data: qrContent,
      color: foregroundColor.replace("#", ""),
      bgcolor: backgroundColor.replace("#", ""),
      ecc: errorCorrection,
      format: "png",
    })

    const url = `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`
    setQrCodeUrl(url)

    toast({
      title: "QR Code Generated!",
      description: "Your QR code has been created successfully",
    })
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `qr-code-${Date.now()}.png`
    link.click()
  }

  const renderContentInput = () => {
    switch (qrType) {
      case "wifi":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
              <Input
                id="wifi-ssid"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
                placeholder="My WiFi Network"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password">Password</Label>
              <Input
                id="wifi-password"
                type="password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="WiFi password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-security">Security Type</Label>
              <Select value={wifiSecurity} onValueChange={setWifiSecurity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "contact":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full Name</Label>
              <Input
                id="contact-name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number</Label>
              <Input
                id="contact-phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+1234567890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-org">Organization</Label>
              <Input
                id="contact-org"
                value={contactOrg}
                onChange={(e) => setContactOrg(e.target.value)}
                placeholder="Company Name"
              />
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={getPlaceholder()}
              className="min-h-[100px]"
            />
          </div>
        )
    }
  }

  const getPlaceholder = () => {
    switch (qrType) {
      case "text":
        return "Enter your text here..."
      case "url":
        return "https://example.com"
      case "email":
        return "user@example.com"
      case "phone":
        return "+1234567890"
      case "sms":
        return "+1234567890"
      default:
        return "Enter content..."
    }
  }

  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced QR Code Generator</h1>
          <p className="text-muted-foreground">
            Generate customizable QR codes for text, URLs, WiFi, contacts, and more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code Generator
                </CardTitle>
                <CardDescription>Create custom QR codes with various content types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-type">QR Code Type</Label>
                  <Select value={qrType} onValueChange={setQrType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Plain Text</SelectItem>
                      <SelectItem value="url">Website URL</SelectItem>
                      <SelectItem value="email">Email Address</SelectItem>
                      <SelectItem value="phone">Phone Number</SelectItem>
                      <SelectItem value="sms">SMS Message</SelectItem>
                      <SelectItem value="wifi">WiFi Network</SelectItem>
                      <SelectItem value="contact">Contact Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {renderContentInput()}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size">Size: {size[0]}px</Label>
                    <Slider value={size} onValueChange={setSize} max={500} min={100} step={50} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="error-correction">Error Correction</Label>
                    <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Low (7%)</SelectItem>
                        <SelectItem value="M">Medium (15%)</SelectItem>
                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                        <SelectItem value="H">High (30%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fg-color">Foreground Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fg-color"
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        placeholder="#000000"
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bg-color"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder="#ffffff"
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={generateQRCode} className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            {qrCodeUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated QR Code</CardTitle>
                  <CardDescription>Your QR code is ready to use</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="inline-block p-4 bg-white rounded-lg border">
                    <img src={qrCodeUrl || "/placeholder.svg"} alt="Generated QR Code" className="max-w-full h-auto" />
                  </div>
                  <Button onClick={downloadQRCode} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Quick Styles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => {
                    setForegroundColor("#000000")
                    setBackgroundColor("#ffffff")
                  }}
                >
                  Classic (Black on White)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => {
                    setForegroundColor("#ffffff")
                    setBackgroundColor("#000000")
                  }}
                >
                  Inverted (White on Black)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => {
                    setForegroundColor("#1e40af")
                    setBackgroundColor("#dbeafe")
                  }}
                >
                  Blue Theme
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => {
                    setForegroundColor("#dc2626")
                    setBackgroundColor("#fef2f2")
                  }}
                >
                  Red Theme
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QR Code Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Text</p>
                    <p className="text-muted-foreground">Plain text content</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">URL</p>
                    <p className="text-muted-foreground">Website links</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">WiFi</p>
                    <p className="text-muted-foreground">Network credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-muted-foreground">vCard format</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Usage Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Test QR codes before printing</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Use high contrast colors for better scanning</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Larger sizes work better for distant scanning</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Higher error correction helps with damaged codes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
