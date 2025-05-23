import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getEmployees as fetchEmployeesAPI } from "@/lib/api"
import type { Employee } from "@/types/employee"

interface EmployeeState {
  employees: Employee[]
  isLoading: boolean
  error: string | null
  hasInitialized: boolean
  lastFetchTime: number | null
  fetchEmployees: () => Promise<void>
  addEmployee: (employee: Employee) => void
  updateEmployee: (id: number, data: Partial<Employee>) => void
  clearEmployees: () => void
}

// Cache duration: 1 hour (in milliseconds)
const CACHE_DURATION = 60 * 60 * 1000

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: [],
      isLoading: false,
      error: null,
      hasInitialized: false,
      lastFetchTime: null,

      fetchEmployees: async () => {
        const state = get()
        const now = Date.now()

        // Check if we have cached data that's still valid
        if (state.employees.length > 0 && state.lastFetchTime && now - state.lastFetchTime < CACHE_DURATION) {
          console.log("Using cached employee data from store")
          set({ error: null }) // Clear any previous errors
          return
        }

        // Don't fetch if already loading
        if (state.isLoading) {
          return
        }

        set({ isLoading: true, error: null })

        try {
          console.log("Fetching employees data...")
          const employees = await fetchEmployeesAPI()

          if (employees && employees.length > 0) {
            set({
              employees,
              isLoading: false,
              hasInitialized: true,
              lastFetchTime: now,
              error: null,
            })
            console.log(`Successfully loaded ${employees.length} employees`)
          } else {
            throw new Error("No employee data received")
          }
        } catch (error) {
          console.error("Error in fetchEmployees:", error)
          set({
            error: error instanceof Error ? error.message : "Failed to fetch employees",
            isLoading: false,
            hasInitialized: true,
          })

          // If we have no employees but the fetch failed, generate some mock data
          if (get().employees.length === 0) {
            console.log("Generating emergency fallback data in store...")
            const mockEmployees: Employee[] = Array.from({ length: 20 }).map((_, i) => ({
              id: i + 1,
              firstName: `Employee`,
              lastName: `${i + 1}`,
              email: `employee${i + 1}@example.com`,
              age: 30 + (i % 20),
              gender: i % 2 === 0 ? "male" : "female",
              image: `/placeholder.svg?height=100&width=100&text=E${i + 1}`,
              department: departments[i % departments.length],
              performanceRating: (i % 5) + 1,
              address: {
                city: "New York",
                state: "NY",
              },
              phone: `+1 (555) 123-${1000 + i}`,
            }))

            set({
              employees: mockEmployees,
              lastFetchTime: now,
              hasInitialized: true,
            })
          }
        }
      },

      addEmployee: (employee) => {
        set((state) => ({
          employees: [...state.employees, employee],
        }))
      },

      updateEmployee: (id, data) => {
        set((state) => ({
          employees: state.employees.map((employee) => (employee.id === id ? { ...employee, ...data } : employee)),
        }))
      },

      clearEmployees: () => {
        set({
          employees: [],
          hasInitialized: false,
          lastFetchTime: null,
        })
      },
    }),
    {
      name: "hr-dashboard-employees",
      partialize: (state) => ({
        employees: state.employees,
        hasInitialized: state.hasInitialized,
        lastFetchTime: state.lastFetchTime,
      }),
    },
  ),
)

// Import departments for emergency fallback
const departments = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Product", "Design", "Customer Support"]
