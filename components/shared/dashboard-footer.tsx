"use client"

import { Heart } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center justify-center space-x-1">
        <span>Made with</span>
        <Heart className="h-3 w-3 text-red-500 fill-red-500" />
        <span>by ZemDash Team</span>
      </div>
      <div className="mt-1">© {new Date().getFullYear()} ZemDash. All rights reserved.</div>
    </footer>
  )
}
