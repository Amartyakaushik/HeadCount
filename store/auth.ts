import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useProfileStore } from "./profile"

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
  debugState: () => void
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

// Helper function to update profile
const updateUserProfile = (name: string, email: string, role: string) => {
  // Split name into first and last name
  const nameParts = name.split(" ")
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ") || ""

  // Get the profile store and update it
  const profileStore = useProfileStore.getState()
  profileStore.updateProfile({
    firstName,
    lastName,
    email,
    role,
  })
}

// Helper function to manually persist auth state to localStorage
export const manuallyPersistAuthState = (state: any) => {
  try {
    localStorage.setItem(
      "hr-dashboard-auth",
      JSON.stringify({
        state: {
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          registeredUsers: state.registeredUsers,
        },
        version: 0,
      }),
    )
    console.log("Auth state manually persisted to localStorage:", state.isAuthenticated)
  } catch (error) {
    console.error("Failed to persist auth state:", error)
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: [], // Store for custom registered users

      debugState: () => {
        const state = get()
        console.log("Current auth state:", {
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        })

        // Check localStorage
        try {
          const stored = localStorage.getItem("hr-dashboard-auth")
          console.log("Stored auth state:", stored ? JSON.parse(stored) : "None")
        } catch (e) {
          console.error("Error reading localStorage:", e)
        }
      },

      login: async (email: string, password: string) => {
        console.log("Login attempt:", email)

        // Check built-in mock users first
        const mockUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

        if (mockUser) {
          console.log("Mock user found:", mockUser.email)

          const newState = {
            user: {
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              role: mockUser.role,
            },
            isAuthenticated: true,
          }

          set(newState)

          // Manually persist to ensure it's saved immediately
          manuallyPersistAuthState({
            ...get(),
            ...newState,
          })

          // Update profile with user info
          updateUserProfile(mockUser.name, mockUser.email, mockUser.role)

          // Force a hard navigation after login with a delay
          setTimeout(() => {
            console.log("Redirecting to dashboard...")
            window.location.href = "/"
          }, 1000)

          return { success: true, message: "Login successful" }
        }

        // Then check registered users
        const registeredUser = get().registeredUsers.find((u) => u.email === email && u.password === password)

        if (registeredUser) {
          console.log("Registered user found:", registeredUser.email)

          const newState = {
            user: {
              id: registeredUser.id,
              email: registeredUser.email,
              name: registeredUser.name,
              role: registeredUser.role,
            },
            isAuthenticated: true,
          }

          set(newState)

          // Manually persist to ensure it's saved immediately
          manuallyPersistAuthState({
            ...get(),
            ...newState,
          })

          // Update profile with user info
          updateUserProfile(registeredUser.name, registeredUser.email, registeredUser.role)

          // Force a hard navigation after login with a delay
          setTimeout(() => {
            console.log("Redirecting to dashboard...")
            window.location.href = "/"
          }, 1000)

          return { success: true, message: "Login successful" }
        }

        return { success: false, message: "Invalid email or password" }
      },

      register: async (name: string, email: string, password: string, role: string) => {
        console.log("Register attempt:", email)

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

        // Add to registered users and set authentication state
        const newState = {
          registeredUsers: [...get().registeredUsers, newUser],
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
          },
          isAuthenticated: true,
        }

        set(newState)

        // Manually persist to ensure it's saved immediately
        manuallyPersistAuthState({
          ...get(),
          ...newState,
        })

        console.log("User registered:", newUser)
        console.log("Updated registered users:", [...get().registeredUsers])
        console.log("Authentication state:", get().isAuthenticated)

        // Force a hard navigation after registration with a delay
        setTimeout(() => {
          console.log("Redirecting to dashboard...")
          window.location.href = "/"
        }, 1000)

        return { success: true, message: "Account created successfully" }
      },

      logout: () => {
        console.log("Logging out...")

        const newState = {
          user: null,
          isAuthenticated: false,
        }

        set(newState)

        // Manually persist to ensure it's saved immediately
        manuallyPersistAuthState({
          ...get(),
          ...newState,
        })

        // Force a hard navigation after logout with a delay
        setTimeout(() => {
          console.log("Redirecting to login...")
          window.location.href = "/login"
        }, 500)
      },
    }),
    {
      name: "hr-dashboard-auth",
      // Include all state in persistence
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        registeredUsers: state.registeredUsers,
      }),
    },
  ),
)

// import { create } from "zustand"
// import { persist } from "zustand/middleware"
// import { useProfileStore } from "./profile"

// interface User {
//   id: string
//   email: string
//   name: string
//   role: string
// }

// interface AuthState {
//   user: User | null
//   isAuthenticated: boolean
//   registeredUsers: Array<{
//     id: string
//     email: string
//     password: string
//     name: string
//     role: string
//   }>
//   login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
//   register: (
//     name: string,
//     email: string,
//     password: string,
//     role: string,
//   ) => Promise<{ success: boolean; message: string }>
//   logout: () => void
// }

// // Mock user database
// const MOCK_USERS = [
//   {
//     id: "1",
//     email: "admin@company.com",
//     password: "admin123",
//     name: "Admin User",
//     role: "HR Manager",
//   },
//   {
//     id: "2",
//     email: "hr@company.com",
//     password: "hr123",
//     name: "HR Specialist",
//     role: "HR Specialist",
//   },
//   {
//     id: "3",
//     email: "manager@company.com",
//     password: "manager123",
//     name: "Department Manager",
//     role: "Manager",
//   },
// ]

// // Helper function to update profile
// const updateUserProfile = (name: string, email: string, role: string) => {
//   // Split name into first and last name
//   const nameParts = name.split(" ")
//   const firstName = nameParts[0] || ""
//   const lastName = nameParts.slice(1).join(" ") || ""

//   // Get the profile store and update it
//   const profileStore = useProfileStore.getState()
//   profileStore.updateProfile({
//     firstName,
//     lastName,
//     email,
//     role,
//   })
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,
//       registeredUsers: [], // Store for custom registered users

//       login: async (email: string, password: string) => {
//         // Check built-in mock users first
//         const mockUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

//         if (mockUser) {
//           set({
//             user: {
//               id: mockUser.id,
//               email: mockUser.email,
//               name: mockUser.name,
//               role: mockUser.role,
//             },
//             isAuthenticated: true,
//           })

//           // Update profile with user info
//           updateUserProfile(mockUser.name, mockUser.email, mockUser.role)

//           // Force a hard navigation after login
//           setTimeout(() => {
//             window.location.href = "/"
//           }, 500)

//           return { success: true, message: "Login successful" }
//         }

//         // Then check registered users
//         const registeredUser = get().registeredUsers.find((u) => u.email === email && u.password === password)

//         if (registeredUser) {
//           set({
//             user: {
//               id: registeredUser.id,
//               email: registeredUser.email,
//               name: registeredUser.name,
//               role: registeredUser.role,
//             },
//             isAuthenticated: true,
//           })

//           // Update profile with user info
//           updateUserProfile(registeredUser.name, registeredUser.email, registeredUser.role)

//           // Force a hard navigation after login
//           setTimeout(() => {
//             window.location.href = "/"
//           }, 500)

//           return { success: true, message: "Login successful" }
//         }

//         return { success: false, message: "Invalid email or password" }
//       },

//       register: async (name: string, email: string, password: string, role: string) => {
//         // Check if user already exists in mock users
//         const existingMockUser = MOCK_USERS.find((u) => u.email === email)
//         if (existingMockUser) {
//           return { success: false, message: "User with this email already exists" }
//         }

//         // Check if user already exists in registered users
//         const existingRegisteredUser = get().registeredUsers.find((u) => u.email === email)
//         if (existingRegisteredUser) {
//           return { success: false, message: "User with this email already exists" }
//         }

//         // Create new user
//         const newUser = {
//           id: `custom-${Date.now()}`,
//           email,
//           password,
//           name,
//           role,
//         }

//         // Add to registered users and set authentication state
//         set((state) => ({
//           registeredUsers: [...state.registeredUsers, newUser],
//           user: {
//             id: newUser.id,
//             email: newUser.email,
//             name: newUser.name,
//             role: newUser.role,
//           },
//           isAuthenticated: true,
//         }))

//         console.log("User registered:", newUser)
//         console.log("Updated registered users:", [...get().registeredUsers])
//         console.log("Authentication state:", get().isAuthenticated)

//         // Force a hard navigation after registration
//         setTimeout(() => {
//           window.location.href = "/"
//         }, 500)

//         return { success: true, message: "Account created successfully" }
//       },

//       logout: () => {
//         set({ user: null, isAuthenticated: false })

//         // Force a hard navigation after logout
//         setTimeout(() => {
//           window.location.href = "/login"
//         }, 500)
//       },
//     }),
//     {
//       name: "hr-dashboard-auth",
//       // Important: Include all state in persistence
//       partialize: (state) => ({
//         user: state.user,
//         isAuthenticated: state.isAuthenticated,
//         registeredUsers: state.registeredUsers,
//       }),
//     },
//   ),
// )
