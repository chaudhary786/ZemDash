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
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Financial Health Score
        </CardTitle>
        <CircleGauge className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-2">
            <div className={cn("text-3xl font-bold", getScoreColor(safeScore))}>
              {safeScore}%
            </div>
            <span className="text-sm text-muted-foreground">
              {label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
