"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuthStore } from "@/store/auth"
import { useProfileStore } from "@/store/profile"
import { Users, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, isAuthenticated, debugState } = useAuthStore()
  const { resetProfile } = useProfileStore()
  const { toast } = useToast()
  const [redirecting, setRedirecting] = useState(false)

  // Debug auth state on mount
  useEffect(() => {
    console.log("Login page mounted, auth state:", isAuthenticated)
    debugState()

    // Check if already authenticated
    if (isAuthenticated && !redirecting) {
      console.log("Already authenticated, redirecting to dashboard")
      setRedirecting(true)
      window.location.href = "/"
    }
  }, [isAuthenticated, debugState, redirecting])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      console.log("Attempting login with:", email)
      const result = await login(email, password)

      if (result.success) {
        // Update profile with user data
        if (result.userData) {
          console.log("Updating profile with user data:", result.userData)
          resetProfile(result.userData)
        }

        toast({
          title: "Login successful",
          description: "Welcome to HR Dashboard!",
        })
        // The login function will handle the redirect
      } else {
        setError(result.message)
        toast({
          title: "Login failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred")
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (userType: "admin" | "hr" | "manager") => {
    const credentials = {
      admin: { email: "admin@company.com", password: "admin123" },
      hr: { email: "hr@company.com", password: "hr123" },
      manager: { email: "manager@company.com", password: "manager123" },
    }

    setEmail(credentials[userType].email)
    setPassword(credentials[userType].password)
    setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">HR Dashboard</CardTitle>
          <CardDescription>Sign in to manage your employees</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => handleDemoLogin("admin")} type="button">
                Admin (admin@company.com / admin123)
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleDemoLogin("hr")} type="button">
                HR (hr@company.com / hr123)
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleDemoLogin("manager")} type="button">
                Manager (manager@company.com / manager123)
              </Button>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Use the demo accounts above or any valid email/password combination</p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
