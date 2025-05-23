"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  // Don't redirect if already on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register"

  useEffect(() => {
    if (!isAuthenticated && !isAuthPage) {
      router.push("/login")
    }
  }, [isAuthenticated, router, isAuthPage])

  // Don't show loading spinner on auth pages
  if (!isAuthenticated && !isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
