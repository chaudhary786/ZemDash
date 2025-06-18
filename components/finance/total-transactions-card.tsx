"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown } from "lucide-react"

interface TotalTransactionsCardProps {
  /** Total number of transactions */
  count?: number
  /** Optional percentage change from previous period */
  changePercentage?: number
  /** Optional time period description */
  period?: string
}

export function TotalTransactionsCard({ 
  count, 
  changePercentage,
  period = "from last month"
}: TotalTransactionsCardProps) {
  const isPositiveChange = changePercentage && changePercentage > 0
  const hasChange = changePercentage !== undefined

  return (
    <Card className="glass-transactions-card relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-200/20 to-purple-300/20 blur-2xl dark:from-blue-900/20 dark:to-purple-800/20"></div>
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-bl from-pink-200/20 to-blue-300/20 blur-2xl dark:from-pink-900/10 dark:to-blue-800/10"></div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
          Total Transactions
        </CardTitle>
        <div className="rounded-full p-1.5 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm shadow-sm">
          <ArrowUpDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex flex-col">
          <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 text-transparent bg-clip-text">
            {(count || 0).toLocaleString()}
          </div>
          
          {hasChange && (
            <div className="flex items-center mt-3 pt-3 border-t border-white/20 dark:border-gray-700/20">
              <div className="flex items-center bg-white/30 dark:bg-gray-800/30 px-2 py-1 rounded-full backdrop-blur-sm">
                <span className={`text-xs font-medium ${isPositiveChange ? 'text-emerald-500' : 'text-destructive'}`}>
                  {isPositiveChange ? '+' : ''}{changePercentage}%
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-300 ml-1">
                  {period}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
