"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CalendarIcon, ChevronDown, ChevronUp, Download, Printer, Search } from "lucide-react"
import { format } from "date-fns"
import type { FilterOptions } from "@/types/finance"
import { ALL_CATEGORIES } from "@/types/finance"

interface UserFilterControlsProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onExportPDF: () => void
  onPrint: () => void
  transactionCount: number
  searchTerm: string
  onSearchChange: (search: string) => void
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
]

export function UserFilterControls({
  filters,
  onFiltersChange,
  onExportPDF,
  onPrint,
  transactionCount,
  searchTerm,
  onSearchChange,
}: UserFilterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
    onSearchChange("")
  }

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key as keyof FilterOptions]
    return value !== undefined && value !== null && value !== "all"
  }) || (searchTerm && searchTerm.trim() !== "")

  const getActiveFilterCount = () => {
    const filterCount = Object.keys(filters).filter((key) => {
      const value = filters[key as keyof FilterOptions]
      return value !== undefined && value !== null && value !== "all"
    }).length
    
    return filterCount + (searchTerm && searchTerm.trim() !== "" ? 1 : 0)
  }

  return (
    <Card className="glass-card border-0">
      <CardContent className="p-6">
        {/* Filters Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">User Filters & Export</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 text-gray-600 dark:text-gray-300"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Expanded Filters Section */}
        {isExpanded && (
          <div className="space-y-4 mt-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                value={filters.type || "all"}
                onValueChange={(value) => updateFilter("type", value === "all" ? undefined : value)}
              >
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.year?.toString() || "all"}
                onValueChange={(value) => updateFilter("year", value === "all" ? undefined : Number.parseInt(value))}
              >
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 w-full">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.month?.toString() || "all"}
                onValueChange={(value) => updateFilter("month", value === "all" ? undefined : Number.parseInt(value))}
              >
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 w-full">
                  <SelectValue placeholder="All Months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal bg-white/50 dark:bg-gray-800/50 w-full"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange?.start
                    ? filters.dateRange.end
                      ? `${format(filters.dateRange.start, "MM/dd/yyyy")} - ${format(filters.dateRange.end, "MM/dd/yyyy")}`
                      : format(filters.dateRange.start, "MM/dd/yyyy")
                    : "Date Range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={
                    filters.dateRange ? { from: filters.dateRange.start, to: filters.dateRange.end } : undefined
                  }
                  onSelect={(range) => {
                    if (range?.from) {
                      updateFilter("dateRange", { start: range.from, end: range.to || range.from })
                    } else {
                      updateFilter("dateRange", undefined)
                    }
                  }}
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Export Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onExportPDF}
                className="flex-1 bg-white/50 dark:bg-gray-800/50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onPrint} 
                className="flex-1 bg-white/50 dark:bg-gray-800/50"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>

            {/* Results */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Results</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Filtered transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{transactionCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
