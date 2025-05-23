import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getEmployees as fetchEmployeesAPI } from "@/lib/api"
import type { Employee } from "@/types/employee"

interface EmployeeState {
  employees: Employee[]
  isLoading: boolean
  error: string | null
  hasInitialized: boolean
  fetchEmployees: () => Promise<void>
  addEmployee: (employee: Employee) => void
  updateEmployee: (id: number, data: Partial<Employee>) => void
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: [],
      isLoading: false,
      error: null,
      hasInitialized: false,

      fetchEmployees: async () => {
        const state = get()

        // If we have persisted employees, don't fetch again
        if (state.employees.length > 0 || state.isLoading || state.hasInitialized) {
          return
        }

        set({ isLoading: true, error: null })

        try {
          const employees = await fetchEmployeesAPI()
          set({
            employees,
            isLoading: false,
            hasInitialized: true,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch employees",
            isLoading: false,
            hasInitialized: true,
          })
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
    }),
    {
      name: "hr-dashboard-employees",
      partialize: (state) => ({
        employees: state.employees,
        hasInitialized: state.hasInitialized,
      }),
    },
  ),
)
