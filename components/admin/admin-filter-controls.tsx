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
    <Card className="glass-admin-filters backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-lg shadow-md relative overflow-hidden admin-card mb-6">
      {/* Decorative gradient blobs - positioned to avoid overflow issues */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-300/20 blur-3xl dark:from-blue-900/20 dark:to-purple-800/20 pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-pink-200/20 to-blue-300/20 blur-3xl dark:from-pink-900/10 dark:to-blue-800/10 pointer-events-none"></div>
      
      <CardHeader className="border-b border-white/20 dark:border-gray-700/30 relative z-10 py-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="rounded-full p-1.5 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm shadow-sm">
                <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">Admin Filters & Export</CardTitle>
            </div>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs ml-2 bg-white/40 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
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
      <CardContent className="p-5">
        <div className="flex items-center space-x-3 mb-5">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-white/60 dark:bg-gray-800/60 border-white/30 dark:border-gray-700/40 backdrop-blur-sm shadow-inner h-10"
          />
        </div>
        
        {/* Admin Dropdown - Always visible */}
        <div className="mb-5">
          <Select
            value={selectedAdmin || "all"}
            onValueChange={(value) => {
              setSelectedAdmin(value === "all" ? undefined : value);
              updateFilter("name", value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="bg-white/60 dark:bg-gray-800/60 border-white/30 dark:border-gray-700/40 backdrop-blur-sm shadow-sm h-10 hover:border-white/50 dark:hover:border-gray-700/60">
              <SelectValue placeholder="Select Admin" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-white/30 dark:border-gray-700/40">
              <SelectItem value="all">All Names</SelectItem>
              {ADMIN_USERS.map((admin) => (
                <SelectItem key={admin.value} value={admin.value}>
                  <div className="flex items-center space-x-2">
                    <Users className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                    <span>{admin.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isExpanded && (
          <>
            
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
                <SelectTrigger className="backdrop-blur-sm bg-white/70 dark:bg-gray-700/70 border-white/20 dark:border-gray-600/50 hover:border-blue-300/50 dark:hover:border-blue-500/30 focus:border-blue-500/50 dark:focus:border-blue-400/30 shadow-sm transition-all duration-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-white/20 dark:border-gray-700/30 shadow-lg">
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
                    className="justify-start text-left font-normal backdrop-blur-sm bg-white/70 dark:bg-gray-700/70 border-white/20 dark:border-gray-600/50 hover:border-blue-300/50 dark:hover:border-blue-500/30 hover:bg-white/80 dark:hover:bg-gray-700/80 shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm">
                        <CalendarIcon className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>
                        {filters.dateRange?.start
                          ? filters.dateRange.end
                            ? `${format(filters.dateRange.start, "dd.MM.yyyy")} - ${format(filters.dateRange.end, "dd.MM.yyyy")}`
                            : format(filters.dateRange.start, "dd.MM.yyyy")
                          : "Date Range"}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-white/20 dark:border-gray-700/30 shadow-lg" align="start">
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
                    className="rounded-md overflow-hidden"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between p-4 rounded-xl backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 border border-white/30 dark:border-gray-700/40 shadow-sm mb-5 relative overflow-hidden">
              {/* Decorative blob */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-200/20 to-purple-300/20 blur-xl dark:from-blue-900/20 dark:to-purple-800/20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Results</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Filtered transactions</p>
              </div>
              <div className="text-right relative z-10">
                <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">{transactionCount}</p>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              <Button
                variant="outline"
                onClick={onExportPDF}
                className="backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border-white/20 dark:border-gray-700/40 hover:bg-white/80 dark:hover:bg-gray-700/80 shadow-sm transition-all duration-200 flex items-center justify-center h-10"
              >
                <div className="rounded-full p-1 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm mr-2.5">
                  <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium">Export PDF</span>
              </Button>
              <Button 
                variant="outline"
                onClick={onPrint} 
                className="backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border-white/20 dark:border-gray-700/40 hover:bg-white/80 dark:hover:bg-gray-700/80 shadow-sm transition-all duration-200 flex items-center justify-center h-10"
              >
                <div className="rounded-full p-1 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm mr-2.5">
                  <Printer className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium">Print</span>
              </Button>
            </div>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 lg:px-4 backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border-white/20 dark:border-gray-700/40 hover:bg-white/80 dark:hover:bg-gray-700/80 shadow-sm transition-all duration-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Filter className="h-4 w-4 mr-1 lg:mr-2 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline text-gray-700 dark:text-gray-200 font-medium">{isExpanded ? "Hide Filters" : "Show Filters"}</span>
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 lg:px-4 backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-gray-100 border border-white/20 dark:border-gray-700/20 shadow-sm transition-all duration-200"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline font-medium">Clear</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
