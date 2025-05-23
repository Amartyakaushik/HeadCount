import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Employee } from "@/types/employee"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function calculateAverageRating(employees: Employee[]): number {
  if (employees.length === 0) return 0

  const sum = employees.reduce((total, employee) => total + employee.performanceRating, 0)
  return sum / employees.length
}

export function getTopPerformers(employees: Employee[], limit: number): Employee[] {
  return [...employees].sort((a, b) => b.performanceRating - a.performanceRating).slice(0, limit)
}

interface FilterOptions {
  search?: string
  departments?: string[]
  ratings?: number[]
}

export function filterEmployees(employees: Employee[], options: FilterOptions): Employee[] {
  let filtered = [...employees]

  // Filter by search query
  if (options.search) {
    const searchLower = options.search.toLowerCase()
    filtered = filtered.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchLower) ||
        employee.lastName.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower),
    )
  }

  // Filter by departments
  if (options.departments && options.departments.length > 0) {
    filtered = filtered.filter((employee) => options.departments!.includes(employee.department))
  }

  // Filter by ratings
  if (options.ratings && options.ratings.length > 0) {
    filtered = filtered.filter((employee) => options.ratings!.includes(Math.floor(employee.performanceRating)))
  }

  return filtered
}
