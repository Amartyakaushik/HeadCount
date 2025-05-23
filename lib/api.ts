import type { Employee } from "@/types/employee"
import { departments } from "@/lib/data"

// Cache for employees data
let employeesCache: Employee[] | null = null

export async function getEmployees(): Promise<Employee[]> {
  // Return from cache if available
  if (employeesCache) {
    return employeesCache
  }

  try {
    const response = await fetch("https://dummyjson.com/users?limit=20")

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    const data = await response.json()

    // Transform the data to match our Employee type
    const employees: Employee[] = data.users.map((user: any) => {
      // Generate a random department
      const department = departments[Math.floor(Math.random() * departments.length)]

      // Generate a random performance rating (1-5)
      const performanceRating = Math.floor(Math.random() * 5) + 1

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        image: user.image,
        address: user.address,
        phone: user.phone,
        department,
        performanceRating,
      }
    })

    // Cache the results
    employeesCache = employees

    return employees
  } catch (error) {
    console.error("Error fetching employees:", error)
    return []
  }
}

export async function getEmployee(id: string): Promise<Employee> {
  const employees = await getEmployees()
  const employee = employees.find((emp) => emp.id.toString() === id)

  if (!employee) {
    throw new Error(`Employee with ID ${id} not found`)
  }

  return employee
}
