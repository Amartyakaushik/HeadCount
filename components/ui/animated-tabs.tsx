"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useState } from "react"

interface AnimatedTabsProps {
  defaultValue: string
  children: React.ReactNode
  className?: string
}

export default function AnimatedTabs({ defaultValue, children, className }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className={className}>
      {children}
    </Tabs>
  )
}

interface AnimatedTabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function AnimatedTabsContent({ value, children, className }: AnimatedTabsContentProps) {
  return (
    <TabsContent value={value} className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TabsContent>
  )
}
