"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Sample permission modules - would be fetched from API in production
const permissionModules = [
  {
    id: "users",
    name: "Users",
    description: "User account management permissions",
    permissions: [
      { id: "users:view", name: "View", description: "Can view user accounts", code: "users:view" },
      { id: "users:create", name: "Create", description: "Can create user accounts", code: "users:create" },
      { id: "users:edit", name: "Edit", description: "Can edit user accounts", code: "users:edit" },
      { id: "users:delete", name: "Delete", description: "Can delete user accounts", code: "users:delete" },
    ]
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial management permissions",
    permissions: [
      { id: "finance:view", name: "View", description: "Can view financial data", code: "finance:view" },
      { id: "finance:create", name: "Create", description: "Can create financial entries", code: "finance:create" },
      { id: "finance:edit", name: "Edit", description: "Can modify financial entries", code: "finance:edit" },
      { id: "finance:delete", name: "Delete", description: "Can delete financial entries", code: "finance:delete" },
    ]
  },
  {
    id: "reports",
    name: "Reports",
    description: "Reporting permissions",
    permissions: [
      { id: "reports:view", name: "View", description: "Can view reports", code: "reports:view" },
      { id: "reports:export", name: "Export", description: "Can export reports", code: "reports:export" },
    ]
  },
  {
    id: "settings",
    name: "Settings",
    description: "System settings permissions",
    permissions: [
      { id: "settings:view", name: "View", description: "Can view system settings", code: "settings:view" },
      { id: "settings:edit", name: "Edit", description: "Can modify system settings", code: "settings:edit" },
    ]
  },
  {
    id: "administration",
    name: "Administration",
    description: "Administrative functions permissions",
    permissions: [
      { id: "admin:view", name: "View", description: "Can access admin panel", code: "admin:view" },
      { id: "admin:manage", name: "Manage", description: "Can manage all system functions", code: "admin:manage" },
    ]
  }
]

export default function PermissionsPage() {
  const [isEditPermissionsOpen, setIsEditPermissionsOpen] = useState(false)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Permission</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <Tabs defaultValue="permissions" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="users" asChild>
              <Link href="/admin/user-permission/users">Users</Link>
            </TabsTrigger>
            <TabsTrigger value="roles" asChild>
              <Link href="/admin/user-permission/roles">Roles</Link>
            </TabsTrigger>
            <TabsTrigger value="permissions" asChild>
              <Link href="/admin/user-permission/permissions">Permissions</Link>
            </TabsTrigger>
            <TabsTrigger value="audit-log" asChild>
              <Link href="/admin/user-permission/audit-log">Audit Log</Link>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="permissions" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Permission Definitions</h2>
              </div>
              <Dialog open={isEditPermissionsOpen} onOpenChange={setIsEditPermissionsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Pencil className="h-4 w-4 mr-2" /> Edit Permissions
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]" aria-describedby="permission-dialog-description">
                  <DialogHeader>
                    <DialogTitle>Edit Permission Definitions</DialogTitle>
                    <DialogDescription id="permission-dialog-description">
                      Modify system permission definitions
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      This feature allows advanced administrators to modify the permission system.
                      Changes here will affect all roles and users in the system.
                    </p>
                    
                    <div className="border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900/30 rounded-md p-3 mb-4">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Warning: Modifying core permissions may impact system functionality.
                        Please ensure you understand the implications before making changes.
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditPermissionsOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditPermissionsOpen(false)}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {permissionModules.map((module) => (
                <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="text-xl font-bold mb-1">{module.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{module.description}</p>
                  
                  <div className="space-y-4">
                    {module.permissions.map((permission) => (
                      <div key={permission.id} className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{permission.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{permission.description}</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          {permission.code}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
