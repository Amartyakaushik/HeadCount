"use client"

import { useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useEmployeeStore } from "@/store/employees"
import EmployeeCard from "@/components/dashboard/employee-card"
import { Skeleton } from "@/components/ui/skeleton"
import { filterEmployees } from "@/lib/utils"
import EmptyState from "@/components/ui/empty-state"
import { Users } from "lucide-react"

export default function EmployeeGrid() {
  const { employees, fetchEmployees, isLoading, hasInitialized } = useEmployeeStore()
  const searchParams = useSearchParams()

  // Only fetch employees once when component mounts
  useEffect(() => {
    if (!hasInitialized) {
      fetchEmployees()
    }
  }, [hasInitialized, fetchEmployees])

  // Use useMemo to filter employees instead of useState + useEffect
  const filteredEmployees = useMemo(() => {
    const search = searchParams.get("search")
    const departments = searchParams.get("departments")?.split(",")
    const ratings = searchParams.get("ratings")?.split(",").map(Number)

    return filterEmployees(employees, {
      search: search || undefined,
      departments: departments || undefined,
      ratings: ratings || undefined,
    })
  }, [employees, searchParams])

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (filteredEmployees.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-12 w-12" />}
        title="No employees found"
        description={
          searchParams.get("search") || searchParams.get("departments") || searchParams.get("ratings")
            ? "Try adjusting your search or filter criteria"
            : "Add employees to get started"
        }
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Employees ({filteredEmployees.length})</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  )
}
