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

// Admin users for the system
const ADMIN_USERS = [
  { value: "asjid-farooq", label: "Asjid Farooq" },
  { value: "zahid-chaudhary", label: "Zahid Chaudhary" },
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
  const [selectedAdmin, setSelectedAdmin] = useState<string | undefined>(filters.name)

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    // Create a new filters object with the updated value
    const newFilters = { ...filters, [key]: value }
    
    // If we're updating the name filter, ensure it's properly set
    if (key === "name") {
      // If value is undefined or "all", remove the name filter
      if (value === undefined || value === "all") {
        delete newFilters.name
      } else {
        // Otherwise set it to the selected value
        newFilters.name = value
      }
    }
    
    onFiltersChange(newFilters)
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
    <Card className="bg-white dark:bg-gray-800/30 dark:backdrop-blur-md dark:border-gray-700 rounded-lg shadow-sm">
      <CardHeader className="dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-gray-700 dark:text-gray-200">Admin Filters & Export</CardTitle>
            </div>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs ml-2 dark:bg-gray-700 dark:text-gray-300">
                {getActiveFilterCount()} active
              </Badge>
            )}
            {filters.name && (
              <Badge variant="secondary" className="flex items-center space-x-1 ml-2 dark:bg-gray-700 dark:text-gray-300">
                <span>{ADMIN_USERS.find((a) => a.value === filters.name)?.label}</span>
                <button
                  onClick={() => {
                    updateFilter("name", undefined);
                    setSelectedAdmin(undefined);
                  }}
                  className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 text-blue-500 border-blue-200 dark:border-gray-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600"
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
      <CardContent className="space-y-4 dark:bg-gray-800">
        {/* Admin Dropdown - Always visible */}
        <div className="mb-4">
          <Select
            value={selectedAdmin || "all"}
            onValueChange={(value) => {
              setSelectedAdmin(value === "all" ? undefined : value);
              updateFilter("name", value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
              <SelectValue placeholder="Select Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Names</SelectItem>
              {ADMIN_USERS.map((admin) => (
                <SelectItem key={admin.value} value={admin.value}>
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                    <span>{admin.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isExpanded && (
          <>
            {/* Search */}
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
              />
            </div>
            
            {/* Filter Controls - First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Select
                value={filters.type || "all"}
                onValueChange={(value) => updateFilter("type", value === "all" ? undefined : value)}
              >
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
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
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
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
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
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

            {/* Additional Filters - Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Select
                value={filters.category || "all"}
                onValueChange={(value) => updateFilter("category", value === "all" ? undefined : value)}
              >
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
                  <SelectValue placeholder="All Categories" />
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
                    className="justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
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
            </div>

            {/* Results */}
            <div className="flex items-center justify-between p-3 rounded bg-blue-50 dark:bg-blue-900/20 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Results</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Filtered transactions</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{transactionCount}</p>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={onExportPDF}
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-1" />
                Export PDF
              </Button>
              <Button 
                variant="outline"
                onClick={onPrint} 
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
              >
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
