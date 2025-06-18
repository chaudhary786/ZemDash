"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface TotalBalanceCardProps {
  balance: number
  currency?: string
  change?: number
  changeType?: "increase" | "decrease"
  lastUpdated?: string
  variant?: "admin" | "user"
}

export function TotalBalanceCard({
  balance,
  currency = "€",
  change = 0,
  changeType = "increase",
  lastUpdated = "Just now",
  variant = "admin",
}: TotalBalanceCardProps) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)

  const formatBalance = (amount: number) => {
    if (!isBalanceVisible) {
      return "••••••"
    }
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: currency === "€" ? "EUR" : currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatChange = (amount: number) => {
    const sign = changeType === "increase" ? "+" : "-"
    return `${sign}${Math.abs(amount).toFixed(2)}%`
  }

  return (
    <Card className="glass-card border-0 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-300/20 blur-3xl dark:from-blue-900/20 dark:to-purple-800/20 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-gradient-to-tr from-pink-200/15 to-blue-300/15 blur-3xl dark:from-pink-900/10 dark:to-blue-800/10 translate-y-1/3 -translate-x-1/4"></div>

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg backdrop-blur-sm">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Total Balance</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {variant === "admin" ? "System Balance" : "Available Funds"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="h-8 w-8 hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm"
            >
              {isBalanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/40 dark:to-blue-900/40 border-white/20 dark:border-gray-700/20">
              Live
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Main Balance */}
        <div className="space-y-2">
          <div className="text-3xl sm:text-4xl font-bold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent">{formatBalance(balance)}</div>

          {/* Change Indicator */}
          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {changeType === "increase" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{formatChange(change)}</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">from last month</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20 dark:border-gray-700/20 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {variant === "admin" ? "Total Income" : "This Month"}
              </span>
            </div>
            <p className="text-lg font-semibold text-green-600">
              {isBalanceVisible ? `€${(balance * 0.3).toFixed(2)}` : "••••••"}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {variant === "admin" ? "Total Expenses" : "Spent"}
              </span>
            </div>
            <p className="text-lg font-semibold text-red-600">
              {isBalanceVisible ? `€${(balance * 0.15).toFixed(2)}` : "••••••"}
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 pt-2 px-3 py-2 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
          <span>Last updated: {lastUpdated}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/30"></div>
            <span>Real-time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
