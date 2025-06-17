"use client"

import { useState } from "react"
import { FinancialHealthScoreCard } from "@/components/finance/financial-health-score-card"
import { TotalTransactionsCard } from "@/components/finance/total-transactions-card"
import { Filters } from "@/components/ui/filters"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinancePage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const handleExport = () => {
    console.log("Exporting data...")
    // Implement export functionality here
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold">Finance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FinancialHealthScoreCard score={0} />
        <TotalTransactionsCard count={1254} changePercentage={12.5} />
      </div>
      
      <div className="mt-8">
        <Filters onExport={handleExport}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <div className="flex items-center gap-2">
                <DatePicker
                  id="start-date"
                  date={startDate}
                  setDate={setStartDate}
                  placeholder="Start date"
                />
                <span>to</span>
                <DatePicker
                  id="end-date"
                  date={endDate}
                  setDate={setEndDate}
                  placeholder="End date"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select>
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="All transactions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All transactions</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search transactions..." />
            </div>
          </div>
        </Filters>
      </div>
    </div>
  )
}
