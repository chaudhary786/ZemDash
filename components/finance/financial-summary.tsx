"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Target, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { FinancialSummary } from "@/types/finance"

interface FinancialSummaryProps {
  summary: FinancialSummary
  selectedPeriod: string
}

export function FinancialSummaryComponent({ summary, selectedPeriod }: FinancialSummaryProps) {
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return "€0.00"
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatPercentage = (percent: number | undefined) => {
    if (percent === undefined) return null
    const sign = percent >= 0 ? "+" : ""
    return `${sign}${percent.toFixed(1)}%`
  }

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-green-600"
    if (balance < 0) return "text-red-600"
    return "text-gray-600 dark:text-gray-300"
  }

  const getPercentageColor = (percent: number | undefined) => {
    if (percent === undefined) return ""
    if (percent > 0) return "text-green-500"
    if (percent < 0) return "text-red-500"
    return "text-gray-500"
  }

  const getPercentageIcon = (percent: number | undefined) => {
    if (percent === undefined) return null
    if (percent > 0) return <ArrowUpRight className="h-3 w-3 text-green-500" />
    if (percent < 0) return <ArrowDownRight className="h-3 w-3 text-red-500" />
    return null
  }

  const isFiltered = selectedPeriod === "Filtered Results" || !summary

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Monthly Balance */}
      <Card className="glass-card border-0 relative overflow-hidden backdrop-blur-xl shadow-md">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-300/20 blur-3xl dark:from-blue-900/20 dark:to-purple-800/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent"></div>
        <CardHeader className="relative pb-2 border-b border-white/10 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
              {isFiltered ? "Filtered Balance" : "Monthly Balance"}
            </CardTitle>
            <div className="rounded-full p-1.5 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm">
              <Wallet className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">{formatCurrency(summary?.totalBalance)}</div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full text-[10px]">{selectedPeriod}</span>
            {!isFiltered && summary?.balanceChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(summary?.balanceChangePercent)} backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full`}>
                {getPercentageIcon(summary?.balanceChangePercent)}
                <span className="ml-1 text-[10px]">{formatPercentage(summary?.balanceChangePercent)} vs prev</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Income */}
      <Card className="glass-card border-0 relative overflow-hidden backdrop-blur-xl shadow-md">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-br from-green-200/20 to-blue-300/20 blur-3xl dark:from-green-900/20 dark:to-blue-800/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/5 to-transparent"></div>
        <CardHeader className="relative pb-2 border-b border-white/10 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 text-transparent bg-clip-text">
              {isFiltered ? "Filtered Income" : "Monthly Income"}
            </CardTitle>
            <div className="rounded-full p-1.5 bg-gradient-to-br from-green-100/80 to-blue-100/80 dark:from-green-900/30 dark:to-blue-900/30 backdrop-blur-sm">
              <TrendingUp className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold text-green-600 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 text-transparent bg-clip-text">{formatCurrency(summary?.totalIncome)}</div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full text-[10px]">{summary?.incomeCount || 0} transactions</span>
            {!isFiltered && summary?.incomeChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(summary?.incomeChangePercent)} backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full`}>
                {getPercentageIcon(summary?.incomeChangePercent)}
                <span className="ml-1 text-[10px]">{formatPercentage(summary?.incomeChangePercent)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Expenses */}
      <Card className="glass-card border-0 relative overflow-hidden backdrop-blur-xl shadow-md">
        {/* Decorative gradient blobs */}
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-red-200/20 to-orange-300/20 blur-3xl dark:from-red-900/20 dark:to-orange-800/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent"></div>
        <CardHeader className="relative pb-2 border-b border-white/10 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 text-transparent bg-clip-text">
              {isFiltered ? "Filtered Expenses" : "Monthly Expenses"}
            </CardTitle>
            <div className="rounded-full p-1.5 bg-gradient-to-br from-red-100/80 to-orange-100/80 dark:from-red-900/30 dark:to-orange-900/30 backdrop-blur-sm">
              <TrendingDown className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold text-red-600 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 text-transparent bg-clip-text">{formatCurrency(summary?.totalExpenses)}</div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full text-[10px]">{summary?.expenseCount || 0} transactions</span>
            {!isFiltered && summary?.expensesChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(-(summary?.expensesChangePercent || 0))} backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full`}>
                {getPercentageIcon(-(summary?.expensesChangePercent || 0))}
                <span className="ml-1 text-[10px]">{formatPercentage(summary?.expensesChangePercent)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Net Balance */}
      <Card className="glass-card border-0 relative overflow-hidden backdrop-blur-xl shadow-md">
        {/* Decorative gradient blobs */}
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-br from-purple-200/20 to-blue-300/20 blur-3xl dark:from-purple-900/20 dark:to-blue-800/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent"></div>
        <CardHeader className="relative pb-2 border-b border-white/10 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 text-transparent bg-clip-text">
              {isFiltered ? "Filtered Net" : "Net Balance"}
            </CardTitle>
            <div className="rounded-full p-1.5 bg-gradient-to-br from-purple-100/80 to-blue-100/80 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-sm">
              <Target className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className={`text-2xl font-bold ${summary?.netBalance && summary?.netBalance > 0 ? 'bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400' : 'bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400'} text-transparent bg-clip-text`}>
            {formatCurrency(summary?.netBalance)}
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full text-[10px]">Income - Expenses</span>
            {!isFiltered && summary?.netBalanceChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(summary?.netBalanceChangePercent)} backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full`}>
                {getPercentageIcon(summary?.netBalanceChangePercent)}
                <span className="ml-1 text-[10px]">{formatPercentage(summary?.netBalanceChangePercent)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
