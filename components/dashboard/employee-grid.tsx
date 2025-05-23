"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useEmployeeStore } from "@/store/employees"
import EmployeeCard from "@/components/dashboard/employee-card"
import { Skeleton } from "@/components/ui/skeleton"
import { filterEmployees } from "@/lib/utils"
import EmptyState from "@/components/ui/empty-state"
import { Users, AlertCircle, RefreshCw } from "lucide-react"
import Pagination from "./pagination"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ITEMS_PER_PAGE = 8

export default function EmployeeGrid() {
  const { employees, fetchEmployees, isLoading, hasInitialized, error } = useEmployeeStore()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [displayedEmployees, setDisplayedEmployees] = useState<typeof employees>([])

  // Only fetch employees once when component mounts
  useEffect(() => {
    if (!hasInitialized) {
      fetchEmployees()
    }
  }, [hasInitialized, fetchEmployees])

  // Filter employees based on search params
  const search = searchParams.get("search") || ""
  const departmentsParam = searchParams.get("departments") || ""
  const ratingsParam = searchParams.get("ratings") || ""

  const departments = departmentsParam ? departmentsParam.split(",").filter(Boolean) : []
  const ratings = ratingsParam ? ratingsParam.split(",").map(Number).filter(Boolean) : []

  // Apply filters and update pagination whenever filters or employees change
  useEffect(() => {
    const filtered = filterEmployees(employees, {
      search: search || undefined,
      departments: departments.length ? departments : undefined,
      ratings: ratings.length ? ratings : undefined,
    })

    // Reset to page 1 when filters change
    setCurrentPage(1)

    // Calculate which employees to display
    const startIndex = 0 // Always start at 0 when filters change
    const endIndex = startIndex + ITEMS_PER_PAGE
    setDisplayedEmployees(filtered.slice(startIndex, endIndex))

    console.log(`Filtered ${filtered.length} employees, showing ${filtered.slice(startIndex, endIndex).length}`)
  }, [employees, search, departmentsParam, ratingsParam])

  // Handle page change
  const handlePageChange = (newPage: number) => {
    console.log(`Changing to page ${newPage}`)

    // Apply filters again to get the full filtered list
    const filtered = filterEmployees(employees, {
      search: search || undefined,
      departments: departments.length ? departments : undefined,
      ratings: ratings.length ? ratings : undefined,
    })

    // Calculate which employees to display for the new page
    const startIndex = (newPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    // Update state
    setCurrentPage(newPage)
    setDisplayedEmployees(filtered.slice(startIndex, endIndex))

    console.log(
      `Page ${newPage}: showing employees ${startIndex + 1}-${Math.min(endIndex, filtered.length)} of ${filtered.length}`,
    )

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Get the full filtered list for pagination calculations
  const filteredEmployees = filterEmployees(employees, {
    search: search || undefined,
    departments: departments.length ? departments : undefined,
    ratings: ratings.length ? ratings : undefined,
  })

  const totalItems = filteredEmployees.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  // Handle retry
  const handleRetry = () => {
    fetchEmployees()
  }

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

  // Show error state with retry button
  if (error && employees.length === 0) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading employees</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button onClick={handleRetry} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
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
          search || departmentsParam || ratingsParam
            ? "Try adjusting your search or filter criteria"
            : "Add employees to get started"
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>{error} - Using locally generated data instead.</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Employees ({filteredEmployees.length})
          {totalPages > 1 && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedEmployees.map((employee) => (
          <EmployeeCard key={`${employee.id}-page-${currentPage}`} employee={employee} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={totalItems}
          />
        </div>
      )}
    </div>
  )
}
