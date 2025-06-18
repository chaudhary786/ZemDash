"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Users,
  Euro,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  Clock,
  Server,
  Zap,
} from "lucide-react"
import { TotalBalanceCard } from "@/components/total-balance-card"
import { format } from "date-fns"
import { adminUserData } from "@/lib/user-context"

export default function AdminDashboard() {
  // Format current date for display
  const currentDate = new Date()
  const formattedDate = format(currentDate, "dd.MM.yyyy")
  
  // Get admin user data
  const userData = adminUserData
  const stats = [
    {
      title: "Total Revenue",
      value: "€45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: Euro,
      description: "from last month",
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      icon: Users,
      description: "from last month",
    },
    {
      title: "Transactions",
      value: "12,234",
      change: "+19%",
      trend: "up",
      icon: CreditCard,
      description: "from last month",
    },
    {
      title: "Active Now",
      value: "573",
      change: "+201",
      trend: "up",
      icon: Activity,
      description: "users online",
    },
  ]

  const recentTransactions = [
    { id: "TXN001", user: "John Doe", amount: "€1,250.00", date: formattedDate, status: "completed", type: "transfer" },
    { id: "TXN002", user: "Jane Smith", amount: "€850.50", date: formattedDate, status: "pending", type: "payment" },
    {
      id: "TXN003",
      user: "Mike Johnson",
      amount: "€2,100.75",
      date: format(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), "dd.MM.yyyy"),
      status: "completed",
      type: "transfer",
    },
    { id: "TXN004", user: "Sarah Wilson", amount: "€675.25", date: format(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), "dd.MM.yyyy"), status: "failed", type: "payment" },
    { id: "TXN005", user: "David Lee", amount: "€1,450.00", date: format(new Date(currentDate.getTime() - 48 * 60 * 60 * 1000), "dd.MM.yyyy"), status: "completed", type: "transfer" },
    { id: "TXN006", user: "Emma Brown", amount: "€320.75", date: format(new Date(currentDate.getTime() - 48 * 60 * 60 * 1000), "dd.MM.yyyy"), status: "pending", type: "payment" },
  ]

  const systemMetrics = [
    { label: "Server Uptime", value: "99.9%", status: "excellent", icon: Server },
    { label: "Response Time", value: "120ms", status: "good", icon: Zap },
    { label: "Active Sessions", value: "1,247", status: "normal", icon: Activity },
    { label: "Error Rate", value: "0.02%", status: "excellent", icon: BarChart3 },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Welcome Section */}
      <div className="glass-card rounded-xl p-6 sm:p-8 w-full relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-300/30 blur-2xl dark:from-blue-900/20 dark:to-purple-800/20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-pink-200/20 to-blue-300/20 blur-2xl dark:from-pink-900/10 dark:to-blue-800/10"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Your comprehensive admin dashboard for managing transfers, finance, and more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Badge variant="secondary" className="text-sm bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-white/20 dark:border-gray-700/20">
              Admin Panel
            </Badge>
            <div className="text-left sm:text-right bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Last login</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">{formattedDate} at {format(currentDate, "HH:mm")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Balance Overview */}
      <TotalBalanceCard
        balance={125430.89}
        change={20.1}
        changeType="increase"
        lastUpdated="Just now"
        variant="admin"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-stats-card border-0 overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
                <div className="rounded-full p-2.5 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm shadow-sm">
                  <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div
                  className={`flex items-center space-x-1 text-sm ${stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span className="font-medium">{stat.change}</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Quick Actions - Takes 2 columns on xl screens */}
        <Card className="glass-card border-0 xl:col-span-2 card-responsive">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Frequently used administrative functions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 bg-white/50 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
              >
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                <span className="text-xs sm:text-sm text-center">Manage Users</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 bg-white/50 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
              >
                <Euro className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
                <span className="text-xs sm:text-sm text-center">New Transfer</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 bg-white/50 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
              >
                <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600" />
                <span className="text-xs sm:text-sm text-center">View Reports</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 bg-white/50 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
              >
                <CreditCard className="h-4 sm:h-5 w-4 sm:w-5 text-orange-600" />
                <span className="text-xs sm:text-sm text-center">Process Invoice</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Metrics - Takes 1 column on xl screens */}
        <Card className="glass-card border-0 card-responsive">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">System Metrics</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Current performance indicators
                </CardDescription>
              </div>
              <Button variant="outline" className="bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm border-white/20 dark:border-gray-700/20 w-full sm:w-auto hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {systemMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="glass-metric-item p-3 hover:shadow-md hover:translate-y-[-2px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          metric.status === "excellent" ? "bg-green-500" : metric.status === "good" ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-300 uppercase">{metric.label}</span>
                    </div>
                    <Badge
                      variant={
                        metric.status === "excellent" ? "default" : metric.status === "good" ? "secondary" : "destructive"
                      }
                      className="text-xs"
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{metric.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="glass-card border-0 card-responsive">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Latest financial activities
              </CardDescription>
            </div>
            <Button variant="outline" className="bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm border-white/20 dark:border-gray-700/20 w-full sm:w-auto hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200">
              <Clock className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="glass-transaction-item p-4 hover:shadow-md hover:translate-y-[-2px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        transaction.status === "completed"
                          ? "bg-green-500"
                          : transaction.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 uppercase">{transaction.type}</span>
                  </div>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : transaction.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <p className="font-medium text-gray-900 dark:text-white mb-1 truncate">{transaction.user}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{transaction.amount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{transaction.date}</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{transaction.id}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
