"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Camera } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AvatarUploadProps {
  currentAvatar: string
  onAvatarChange: (avatar: string) => void
  fallbackText: string
  size?: "sm" | "md" | "lg"
}

export default function AvatarUpload({ currentAvatar, onAvatarChange, fallbackText, size = "md" }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20",
    lg: "h-24 w-24",
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Convert to base64 for persistence
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64String = e.target?.result as string
      onAvatarChange(base64String)
      setIsUploading(false)

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully",
      })
    }

    reader.onerror = () => {
      setIsUploading(false)
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    }

    reader.readAsDataURL(file)
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={currentAvatar || "/placeholder.svg"} alt="Profile" />
          <AvatarFallback className="text-xl">{fallbackText}</AvatarFallback>
        </Avatar>

        <Button
          variant="outline"
          size="icon"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
          onClick={triggerFileSelect}
          disabled={isUploading}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <Button variant="outline" onClick={triggerFileSelect} disabled={isUploading}>
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Change Avatar"}
        </Button>
        <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
