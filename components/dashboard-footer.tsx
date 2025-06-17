import { ThemeStatus } from "@/components/theme-status"

export function DashboardFooter() {
  return (
    <footer className="glass-footer h-10 sm:h-12 flex items-center justify-between px-3 sm:px-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span>© 2024 ZemDash. All rights reserved.</span>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span className="hidden sm:inline">Version 1.0.0</span>
        <span className="hidden sm:inline">•</span>
        <span>Status: Online</span>
        <span className="hidden sm:inline">•</span>
        <ThemeStatus />
      </div>
    </footer>
  )
}
