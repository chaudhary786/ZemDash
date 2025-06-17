"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Download, Eye, Calendar, Euro } from "lucide-react"

export default function UserInvoicesPage() {
  const invoices = [
    {
      id: "INV-2024-001",
      client: "Freelance Project Alpha",
      amount: "€1,250.00",
      date: "15.12.2024",
      dueDate: "30.12.2024",
      status: "paid",
    },
    {
      id: "INV-2024-002",
      client: "Web Development Services",
      amount: "€850.00",
      date: "10.12.2024",
      dueDate: "25.12.2024",
      status: "pending",
    },
    {
      id: "INV-2024-003",
      client: "Consulting Services",
      amount: "€450.00",
      date: "05.12.2024",
      dueDate: "20.12.2024",
      status: "overdue",
    },
    {
      id: "INV-2024-004",
      client: "Design Project Beta",
      amount: "€750.00",
      date: "01.12.2024",
      dueDate: "16.12.2024",
      status: "draft",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const invoiceStats = [
    { label: "Total Invoiced", value: "€3,300.00", icon: Euro },
    { label: "Paid Invoices", value: "€1,250.00", icon: FileText },
    { label: "Pending Amount", value: "€1,300.00", icon: Calendar },
    { label: "Overdue Amount", value: "€450.00", icon: FileText },
  ]

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your invoices and track payments</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {invoiceStats.map((stat, index) => (
          <Card key={index} className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Invoice Management - Coming Soon
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Full invoice management functionality will be available soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Invoice System Under Development
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              We're working on a comprehensive invoice management system that will allow you to create, send, and track
              invoices with ease.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl mx-auto">
              <div className="p-4 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Create Invoices</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Professional invoice templates</p>
              </div>
              <div className="p-4 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Track Payments</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Real-time payment status</p>
              </div>
              <div className="p-4 rounded-lg bg-white/30 dark:bg-gray-800/30">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Auto Reminders</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Automated payment reminders</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview of Future Invoice List */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Invoice Preview</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Preview of how your invoices will be displayed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="p-4 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors opacity-60"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{invoice.id}</span>
                  <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>{invoice.status}</Badge>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{invoice.client}</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{invoice.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Date:</span>
                    <span className="text-gray-900 dark:text-white">{invoice.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Due:</span>
                    <span className="text-gray-900 dark:text-white">{invoice.dueDate}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 text-xs" disabled>
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs" disabled>
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
