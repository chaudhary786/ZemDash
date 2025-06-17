"use client"

import { createContext, useContext, ReactNode } from "react"

export interface UserData {
  name: string
  email: string
  role: "user" | "admin"
  avatar?: string
}

interface UserContextType {
  user: UserData | null
  isLoading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
})

export function useUser() {
  return useContext(UserContext)
}

interface UserProviderProps {
  children: ReactNode
  initialUser?: UserData
}

export function UserProvider({ children, initialUser }: UserProviderProps) {
  // In a real app, this would fetch the user from an API or auth service
  // For this demo, we'll use the initialUser or a default user
  const userData = initialUser || {
    name: "John Doe",
    email: "user@zemdash.com",
    role: "user" as const,
  }

  return (
    <UserContext.Provider
      value={{
        user: userData,
        isLoading: false,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Mock admin user data for the admin dashboard
export const adminUserData: UserData = {
  name: "Admin User",
  email: "admin@zemdash.com",
  role: "admin",
}

// Mock user data for the user dashboard
export const regularUserData: UserData = {
  name: "John Doe",
  email: "user@zemdash.com",
  role: "user",
}
