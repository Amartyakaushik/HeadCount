import type { Employee } from "@/types/employee"
import { departments } from "@/lib/data"

// Cache for employees data
let employeesCache: Employee[] | null = null

// Seed for consistent random generation
const SEED = 12345

// Simple seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate mock employee data
function generateMockEmployees(count = 20): Employee[] {
  const mockEmployees: Employee[] = []

  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "David",
    "Sarah",
    "Robert",
    "Lisa",
    "William",
    "Emma",
    "James",
    "Olivia",
    "Daniel",
    "Sophia",
    "Matthew",
    "Ava",
    "Christopher",
    "Mia",
    "Andrew",
    "Isabella",
  ]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
    "Martinez",
    "Anderson",
    "Taylor",
    "Thomas",
    "Hernandez",
    "Moore",
    "Martin",
    "Jackson",
    "Thompson",
    "White",
  ]

  for (let i = 0; i < count; i++) {
    const id = i + 1
    const userSeed = SEED + id

    const firstName = firstNames[Math.floor(seededRandom(userSeed) * firstNames.length)]
    const lastName = lastNames[Math.floor(seededRandom(userSeed + 100) * lastNames.length)]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
    const age = Math.floor(seededRandom(userSeed + 200) * 30) + 25 // Age between 25-55

    // Generate a consistent random department
    const departmentIndex = Math.floor(seededRandom(userSeed + 300) * departments.length)
    const department = departments[departmentIndex]

    // Generate a consistent random performance rating (1-5)
    const performanceRating = Math.floor(seededRandom(userSeed + 400) * 5) + 1

    mockEmployees.push({
      id,
      firstName,
      lastName,
      email,
      age,
      gender: seededRandom(userSeed + 500) > 0.5 ? "male" : "female",
      image: `/placeholder.svg?height=100&width=100&text=${firstName[0]}${lastName[0]}`,
      address: {
        city: "New York",
        state: "NY",
      },
      phone: `+1 (555) ${Math.floor(100 + seededRandom(userSeed + 600) * 900)}-${Math.floor(1000 + seededRandom(userSeed + 700) * 9000)}`,
      department,
      performanceRating,
    })
  }

  return mockEmployees
}

export async function getEmployees(): Promise<Employee[]> {
  // Return from cache if available
  if (employeesCache) {
    console.log("Returning cached employee data")
    return employeesCache
  }

  try {
    console.log("Attempting to fetch employees from API...")

    // Set a timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch("https://dummyjson.com/users?limit=20", {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data to match our Employee type with consistent random generation
    const employees: Employee[] = data.users.map((user: any, index: number) => {
      // Use user ID + index as seed for consistent randomization
      const userSeed = SEED + user.id + index

      // Generate a consistent random department
      const departmentIndex = Math.floor(seededRandom(userSeed) * departments.length)
      const department = departments[departmentIndex]

      // Generate a consistent random performance rating (1-5)
      const performanceRating = Math.floor(seededRandom(userSeed + 1000) * 5) + 1

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
    console.log("Fetched and cached fresh employee data from API")

    return employees
  } catch (error) {
    console.error("Error fetching from API:", error)
    console.log("Falling back to mock data...")

    // Generate mock data as fallback
    const mockEmployees = generateMockEmployees(20)

    // Cache the mock results
    employeesCache = mockEmployees
    console.log("Generated and cached mock employee data")

    return mockEmployees
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

// Function to clear cache (useful for testing)
export function clearEmployeeCache() {
  employeesCache = null
}
