"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useThemeSettings() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [preference, setPreference] = useState<"system" | "light" | "dark">("system")

  // Ensure we're mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && theme) {
      setPreference(theme as "system" | "light" | "dark")
    }
  }, [mounted, theme])

  // Get the actual theme being displayed
  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : undefined

  // Save preference to localStorage
  const saveThemePreference = (newTheme: "system" | "light" | "dark") => {
    setTheme(newTheme)
    localStorage.setItem("zemdash-theme-preference", newTheme)
  }

  return {
    theme: currentTheme,
    preference,
    setTheme: saveThemePreference,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
    mounted,
  }
}
