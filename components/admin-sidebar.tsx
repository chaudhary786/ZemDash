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
  const { isMobile } = useSidebar()

  return (
    <Sidebar className="glass-sidebar border-0 z-50">
      <SidebarHeader className="p-4 sticky top-0 z-10" data-sidebar="header">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">ZemDash</h2>
            <p className="text-xs text-gray-600 dark:text-gray-300">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-300 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title} data-sidebar="menu-item">
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full justify-start hover:bg-white/20 dark:hover:bg-gray-800/20 py-2.5 md:py-2"
                    data-sidebar="menu-button"
                  >
                    <Link href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* User Permission menu item */}
              <SidebarMenuItem data-sidebar="menu-item">
                <SidebarMenuButton 
                  asChild
                  isActive={pathname.startsWith('/admin/user-permission')}
                  className="w-full justify-start hover:bg-white/20 dark:hover:bg-gray-800/20"
                  data-sidebar="menu-button"
                >
                  <Link href="/admin/user-permission" className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>User Permission</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 sticky bottom-0 z-10 bg-inherit border-t border-white/10 dark:border-gray-700/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start hover:bg-white/20 dark:hover:bg-gray-800/20">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-left">Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
