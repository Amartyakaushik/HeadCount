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
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: {
        firstName: "Admin",
        lastName: "User",
        email: "admin@company.com",
        role: "HR Manager",
        avatar: "/placeholder.svg",
        phone: "+1 (555) 123-4567",
        department: "Human Resources",
        joinDate: "January 2020",
        bio: "Experienced HR Manager with over 5 years of experience in talent management, employee relations, and organizational development.",
      },

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
    }),
    {
      name: "hr-dashboard-profile",
    },
  ),
)
