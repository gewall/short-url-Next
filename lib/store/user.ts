import { create } from "zustand"
import { Token, User } from "../schemas/user"
import { persist } from "zustand/middleware"

export type UserState = {
  user: User & Token
  addUser: (user: User & Token) => void
  removeUser: () => void
  updateToken: (token: string) => void
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: { username: "", accessToken: "" },
      addUser: (user: User & Token) => set({ user }),
      removeUser: () => set({ user: { username: "", accessToken: "" } }),
      updateToken: (token: string) =>
        set((state) => ({ user: { ...state.user, accessToken: token } })),
    }),
    { name: "user-store" }
  )
)
