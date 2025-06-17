"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample user data - would be fetched from API in production
const users = [
  {
    id: "1",
    name: "Chaudhary",
    email: "cajid@gmail.com",
    role: "Admin",
    status: "Active",
    verified: true,
  },
  {
    id: "2",
    name: "Royal Admin",
    email: "royal721xo@gmail.com",
    role: "Admin",
    status: "Active",
    verified: true,
  },
  {
    id: "3",
    name: "John Manager",
    email: "manager@example.com",
    role: "Manager",
    status: "Active",
    verified: true,
  },
  {
    id: "4",
    name: "Emma Staff",
    email: "staff@example.com",
    role: "Staff",
    status: "Active",
    verified: true,
  },
  {
    id: "5",
    name: "Robert User",
    email: "user@example.com",
    role: "User",
    status: "Active",
    verified: false,
  },
  {
    id: "6",
    name: "Pending User",
    email: "pending@example.com",
    role: "User",
    status: "Inactive",
    verified: false,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Permission</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <Tabs defaultValue="users" className="w-full">
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
          
          <TabsContent value="users" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">User Permissions</h2>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Verified</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-300 font-medium text-sm">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={
                          user.role === "Admin" ? "destructive" : 
                          user.role === "Manager" ? "secondary" :
                          user.role === "Staff" ? "secondary" : "outline"
                        } className={`font-normal ${user.role === "Manager" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" : ""}`}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            user.status === "Active" ? "bg-green-500" : "bg-gray-400"
                          }`}></div>
                          <span>{user.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            user.verified ? "bg-green-500" : "bg-red-500"
                          }`}></div>
                          <span>{user.verified ? "Verified" : "Unverified"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          View Permissions
                        </Button>
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
