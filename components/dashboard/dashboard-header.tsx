"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, UserPlus, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { departments } from "@/lib/data"
import CreateEmployeeForm from "@/components/dashboard/create-employee-form"

export default function DashboardHeader() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  // Filter state
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (searchQuery.trim()) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }

    router.push(`/?${params.toString()}`)
  }

  const handleFilterApply = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedDepartments.length > 0) {
      params.set("departments", selectedDepartments.join(","))
    } else {
      params.delete("departments")
    }

    if (selectedRatings.length > 0) {
      params.set("ratings", selectedRatings.join(","))
    } else {
      params.delete("ratings")
    }

    router.push(`/?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setSelectedDepartments([])
    setSelectedRatings([])

    const params = new URLSearchParams(searchParams.toString())
    params.delete("departments")
    params.delete("ratings")

    router.push(`/?${params.toString()}`)
  }

  const toggleDepartment = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department],
    )
  }

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor employee performance</p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Employees</SheetTitle>
                <SheetDescription>Filter employees by department and performance rating</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Departments</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {departments.map((department) => (
                      <div key={department} className="flex items-center space-x-2">
                        <Checkbox
                          id={`department-${department}`}
                          checked={selectedDepartments.includes(department)}
                          onCheckedChange={() => toggleDepartment(department)}
                        />
                        <Label htmlFor={`department-${department}`}>{department}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Performance Rating</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => toggleRating(rating)}
                        />
                        <Label htmlFor={`rating-${rating}`}>
                          {rating} Star{rating !== 1 ? "s" : ""}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
                <Button onClick={handleFilterApply}>Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>Create a new employee profile in the system</DialogDescription>
              </DialogHeader>
              <CreateEmployeeForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, email, or department..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => {
                  setSearchQuery("")
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete("search")
                  router.push(`/?${params.toString()}`)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button type="submit">Search</Button>
        </form>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80%]">
            <SheetHeader>
              <SheetTitle>Filter Employees</SheetTitle>
              <SheetDescription>Filter employees by department and performance rating</SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Departments</h3>
                <div className="grid grid-cols-2 gap-2">
                  {departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-department-${department}`}
                        checked={selectedDepartments.includes(department)}
                        onCheckedChange={() => toggleDepartment(department)}
                      />
                      <Label htmlFor={`mobile-department-${department}`}>{department}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Performance Rating</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={() => toggleRating(rating)}
                      />
                      <Label htmlFor={`mobile-rating-${rating}`}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
              <Button onClick={handleFilterApply}>Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
