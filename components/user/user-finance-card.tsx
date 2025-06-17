"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, RefreshCw, Wallet, TrendingUp, TrendingDown, Target, Plus, FileText, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserFinanceCardProps {
  title: string
  value: string | number
  subtitle?: string
  description?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function UserFinanceCard({
  title,
  value,
  subtitle,
  description,
  icon,
  trend,
  trendValue,
  className,
}: UserFinanceCardProps) {
  // Format value if it's a number
  const formattedValue = typeof value === "number" 
    ? new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(value)
    : value;

  const getTrendColor = () => {
    if (trend === "up") return "text-green-500";
    if (trend === "down") return "text-red-500";
    return "text-gray-400";
  };

  return (
    <Card className={cn(
      "overflow-hidden bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm",
      "border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200",
      "rounded-xl p-1 hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </CardTitle>
        {icon && <div className="text-gray-400 dark:text-gray-400">{icon}</div>}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-2">
            <div className={cn(
              "text-2xl font-bold",
              title.includes('Expenses') ? 'text-red-500' : 
              title.includes('Income') ? 'text-green-500' : 
              'text-gray-900 dark:text-white'
            )}>
              {formattedValue}
            </div>
            {subtitle && (
              <span className="text-xs text-gray-400 dark:text-gray-400">
                {subtitle}
              </span>
            )}
          </div>
          
          {(trend || description) && (
            <div className="flex items-center mt-1 gap-1">
              {trend && trendValue && (
                <span className={cn("text-xs flex items-center", getTrendColor())}>
                  {trend === "up" ? "+" : trend === "down" ? "" : ""}
                  {trendValue} {trend === "up" ? "↑" : trend === "down" ? "↓" : ""}
                </span>
              )}
              {description && (
                <span className="text-xs text-gray-400 dark:text-gray-400">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function FinancialHealthScoreCard({
  score,
  description = "Based on your income-to-expense ratio"
}: {
  score?: number;
  description?: string;
}) {
  // Clamp the score between 0-100 and handle undefined
  const safeScore = score !== undefined ? Math.max(0, Math.min(100, score)) : 0
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const getScoreColor = (value: number) => {
    if (value < 30) return "text-red-500";
    if (value < 70) return "text-amber-500";
    return "text-green-500";
  };

  const getTrackColor = (value: number) => {
    if (value < 30) return "stroke-red-100 dark:stroke-red-900/30";
    if (value < 70) return "stroke-amber-100 dark:stroke-amber-900/30";
    return "stroke-green-100 dark:stroke-green-900/30";
  };

  return (
    <Card className={cn(
      "overflow-hidden bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm",
      "border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200",
      "rounded-xl p-1 hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Financial Health Score
        </CardTitle>
        <RefreshCw className="h-4 w-4 text-gray-400 dark:text-gray-400" />
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center mb-2">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className={getTrackColor(safeScore)}
              strokeWidth="8"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Progress circle */}
            <circle
              className={getScoreColor(safeScore)}
              strokeWidth="8"
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("text-2xl font-bold", getScoreColor(safeScore))}>
              {safeScore}%
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className={cn("text-sm font-medium mb-1", getScoreColor(safeScore))}>
            {safeScore > 0 ? 'Positive' : 'Neutral'}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-400">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function TotalTransactionsCard({
  count,
  incomeCount = 0,
  expenseCount = 0,
  period = "June 2025"
}: {
  count?: number;
  incomeCount?: number;
  expenseCount?: number;
  period?: string;
}) {
  return (
    <UserFinanceCard
      title="Total Transactions"
      value={count || 0}
      description={`${incomeCount} income • ${expenseCount} expenses`}
      icon={<BarChart className="h-4 w-4" />}
    />
  )
}

export function MonthlyBalanceCard({
  balance,
  trend,
  trendValue,
  period = "June 2025"
}: {
  balance: number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  period?: string;
}) {
  const formattedBalance = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(balance)

  return (
    <UserFinanceCard
      title="Monthly Balance"
      value={formattedBalance}
      subtitle={period}
      description={trendValue ? `${trendValue} vs prev month` : ''}
      trend={trend}
      trendValue={trendValue}
      icon={<Wallet className="h-4 w-4" />}
    />
  )
}

export function MonthlyIncomeCard({
  income,
  trend,
  trendValue,
  transactionCount = 0
}: {
  income: number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  transactionCount?: number;
}) {
  const formattedIncome = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(income)

  return (
    <UserFinanceCard
      title="Monthly Income"
      value={formattedIncome}
      trend={trend}
      trendValue={trendValue}
      description={`${transactionCount} transactions`}
      icon={<TrendingUp className="h-4 w-4 text-green-500" />}
    />
  )
}

export function MonthlyExpensesCard({
  expenses,
  trend,
  trendValue,
  transactionCount = 0
}: {
  expenses: number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  transactionCount?: number;
}) {
  const formattedExpenses = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(expenses)

  return (
    <UserFinanceCard
      title="Monthly Expenses"
      value={formattedExpenses}
      trend={trend}
      trendValue={trendValue}
      description={`${transactionCount} transactions`}
      icon={<TrendingDown className="h-4 w-4 text-red-500" />}
    />
  )
}

export function NetBalanceCard({
  balance,
  trend,
  trendValue
}: {
  balance: number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}) {
  const formattedBalance = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(balance)

  return (
    <UserFinanceCard
      title="Net Balance"
      value={formattedBalance}
      trend={trend}
      trendValue={trendValue}
      description="Income - Expenses"
      icon={<Target className="h-4 w-4 text-blue-500" />}
    />
  )
}
