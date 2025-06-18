"use client"

import { BarChart3, Euro, FileText, HelpCircle, Home, LogOut, Settings, Users, ChevronDown, Shield, UserCheck, ScrollText, FileBarChart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Transfers",
    url: "/admin/transfers",
    icon: Euro,
  },
  {
    title: "Finance",
    url: "/admin/finance",
    icon: BarChart3,
  },
  {
    title: "Invoices",
    url: "/admin/invoices",
    icon: FileText,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "/admin/help",
    icon: HelpCircle,
  },
]

const userPermissionSubmenus = [
  {
    title: "Users",
    url: "/admin/user-permission/users",
    icon: UserCheck,
  },
  {
    title: "Roles",
    url: "/admin/user-permission/roles",
    icon: Users,
  },
  {
    title: "Permissions",
    url: "/admin/user-permission/permissions",
    icon: Shield,
  },
  {
    title: "Audit Log",
    url: "/admin/user-permission/audit-log",
    icon: ScrollText,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { isMobile, toggleSidebar, openMobile } = useSidebar()

  return (
    <>
      <div className={`sidebar-overlay ${openMobile ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <Sidebar className={`glass-sidebar backdrop-blur-xl border-r border-white/10 dark:border-gray-700/40 z-50 fixed left-0 top-0 overflow-hidden h-screen w-[260px] ${openMobile ? 'open' : ''}`}>
      {/* Decorative gradient blobs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/10 to-purple-300/10 blur-3xl dark:from-blue-900/20 dark:to-purple-800/20"></div>
      <div className="absolute top-1/2 -right-32 w-64 h-64 rounded-full bg-gradient-to-tr from-pink-200/10 to-blue-300/10 blur-3xl dark:from-pink-900/15 dark:to-blue-800/15"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-purple-200/10 to-blue-300/10 blur-3xl dark:from-purple-900/20 dark:to-blue-800/20"></div>
      
      <SidebarHeader className="p-4 sticky top-0 z-10 backdrop-blur-md bg-white/50 dark:bg-gray-800/70 border-b border-white/10 dark:border-gray-700/40" data-sidebar="header">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-white/10 dark:ring-white/20">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300 text-transparent bg-clip-text">ZemDash</h2>
            <p className="text-xs text-gray-600 dark:text-gray-200">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2 overflow-y-auto flex-grow h-[calc(100vh-130px)] dark:bg-gray-900/40" data-sidebar="content">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-200 font-medium text-xs uppercase tracking-wider px-2 py-1">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title} data-sidebar="menu-item">
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={`w-full justify-start py-2.5 md:py-2 transition-all duration-200 rounded-lg ${pathname === item.url ? 'bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/50 dark:to-purple-900/50 backdrop-blur-md shadow-sm border-l-2 border-blue-500 dark:border-blue-400' : 'hover:bg-white/20 dark:hover:bg-gray-800/40 hover:backdrop-blur-sm'}`}
                    data-sidebar="menu-button"
                  >
                    <Link href={item.url} className="flex items-center space-x-2 px-3">
                      <item.icon className="h-4 w-4 dark:text-blue-300" />
                      <span className="dark:text-gray-100">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* User Permission menu item */}
              <SidebarMenuItem data-sidebar="menu-item">
                <SidebarMenuButton 
                  asChild
                  isActive={pathname.startsWith('/admin/user-permission')}
                  className={`w-full justify-start py-2.5 md:py-2 transition-all duration-200 rounded-lg ${pathname.startsWith('/admin/user-permission') ? 'bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/50 dark:to-purple-900/50 backdrop-blur-md shadow-sm border-l-2 border-blue-500 dark:border-blue-400' : 'hover:bg-white/20 dark:hover:bg-gray-800/40 hover:backdrop-blur-sm'}`}
                  data-sidebar="menu-button"
                >
                  <Link href="/admin/user-permission" className="flex items-center justify-between w-full px-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 dark:text-blue-300" />
                      <span className="dark:text-gray-100">User Permission</span>
                    </div>
                    <ChevronDown className="h-4 w-4 dark:text-gray-300" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 sticky bottom-0 z-10 backdrop-blur-md bg-white/50 dark:bg-gray-800/70 border-t border-white/10 dark:border-gray-700/40 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start hover:bg-white/20 dark:hover:bg-gray-800/40 transition-all duration-200 rounded-lg backdrop-blur-sm bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-900/30 dark:to-purple-900/30 border border-white/10 dark:border-gray-700/30 shadow-sm">
                  <Avatar className="h-6 w-6 ring-2 ring-white/20 dark:ring-blue-500/40">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">AD</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-left font-medium text-gray-800 dark:text-gray-100">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] backdrop-blur-xl bg-white/80 dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/40 shadow-lg">
                <DropdownMenuItem className="hover:bg-blue-50/80 dark:hover:bg-blue-900/20 focus:bg-blue-50/80 dark:focus:bg-blue-900/20 transition-colors">
                  <div className="rounded-full p-1 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm mr-2">
                    <Settings className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-red-50/80 dark:hover:bg-red-900/20 focus:bg-red-50/80 dark:focus:bg-red-900/20 transition-colors">
                  <div className="rounded-full p-1 bg-gradient-to-br from-red-100/80 to-pink-100/80 dark:from-red-900/30 dark:to-pink-900/30 backdrop-blur-sm mr-2">
                    <LogOut className="h-3 w-3 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-red-600 dark:text-red-400">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail className="border-r border-white/10 dark:border-gray-700/40" />
      </Sidebar>
    </>
  )
}
