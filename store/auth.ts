import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  registeredUsers: Array<{
    id: string
    email: string
    password: string
    name: string
    role: string
  }>
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (
    name: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@company.com",
    password: "admin123",
    name: "Admin User",
    role: "HR Manager",
  },
  {
    id: "2",
    email: "hr@company.com",
    password: "hr123",
    name: "HR Specialist",
    role: "HR Specialist",
  },
  {
    id: "3",
    email: "manager@company.com",
    password: "manager123",
    name: "Department Manager",
    role: "Manager",
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: [], // Store for custom registered users

      login: async (email: string, password: string) => {
        // Check built-in mock users first
        const mockUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

        if (mockUser) {
          set({
            user: {
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              role: mockUser.role,
            },
            isAuthenticated: true,
          })
          return { success: true, message: "Login successful" }
        }

        // Then check registered users
        const registeredUser = get().registeredUsers.find((u) => u.email === email && u.password === password)

        if (registeredUser) {
          set({
            user: {
              id: registeredUser.id,
              email: registeredUser.email,
              name: registeredUser.name,
              role: registeredUser.role,
            },
            isAuthenticated: true,
          })
          return { success: true, message: "Login successful" }
        }

        return { success: false, message: "Invalid email or password" }
      },

      register: async (name: string, email: string, password: string, role: string) => {
        // Check if user already exists in mock users
        const existingMockUser = MOCK_USERS.find((u) => u.email === email)
        if (existingMockUser) {
          return { success: false, message: "User with this email already exists" }
        }

        // Check if user already exists in registered users
        const existingRegisteredUser = get().registeredUsers.find((u) => u.email === email)
        if (existingRegisteredUser) {
          return { success: false, message: "User with this email already exists" }
        }

        // Create new user
        const newUser = {
          id: `custom-${Date.now()}`,
          email,
          password,
          name,
          role,
        }

        // Add to registered users
        set((state) => ({
          registeredUsers: [...state.registeredUsers, newUser],
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
          },
          isAuthenticated: true,
        }))

        console.log("User registered:", newUser)
        console.log("Updated registered users:", [...get().registeredUsers])

        return { success: true, message: "Account created successfully" }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "hr-dashboard-auth",
      partialize: (state) => ({
        registeredUsers: state.registeredUsers,
        // Don't persist authentication state
      }),
    },
  ),
)
