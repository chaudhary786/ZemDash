"use client"

import { useThemeSettings } from "@/hooks/use-theme-settings"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeStatus() {
  const { preference, isDark } = useThemeSettings()

  if (!preference) return null

  return (
    <div className="flex items-center space-x-1 text-xs">
      {preference === "light" && <Sun className="h-3 w-3" />}
      {preference === "dark" && <Moon className="h-3 w-3" />}
      {preference === "system" && <Monitor className="h-3 w-3" />}
      <span>{preference === "system" ? "System" : isDark ? "Dark" : "Light"} mode</span>
    </div>
  )
}
