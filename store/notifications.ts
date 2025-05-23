import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Notification {
  id: number
  title: string
  description: string
  time: string
  unread: boolean
  type: "info" | "success" | "warning" | "error"
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "time" | "unread">) => void
  markAsRead: (id: number) => void
  markAllAsRead: () => void
  removeNotification: (id: number) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: 1,
          title: "Welcome to HR Dashboard",
          description: "Your dashboard is ready to use",
          time: "Just now",
          unread: true,
          type: "info",
        },
        {
          id: 2,
          title: "Performance Review Due",
          description: "5 employees need performance reviews",
          time: "1 hour ago",
          unread: true,
          type: "warning",
        },
        {
          id: 3,
          title: "System Update",
          description: "Dashboard updated successfully",
          time: "2 hours ago",
          unread: false,
          type: "success",
        },
      ],
      unreadCount: 2,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now(),
          time: "Just now",
          unread: true,
        }

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }))
      },

      markAsRead: (id) => {
        set((state) => {
          const notifications = state.notifications.map((notification) =>
            notification.id === id ? { ...notification, unread: false } : notification,
          )
          const unreadCount = notifications.filter((n) => n.unread).length

          return { notifications, unreadCount }
        })
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({ ...notification, unread: false })),
          unreadCount: 0,
        }))
      },

      removeNotification: (id) => {
        set((state) => {
          const notifications = state.notifications.filter((notification) => notification.id !== id)
          const unreadCount = notifications.filter((n) => n.unread).length

          return { notifications, unreadCount }
        })
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 })
      },
    }),
    {
      name: "hr-dashboard-notifications",
    },
  ),
)
