"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleGauge } from "lucide-react"
import { cn } from "@/lib/utils"

interface FinancialHealthScoreCardProps {
  /** Score expressed in percentage 0-100 */
  score?: number
  /** Optional label – e.g. Positive / Negative / Neutral */
  label?: string
  /** Description text to show below the score */
  description?: string
}

export function FinancialHealthScoreCard({ 
  score, 
  label = "Positive", 
  description = "Based on your income-to-expense ratio" 
}: FinancialHealthScoreCardProps) {
  // Clamp the score between 0-100 and handle undefined
  const safeScore = score !== undefined ? Math.max(0, Math.min(100, score)) : 0

  const getScoreColor = (value: number) => {
    if (value < 30) return "text-destructive"
    if (value < 70) return "text-amber-500"
    return "text-emerald-500"
  }

  return (
    <Card className="glass-health-score overflow-hidden relative">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-300/20 blur-2xl dark:from-blue-900/20 dark:to-purple-800/20 -translate-y-1/2 translate-x-1/4"></div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
          Financial Health Score
        </CardTitle>
        <div className="rounded-full p-1.5 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm shadow-sm">
          <CircleGauge className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-2">
            <div className={cn("text-3xl font-bold", getScoreColor(safeScore))}>
              {safeScore}%
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 bg-white/30 dark:bg-gray-800/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {label}
            </span>
          </div>
          <div className="w-full mt-3 pt-3 border-t border-white/20 dark:border-gray-700/20">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
