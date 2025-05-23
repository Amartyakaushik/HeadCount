"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmployeeStore } from "@/store/employees"
import { calculateAverageRating, getTopPerformers } from "@/lib/utils"
import { Users, TrendingUp, Award, Briefcase } from "lucide-react"

export default function DashboardStats() {
  const { employees, fetchEmployees, hasInitialized } = useEmployeeStore()

  useEffect(() => {
    if (!hasInitialized) {
      fetchEmployees()
    }
  }, [hasInitialized, fetchEmployees])

  const totalEmployees = employees.length
  const averageRating = calculateAverageRating(employees)
  const topPerformers = getTopPerformers(employees, 5)
  const departmentCounts = employees.reduce(
    (acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const departmentCount = Object.keys(departmentCounts).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <p className="text-xs text-muted-foreground">Across {departmentCount} departments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Out of 5.0 performance score</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topPerformers.length}</div>
          <p className="text-xs text-muted-foreground">Employees with 4.5+ rating</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departments</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{departmentCount}</div>
          <p className="text-xs text-muted-foreground">Active departments</p>
        </CardContent>
      </Card>
    </div>
  )
}
