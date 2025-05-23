"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, BarChart3, Bookmark, Settings, HelpCircle, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)} className="rounded-full">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn("fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r bg-background transition-transform duration-300",
          "md:relative md:translate-x-0 md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Users className="h-6 w-6" />
            <span>HR Dashboard</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="ml-auto md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <div className="space-y-1">
              {sidebarLinks.map((link) => (
                <Button
                  key={link.href}
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", pathname === link.href ? "bg-secondary" : "")}
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={link.href}>
                    <link.icon className="mr-2 h-5 w-5" />
                    {link.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
