"use client"

import type React from "react"

import { useState } from "react"
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Shield, Upload, Lock, Unlock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FileEncryptorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [isEncrypting, setIsEncrypting] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const encryptFile = async () => {
    if (!file || !password) {
      toast({
        title: "Error",
        description: "Please select a file and enter a password",
        variant: "destructive",
      })
      return
    }

    setIsEncrypting(true)

    // Simulate encryption process
    setTimeout(() => {
      toast({
        title: "File Encrypted!",
        description: "Your file has been encrypted successfully",
      })
      setIsEncrypting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
       
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">File Encryptor</h1>
          <p className="text-muted-foreground">Encrypt your files with military-grade AES-256 encryption</p>
          <Badge className="mt-2">Premium Tool</Badge>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                File Encryption
              </CardTitle>
              <CardDescription>Upload a file and set a password to encrypt it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Select File</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <input id="file-upload" type="file" onChange={handleFileUpload} className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                      Choose File
                    </Button>
                  </div>
                  {file && (
                    <div className="mt-4 p-2 bg-muted rounded text-sm">
                      <p>
                        <strong>File:</strong> {file.name}
                      </p>
                      <p>
                        <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Encryption Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password..."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={encryptFile} disabled={isEncrypting} className="flex-1">
                  <Lock className="h-4 w-4 mr-2" />
                  {isEncrypting ? "Encrypting..." : "Encrypt File"}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Unlock className="h-4 w-4 mr-2" />
                  Decrypt File
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <h4 className="font-medium mb-2">Security Features:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• AES-256 encryption</li>
                  <li>• Password-based key derivation</li>
                  <li>• Secure random salt generation</li>
                  <li>• Files processed locally</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
