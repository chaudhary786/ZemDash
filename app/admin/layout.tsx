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
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px] w-full transition-all duration-300">
            <AdminDashboardHeader />
            <main className="flex-1 p-4 sm:p-5 lg:p-6 w-full overflow-y-auto">
              <div className="w-full max-w-none mx-auto">{children}</div>
            </main>
            <DashboardFooter />
          </div>
        </div>
      </SidebarProvider>
    </ResponsiveLayout>
  )
}
