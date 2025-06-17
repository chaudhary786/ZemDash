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
      <Card className="glass-card border-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent"></div>
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isFiltered ? "Filtered Balance" : "Monthly Balance"}
            </CardTitle>
            <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(summary?.totalBalance)}</div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300">{selectedPeriod}</span>
            {!isFiltered && summary?.balanceChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(summary?.balanceChangePercent)}`}>
                {getPercentageIcon(summary?.balanceChangePercent)}
                <span className="ml-1">{formatPercentage(summary?.balanceChangePercent)} vs prev month</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Income */}
      <Card className="glass-card border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isFiltered ? "Filtered Income" : "Monthly Income"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(summary?.totalIncome)}</div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300">{summary?.incomeCount || 0} transactions</span>
            {!isFiltered && summary?.incomeChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(summary?.incomeChangePercent)}`}>
                {getPercentageIcon(summary?.incomeChangePercent)}
                <span className="ml-1">{formatPercentage(summary?.incomeChangePercent)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Expenses */}
      <Card className="glass-card border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isFiltered ? "Filtered Expenses" : "Monthly Expenses"}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(summary?.totalExpenses)}</div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300">{summary?.expenseCount || 0} transactions</span>
            {!isFiltered && summary?.expensesChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(-(summary?.expensesChangePercent || 0))}`}>
                {getPercentageIcon(-(summary?.expensesChangePercent || 0))}
                <span className="ml-1">{formatPercentage(summary?.expensesChangePercent)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Net Balance */}
      <Card className="glass-card border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isFiltered ? "Filtered Net" : "Net Balance"}
            </CardTitle>
            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getBalanceColor(summary?.netBalance || 0)}`}>
            {formatCurrency(summary?.netBalance)}
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-600 dark:text-gray-300">Income - Expenses</span>
            {!isFiltered && summary?.netBalanceChangePercent !== undefined && (
              <div className={`flex items-center ${getPercentageColor(summary?.netBalanceChangePercent)}`}>
                {getPercentageIcon(summary?.netBalanceChangePercent)}
                <span className="ml-1">{formatPercentage(summary?.netBalanceChangePercent)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
