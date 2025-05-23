"use client"

import { Suspense } from "react"
import EmployeeGrid from "@/components/dashboard/employee-grid"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardStats from "@/components/dashboard/dashboard-stats"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader />

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className="mt-8">
        <EmployeeGrid />
      </div>
    </div>
  )
}

function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  )
}
