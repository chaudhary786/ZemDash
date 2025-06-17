"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Sample role data - would be fetched from API in production
const roles = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions",
    permissions: 14,
  },
  {
    id: "2",
    name: "Manager",
    description: "Manage users and view all content",
    permissions: 10,
  },
  {
    id: "3",
    name: "Moderator",
    description: "Content moderation with limited administrative access",
    permissions: 7,
  },
  {
    id: "4",
    name: "Staff",
    description: "Regular staff with limited edit rights",
    permissions: 5,
  },
  {
    id: "5",
    name: "User",
    description: "Regular user with basic access",
    permissions: 3,
  },
]

// Sample permission modules for the create/edit role dialog
const permissionModules = [
  {
    name: "Users",
    permissions: [
      { id: "users:view", label: "View", description: "Can view user accounts" },
      { id: "users:create", label: "Create", description: "Can create user accounts" },
      { id: "users:edit", label: "Edit", description: "Can edit user accounts" },
      { id: "users:delete", label: "Delete", description: "Can delete user accounts" },
    ],
  },
  {
    name: "Finance",
    permissions: [
      { id: "finance:view", label: "View", description: "Can view financial data" },
      { id: "finance:create", label: "Create", description: "Can create financial entries" },
      { id: "finance:edit", label: "Edit", description: "Can modify financial entries" },
      { id: "finance:delete", label: "Delete", description: "Can delete financial entries" },
    ],
  },
  {
    name: "Reports",
    permissions: [
      { id: "reports:view", label: "View", description: "Can view reports" },
      { id: "reports:export", label: "Export", description: "Can export reports" },
    ],
  },
  {
    name: "Settings",
    permissions: [
      { id: "settings:view", label: "View", description: "Can view system settings" },
      { id: "settings:edit", label: "Edit", description: "Can modify system settings" },
    ],
  },
  {
    name: "Administration",
    permissions: [
      { id: "admin:view", label: "View", description: "Can access admin panel" },
      { id: "admin:manage", label: "Manage", description: "Can manage all system functions" },
    ],
  },
]

export default function RolesPage() {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [newRole, setNewRole] = useState<{ name: string; description: string; permissions: string[] }>({ name: "", description: "", permissions: [] })
  
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setNewRole(prev => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, permissionId] }
      } else {
        return { ...prev, permissions: prev.permissions.filter(id => id !== permissionId) }
      }
    })
  }
  
  const handleCreateRole = () => {
    // In a real app, this would send data to the backend
    console.log("Creating new role:", newRole)
    setIsCreateRoleOpen(false)
    setNewRole({ name: "", description: "", permissions: [] })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Permission</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <Tabs defaultValue="roles" className="w-full">
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
          
          <TabsContent value="roles" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Role Management</h2>
                <p className="text-gray-500 dark:text-gray-400">Create and manage user roles and permissions</p>
              </div>
              <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" /> Add Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]" aria-describedby="role-dialog-description">
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription id="role-dialog-description">
                      Add a new role with specific permissions
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input 
                        id="role-name" 
                        value={newRole.name}
                        onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                        placeholder="Enter role name"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="role-description">Description</Label>
                      <Textarea 
                        id="role-description" 
                        value={newRole.description}
                        onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                        placeholder="Describe the role's purpose"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-lg font-medium mb-3">Permissions</h4>
                      
                      <div className="space-y-6">
                        {permissionModules.map((module) => (
                          <div key={module.name} className="border rounded-md p-4">
                            <h5 className="font-medium mb-3">{module.name}</h5>
                            <div className="grid grid-cols-5 gap-4">
                              {module.permissions.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={permission.id}
                                    checked={newRole.permissions.includes(permission.id)}
                                    onCheckedChange={(checked) => 
                                      handlePermissionChange(permission.id, checked === true)
                                    }
                                  />
                                  <Label htmlFor={permission.id}>{permission.label}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateRole}>Create Role</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-left py-3 px-4">Permissions</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                        {role.description}
                      </td>
                      <td className="py-4 px-4">
                        {role.permissions} permissions
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {role.name !== "Admin" && role.name !== "User" && (
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
