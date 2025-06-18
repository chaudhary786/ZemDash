"use client"

import { Search, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationDropdown, type Notification } from "@/components/notification-dropdown"
import { useUser, adminUserData } from "@/lib/user-context"

export function AdminDashboardHeader() {
  // In a real app, we would use the useUser hook
  // For demo purposes, we'll use the mock admin data directly
  const userData = adminUserData;
  // Admin notifications
  const adminNotifications: Notification[] = [
    {
      id: "admin-notif-1",
      title: "New transfer received",
      description: "€1,250.00 from John Doe",
      type: "info"
    },
    {
      id: "admin-notif-2",
      title: "Invoice paid",
      description: "Invoice #INV-001 has been paid",
      type: "success"
    },
    {
      id: "admin-notif-3",
      title: "System maintenance",
      description: "Scheduled for tonight at 2:00 AM",
      type: "warning"
    }
  ];
  return (
    <header className="glass-header backdrop-blur-xl h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 relative overflow-hidden border-b border-white/10 dark:border-gray-700/30 sticky top-0 z-20 shadow-sm">
      {/* Decorative gradient blobs - positioned to avoid overflow issues */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/10 to-purple-300/10 blur-3xl dark:from-blue-900/15 dark:to-purple-800/15"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-tr from-pink-200/10 to-blue-300/10 blur-3xl dark:from-pink-900/10 dark:to-blue-800/10"></div>
      
      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1 relative z-10">
        <SidebarTrigger className="lg:hidden rounded-full p-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur-md hover:bg-white/40 dark:hover:bg-gray-700/50 transition-colors duration-200 border border-white/20 dark:border-gray-700/30" />
        <div className="relative hidden md:block flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search admin dashboard..."
            className="pl-10 w-full bg-white/60 dark:bg-gray-800/60 border-white/30 dark:border-gray-700/40 backdrop-blur-sm shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
        <ThemeToggle />
        
        <NotificationDropdown 
          notifications={adminNotifications} 
          title="Admin Notifications" 
        />

        <div className="text-right hidden sm:flex flex-col items-end">
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1.5" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300">{userData.email}</p>
        </div>
      </div>
    </header>
  )
}
