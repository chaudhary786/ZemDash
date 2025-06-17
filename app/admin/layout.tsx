import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminDashboardHeader } from "@/components/admin/admin-dashboard-header"
import { DashboardFooter } from "@/components/shared/dashboard-footer"
import { ResponsiveLayout } from "@/components/responsive-layout"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ResponsiveLayout>
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <AdminDashboardHeader />
          <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full overflow-x-hidden">
            <div className="w-full max-w-none">{children}</div>
          </main>
          <DashboardFooter />
        </div>
      </SidebarProvider>
    </ResponsiveLayout>
  )
}
