"use client"

import { useState } from "react"
import { Search, Filter, Download, Clock, User, Shield, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Sample audit log data - would be fetched from API in production
const auditLogs = [
  {
    id: "1",
    timestamp: new Date("2025-06-16T14:32:45"),
    user: "Admin User",
    action: "Role Update",
    details: "Updated permissions for Manager role",
    category: "role",
    ip: "192.168.1.105",
  },
  {
    id: "2",
    timestamp: new Date("2025-06-16T13:15:22"),
    user: "John Manager",
    action: "User Create",
    details: "Created new user account for emma@example.com",
    category: "user",
    ip: "192.168.1.110",
  },
  {
    id: "3",
    timestamp: new Date("2025-06-16T11:45:10"),
    user: "Admin User",
    action: "Permission Change",
    details: "Modified system permission definitions",
    category: "permission",
    ip: "192.168.1.105",
  },
  {
    id: "4",
    timestamp: new Date("2025-06-15T16:22:33"),
    user: "Royal Admin",
    action: "Role Create",
    details: "Created new role: Moderator",
    category: "role",
    ip: "192.168.1.120",
  },
  {
    id: "5",
    timestamp: new Date("2025-06-15T10:05:17"),
    user: "Admin User",
    action: "User Update",
    details: "Changed role for user robert@example.com from User to Staff",
    category: "user",
    ip: "192.168.1.105",
  },
  {
    id: "6",
    timestamp: new Date("2025-06-14T09:30:42"),
    user: "System",
    action: "Settings Change",
    details: "Updated system security settings",
    category: "settings",
    ip: "192.168.1.1",
  },
]

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "user": return <User className="h-4 w-4" />
      case "role": return <Shield className="h-4 w-4" />
      case "permission": return <Shield className="h-4 w-4" />
      case "settings": return <Settings className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "user": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "role": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "permission": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "settings": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Permission</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <Tabs defaultValue="audit-log" className="w-full">
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
          
          <TabsContent value="audit-log" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">Audit Log</h2>
                <p className="text-gray-500 dark:text-gray-400">Track changes to roles, permissions, and user actions</p>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Export Log
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search audit logs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-64">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="user">User Actions</SelectItem>
                    <SelectItem value="role">Role Changes</SelectItem>
                    <SelectItem value="permission">Permission Changes</SelectItem>
                    <SelectItem value="settings">Settings Changes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">Timestamp</th>
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Action</th>
                    <th className="text-left py-3 px-4">Details</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{format(log.timestamp, "MMM d, yyyy HH:mm:ss")}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {log.user}
                      </td>
                      <td className="py-4 px-4 font-medium">
                        {log.action}
                      </td>
                      <td className="py-4 px-4 max-w-xs truncate">
                        {log.details}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getCategoryColor(log.category)} flex items-center space-x-1`}>
                          {getCategoryIcon(log.category)}
                          <span className="capitalize">{log.category}</span>
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-500 dark:text-gray-400">
                        {log.ip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No audit logs found matching your criteria</p>
              </div>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredLogs.length} of {auditLogs.length} entries
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
