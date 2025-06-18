"use client"

import { Heart } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="glass-footer p-4 text-center text-sm text-gray-600 dark:text-gray-400 backdrop-blur-md border-t border-white/10 dark:border-gray-700/20 sticky bottom-0 z-10">
      {/* Decorative gradient blobs */}
      <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-br from-blue-200/5 to-purple-300/5 blur-3xl dark:from-blue-900/5 dark:to-purple-800/5"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-200/5 to-blue-300/5 blur-3xl dark:from-pink-900/3 dark:to-blue-800/3"></div>
      
      <div className="flex items-center justify-center space-x-1 relative z-10">
        <span>Made with</span>
        <Heart className="h-3 w-3 text-red-500 fill-red-500" />
        <span>by ZemDash Team</span>
      </div>
      <div className="mt-1 relative z-10">© {new Date().getFullYear()} ZemDash. All rights reserved.</div>
    </footer>
  )
}
