"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  Send,
  Wallet,
  TrendingUp,
  Target,
  PiggyBank,
  Clock,
} from "lucide-react"
import { TotalBalanceCard } from "@/components/total-balance-card"
import {
  FinancialHealthScoreCard,
  TotalTransactionsCard,
  MonthlyBalanceCard,
  MonthlyIncomeCard,
  MonthlyExpensesCard,
  NetBalanceCard
} from "@/components/user/user-finance-card"
import { format } from "date-fns"
import { regularUserData } from "@/lib/user-context"

export default function UserDashboard() {
  // Format current date for display
  const currentDate = new Date()
  const formattedDate = format(currentDate, "dd.MM.yyyy")
  
  // Get user data
  const userData = regularUserData
  const userStats = [
    {
      title: "Account Balance",
      value: "€8,450.32",
      change: "+5.2%",
      trend: "up",
      icon: Wallet,
      description: "Available funds",
    },
    {
      title: "This Month Income",
      value: "€3,200.00",
      change: "+12.1%",
      trend: "up",
      icon: TrendingUp,
      description: "Received",
    },
    {
      title: "This Month Spent",
      value: "€1,850.75",
      change: "+8%",
      trend: "up",
      icon: Send,
      description: "Outgoing",
    },
    {
      title: "Savings Goal",
      value: "€1,749.25",
      change: "70%",
      trend: "neutral",
      icon: Target,
      description: "of €2,500 target",
    },
  ]

  const recentActivity = [
    { id: "ACT001", description: "Transfer to Sarah Wilson", amount: "-€250.00", date: formattedDate, type: "transfer" },
    { id: "ACT002", description: "Salary Payment Received", amount: "+€3,200.00", date: formattedDate, type: "income" },
    { id: "ACT003", description: "Online Purchase - Amazon", amount: "-€89.99", date: format(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), "dd.MM.yyyy"), type: "expense" },
    {
      id: "ACT004",
      description: "Transfer from Mike Johnson",
      amount: "+€150.00",
      date: format(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), "dd.MM.yyyy"),
      type: "transfer",
    },
    { id: "ACT005", description: "Netflix Subscription", amount: "-€15.99", date: format(new Date(currentDate.getTime() - 48 * 60 * 60 * 1000), "dd.MM.yyyy"), type: "expense" },
    { id: "ACT006", description: "Freelance Payment", amount: "+€450.00", date: format(new Date(currentDate.getTime() - 72 * 60 * 60 * 1000), "dd.MM.yyyy"), type: "income" },
  ]

  const quickActions = [
    { title: "Send Money", description: "Transfer to contacts", icon: Send, color: "blue" },
    { title: "Request Money", description: "Request from contacts", icon: ArrowDownRight, color: "green" },
    { title: "Pay Bills", description: "Utility payments", icon: CreditCard, color: "purple" },
    { title: "View Reports", description: "Financial summary", icon: Activity, color: "orange" },
  ]

  const budgetCategories = [
    { name: "Food & Dining", spent: "€420.50", budget: "€600.00", percentage: 70, color: "bg-blue-500" },
    { name: "Transportation", spent: "€180.25", budget: "€300.00", percentage: 60, color: "bg-green-500" },
    { name: "Entertainment", spent: "€95.75", budget: "€150.00", percentage: 64, color: "bg-purple-500" },
    { name: "Shopping", spent: "€340.80", budget: "€400.00", percentage: 85, color: "bg-orange-500" },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Welcome Section */}
      <div className="glass-card rounded-xl p-4 sm:p-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {userData.name.split(' ')[0]}!</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Here's your financial overview and recent activity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              User Dashboard
            </Badge>
            <div className="text-left sm:text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Last activity</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">{formattedDate} at {format(currentDate, "HH:mm")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Finance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FinancialHealthScoreCard score={100} description="Excellent financial health" />
        <TotalTransactionsCard count={0} incomeCount={0} expenseCount={0} />
      </div>
      
      {/* Monthly Finance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MonthlyBalanceCard balance={0} period="June 2025" trendValue="0.0%" trend="neutral" />
        <MonthlyIncomeCard income={0} trendValue="0.0%" trend="neutral" transactionCount={0} />
        <MonthlyExpensesCard expenses={0} trendValue="0.0%" trend="neutral" transactionCount={0} />
        <NetBalanceCard balance={0} trendValue="0.0%" trend="neutral" />
      </div>
      
      {/* Total Balance Overview */}
      <TotalBalanceCard
        balance={8450.32}
        change={5.2}
        changeType="increase"
        lastUpdated="1 minute ago"
        variant="user"
      />

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {userStats.map((stat, index) => (
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
                ) : stat.trend === "down" ? (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1 flex-shrink-0" />
                ) : (
                  <Target className="h-3 w-3 text-blue-500 mr-1 flex-shrink-0" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-blue-500"
                  }
                >
                  {stat.change}
                </span>
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
            <CardDescription className="text-gray-600 dark:text-gray-300">Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 bg-white/50 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
                >
                  <action.icon className={`h-4 sm:h-5 w-4 sm:w-5 text-${action.color}-600`} />
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 hidden sm:block">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Overview - Takes 1 column on xl screens */}
        <Card className="glass-card border-0 card-responsive">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <PiggyBank className="h-5 w-5 mr-2 text-green-600" />
              Budget Overview
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">Monthly spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {budgetCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{category.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 flex-shrink-0">
                      {category.spent} / {category.budget}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                    <span>{category.percentage}% used</span>
                    <Badge variant={category.percentage > 80 ? "destructive" : "secondary"} className="text-xs">
                      {category.percentage > 80 ? "Over Budget" : "On Track"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card border-0 card-responsive">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Your latest transactions and activities
              </CardDescription>
            </div>
            <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50 w-full sm:w-auto">
              <Clock className="h-4 w-4 mr-2" />
              View All Activity
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-4 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        activity.type === "income"
                          ? "bg-green-500"
                          : activity.type === "transfer"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 uppercase">{activity.type}</span>
                  </div>
                  <p
                    className={`text-sm font-bold flex-shrink-0 ${activity.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                  >
                    {activity.amount}
                  </p>
                </div>
                <p className="font-medium text-gray-900 dark:text-white mb-1 text-sm truncate">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{activity.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 flex-shrink-0">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
