"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardHeader() {
  return (
    <header className="glass-header h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6">
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
        <SidebarTrigger className="lg:hidden" />
        <div className="relative hidden md:block flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-white/20 dark:hover:bg-gray-800/20 h-8 w-8 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 sm:w-80">
            <div className="p-2">
              <h4 className="font-medium mb-2">Notifications</h4>
              <div className="space-y-2">
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm font-medium">New transfer received</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">€1,250.00 from John Doe</p>
                </div>
                <div className="p-2 rounded bg-green-50 dark:bg-green-900/20">
                  <p className="text-sm font-medium">Invoice paid</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Invoice #INV-001 has been paid</p>
                </div>
                <div className="p-2 rounded bg-yellow-50 dark:bg-yellow-900/20">
                  <p className="text-sm font-medium">System maintenance</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Scheduled for tonight at 2:00 AM</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">admin@zemdash.com</p>
        </div>
      </div>
    </header>
  )
}
