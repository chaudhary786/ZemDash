"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeScript() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("zemdash-theme-preference")

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [setTheme])

  return null
}
