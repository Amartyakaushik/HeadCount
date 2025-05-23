import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BookmarkState {
  bookmarks: number[]
  addBookmark: (id: number) => void
  removeBookmark: (id: number) => void
  clearBookmarks: () => void
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      bookmarks: [],

      addBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id) ? state.bookmarks : [...state.bookmarks, id],
        })),

      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmarkId) => bookmarkId !== id),
        })),

      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: "hr-dashboard-bookmarks",
    },
  ),
)
