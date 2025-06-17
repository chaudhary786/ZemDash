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
      <div className="glass-card rounded-xl p-4 sm:p-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {userData.name}!</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Your comprehensive admin dashboard for managing transfers, finance, and more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              Admin Panel
            </Badge>
            <div className="text-left sm:text-right">
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

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-0 card-responsive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1 flex-shrink-0" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1 truncate">{stat.description}</span>
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

        {/* System Status - Takes 1 column on xl screens */}
        <Card className="glass-card border-0 card-responsive">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              System Status
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">Real-time system metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {systemMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <metric.icon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{metric.label}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Current status</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900 dark:text-white">{metric.value}</p>
                    <Badge
                      variant={
                        metric.status === "excellent" ? "default" : metric.status === "good" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {metric.status}
                    </Badge>
                  </div>
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
            <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50 w-full sm:w-auto">
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
                className="p-4 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors"
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
