"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransactionTrendsCardProps {
  /** Weekly trend percentages */
  weeklyTrends?: number[]
  /** Monthly trend description */
  monthlyTrend?: string
  /** Optional title override */
  title?: string
}

export function TransactionTrendsCard({ 
  weeklyTrends = [5, -2, 8, 3, -1, 6, 4], 
  monthlyTrend = "Positive growth trend",
  title = "Transaction Trends"
}: TransactionTrendsCardProps) {
  // Calculate the max value for scaling the chart
  const maxValue = Math.max(...weeklyTrends.map(v => Math.abs(v)))
  
  return (
    <Card className="glass-trends-card border-0 relative overflow-hidden backdrop-blur-xl shadow-md">
      {/* Decorative gradient blobs */}
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-200/20 to-cyan-300/20 blur-3xl dark:from-indigo-900/20 dark:to-cyan-800/20"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-200/20 to-indigo-300/20 blur-3xl dark:from-cyan-900/20 dark:to-indigo-800/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-cyan-500/5 to-transparent"></div>
      
      <CardHeader className="relative pb-2 border-b border-white/10 dark:border-gray-700/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 text-transparent bg-clip-text">
            {title}
          </CardTitle>
          <div className="rounded-full p-1.5 bg-gradient-to-br from-indigo-100/80 to-cyan-100/80 dark:from-indigo-900/30 dark:to-cyan-900/30 backdrop-blur-sm">
            <LineChart className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative pt-4">
        {/* Mini chart visualization */}
        <div className="flex items-end h-12 gap-1 mb-4">
          {weeklyTrends.map((value, index) => {
            const height = Math.abs(value) / maxValue * 100
            const isPositive = value >= 0
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className={cn(
                    "w-full rounded-t-sm", 
                    isPositive 
                      ? "bg-gradient-to-t from-indigo-500/40 to-cyan-500/40 dark:from-indigo-500/30 dark:to-cyan-500/30" 
                      : "bg-gradient-to-t from-red-500/40 to-orange-500/40 dark:from-red-500/30 dark:to-orange-500/30"
                  )}
                  style={{ height: `${Math.max(height, 10)}%` }}
                ></div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  {['M','T','W','T','F','S','S'][index]}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Monthly trend */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 dark:border-gray-700/20">
          <span className="text-xs text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full">
            Monthly
          </span>
          <div className="flex items-center gap-1.5">
            <div className="rounded-full p-1 bg-gradient-to-br from-indigo-100/80 to-cyan-100/80 dark:from-indigo-900/30 dark:to-cyan-900/30 backdrop-blur-sm">
              <TrendingUp className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {monthlyTrend}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
