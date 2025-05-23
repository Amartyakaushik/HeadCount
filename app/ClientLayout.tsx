"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
import AuthGuard from "@/components/auth-guard"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Check if current page is login or register
  const isAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {isAuthPage ? (
            // Don't wrap auth pages with AuthGuard
            children
          ) : (
            <AuthGuard>
              <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                  <main className="flex-1 overflow-y-auto bg-background">{children}</main>
                </div>
              </div>
            </AuthGuard>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
