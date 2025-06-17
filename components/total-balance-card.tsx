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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent"></div>

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
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
              className="h-8 w-8 hover:bg-white/20 dark:hover:bg-gray-800/20"
            >
              {isBalanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Main Balance */}
        <div className="space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{formatBalance(balance)}</div>

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
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20 dark:border-gray-700/20">
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
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 pt-2">
          <span>Last updated: {lastUpdated}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Real-time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
