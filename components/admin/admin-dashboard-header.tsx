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
    <header className="glass-header h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6">
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
        <SidebarTrigger className="lg:hidden" />
        <div className="relative hidden md:block flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search admin dashboard..."
            className="pl-10 w-full bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
        <ThemeToggle />
        
        <NotificationDropdown 
          notifications={adminNotifications} 
          title="Admin Notifications" 
        />

        <div className="text-right hidden sm:block">
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-blue-600 mr-1" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300">{userData.email}</p>
        </div>
      </div>
    </header>
  )
}
