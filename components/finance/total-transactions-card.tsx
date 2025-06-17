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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Transactions
        </CardTitle>
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="text-3xl font-bold">
            {(count || 0).toLocaleString()}
          </div>
          
          {hasChange && (
            <div className="flex items-center mt-1">
              <span className={`text-xs ${isPositiveChange ? 'text-emerald-500' : 'text-destructive'}`}>
                {isPositiveChange ? '+' : ''}{changePercentage}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                {period}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
