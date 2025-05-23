import type React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
        className,
      )}
    >
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
          <div className="text-muted-foreground">{icon}</div>
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-6">{description}</p>
      {action}
    </div>
  )
}
