import type React from "react"
import { ResponsiveLayout } from "@/components/responsive-layout"
import { SidebarProvider } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/user-sidebar"
import { UserDashboardHeader } from "@/components/user/user-dashboard-header"
import { DashboardFooter } from "@/components/shared/dashboard-footer"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ResponsiveLayout>
      <SidebarProvider defaultOpen={true}>
        <UserSidebar />
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <UserDashboardHeader />
          <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-x-hidden">
            <div className="w-full max-w-none">{children}</div>
          </main>
          <DashboardFooter />
        </div>
      </SidebarProvider>
    </ResponsiveLayout>
  )
}
