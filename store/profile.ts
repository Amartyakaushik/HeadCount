import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Profile {
  firstName: string
  lastName: string
  email: string
  role: string
  avatar: string
  phone: string
  department: string
  joinDate: string
  bio: string
}

interface ProfileState {
  profile: Profile
  updateProfile: (data: Partial<Profile>) => void
  updateAvatar: (avatar: string) => void
  resetProfile: (userData: { firstName: string; lastName: string; email: string; role: string }) => void
}

// Default profile
const DEFAULT_PROFILE: Profile = {
  firstName: "User",
  lastName: "Profile",
  email: "user@company.com",
  role: "Employee",
  avatar: "/placeholder.svg",
  phone: "+1 (555) 123-4567",
  department: "General",
  joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  bio: "Welcome to the HR Dashboard platform. Please update your profile information.",
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,

      updateProfile: (data) => {
        set((state) => ({
          profile: { ...state.profile, ...data },
        }))
      },

      updateAvatar: (avatar) => {
        set((state) => ({
          profile: { ...state.profile, avatar },
        }))
      },

      // Add method to reset profile for new users
      resetProfile: (userData: { firstName: string; lastName: string; email: string; role: string }) => {
        const department = userData.role.includes("HR")
          ? "Human Resources"
          : userData.role.includes("Manager")
            ? "Management"
            : "General"

        set({
          profile: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            avatar: `/placeholder.svg?height=100&width=100&text=${userData.firstName[0]}${userData.lastName[0] || ""}`,
            phone: "+1 (555) 123-4567",
            department: department,
            joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
            bio: `${userData.role} with experience in team management and organizational development. Recently joined the HR Dashboard platform.`,
          },
        })
      },
    }),
    {
      name: "hr-dashboard-profile",
    },
  ),
)
