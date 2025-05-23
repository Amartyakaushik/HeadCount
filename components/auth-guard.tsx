"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, debugState } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [redirecting, setRedirecting] = useState(false)

  // Don't redirect if already on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register"

  useEffect(() => {
    // Debug the current auth state
    debugState()

    console.log("AuthGuard: isAuthenticated =", isAuthenticated)
    console.log("AuthGuard: pathname =", pathname)
    console.log("AuthGuard: isAuthPage =", isAuthPage)

    // Add a small delay to ensure state is stable
    const timer = setTimeout(() => {
      if (!isAuthenticated && !isAuthPage && !redirecting) {
        console.log("AuthGuard: Redirecting to login")
        setRedirecting(true)
        window.location.href = "/login"
      } else if (isAuthenticated && isAuthPage && !redirecting) {
        console.log("AuthGuard: Redirecting to dashboard")
        setRedirecting(true)
        window.location.href = "/"
      } else {
        setIsLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isAuthenticated, pathname, isAuthPage, redirecting, debugState])

  // Don't show loading spinner on auth pages
  if (isLoading && !isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}


// "use client"

// import type React from "react"

// import { useEffect } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import { useAuthStore } from "@/store/auth"

// interface AuthGuardProps {
//   children: React.ReactNode
// }

// export default function AuthGuard({ children }: AuthGuardProps) {
//   const { isAuthenticated } = useAuthStore()
//   const router = useRouter()
//   const pathname = usePathname()

//   // Don't redirect if already on auth pages
//   const isAuthPage = pathname === "/login" || pathname === "/register"

//   useEffect(() => {
//     console.log("AuthGuard: isAuthenticated =", isAuthenticated)
//     console.log("AuthGuard: pathname =", pathname)
//     console.log("AuthGuard: isAuthPage =", isAuthPage)

//     if (!isAuthenticated && !isAuthPage) {
//       console.log("AuthGuard: Redirecting to login")
//       router.push("/login")
//     } else if (isAuthenticated && isAuthPage) {
//       console.log("AuthGuard: Redirecting to dashboard")
//       router.push("/")
//     }
//   }, [isAuthenticated, router, isAuthPage, pathname])

//   // Don't show loading spinner on auth pages
//   if (!isAuthenticated && !isAuthPage) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   return <>{children}</>
// }
