"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Filter, X, Download, Printer, Search, Users } from "lucide-react"
import { format } from "date-fns"
import type { FilterOptions } from "@/types/finance"
import { ALL_CATEGORIES } from "@/types/finance"

// Mock admin users for filtering
const ADMIN_USERS = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Robert Johnson" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "Michael Wilson" },
]

interface AdminFilterControlsProps {
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

export function AdminFilterControls({
  filters,
  onFiltersChange,
  onExportPDF,
  onPrint,
  transactionCount,
  searchTerm,
  onSearchChange,
}: AdminFilterControlsProps) {
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
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-gray-900 dark:text-white">Admin Filters & Export</CardTitle>
            </div>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 text-gray-600 dark:text-gray-300"
            >
              {isExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              )}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-600">
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative col-span-full sm:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-800/50"
            />
          </div>

          <Select
            value={filters.type || "all"}
            onValueChange={(value) => updateFilter("type", value === "all" ? undefined : value)}
          >
            <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.adminId || "all"}
            onValueChange={(value) => updateFilter("adminId", value === "all" ? undefined : value)}
          >
            <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
              <SelectValue placeholder="Admin User" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Admins</SelectItem>
              {ADMIN_USERS.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-2 text-blue-600" />
                    <span>{user.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.year?.toString() || "all"}
            onValueChange={(value) => updateFilter("year", value === "all" ? undefined : Number.parseInt(value))}
          >
            <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
              <SelectValue placeholder="Year" />
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
            <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
              <SelectValue placeholder="Month" />
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

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportPDF}
              className="flex-1 bg-white/50 dark:bg-gray-800/50"
            >
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={onPrint} className="flex-1 bg-white/50 dark:bg-gray-800/50">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-4 border-t border-white/20 dark:border-gray-700/20 mt-4">
            <Select
              value={filters.category || "all"}
              onValueChange={(value) => updateFilter("category", value === "all" ? undefined : value)}
            >
              <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {ALL_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal bg-white/50 dark:bg-gray-800/50"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange?.start
                    ? filters.dateRange.end
                      ? `${format(filters.dateRange.start, "dd.MM.yyyy")} - ${format(filters.dateRange.end, "dd.MM.yyyy")}`
                      : format(filters.dateRange.start, "dd.MM.yyyy")
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

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Results</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Filtered transactions</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{transactionCount}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
