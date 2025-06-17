"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronDown, ChevronUp, Search, FileText, Printer } from "lucide-react"
import { format } from "date-fns"

export interface UserTransferFilterOptions {
  year: string
  month: string
  day: string
  name: string
}

interface UserTransferFilterControlsProps {
  filters: UserTransferFilterOptions
  onFiltersChange: (filters: UserTransferFilterOptions) => void
  onExportPDF: () => void
  onPrint: () => void
  transferCount: number
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function UserTransferFilterControls({
  filters,
  onFiltersChange,
  onExportPDF,
  onPrint,
  transferCount,
  searchTerm,
  onSearchChange,
}: UserTransferFilterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      onFiltersChange({
        ...filters,
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
        day: date.getDate().toString(),
      })
    }
  }

  const handleNameFilterChange = (value: string) => {
    onFiltersChange({
      ...filters,
      name: value,
    })
  }

  const clearFilters = () => {
    setSelectedDate(undefined)
    onFiltersChange({
      year: "",
      month: "",
      day: "",
      name: "",
    })
  }

  const hasActiveFilters = filters.year || filters.month || filters.day || filters.name

  return (
    <div className="glass-card border-0 p-4 rounded-xl space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white/50 dark:bg-gray-800/50"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide Filters
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show Filters
              </>
            )}
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transfers..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64 bg-white/50 dark:bg-gray-800/50"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {transferCount} {transferCount === 1 ? "transfer" : "transfers"}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportPDF}
            className="bg-white/50 dark:bg-gray-800/50"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            className="bg-white/50 dark:bg-gray-800/50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date Filter</Label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/50 dark:bg-gray-800/50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameFilter">Name Filter</Label>
              <Input
                id="nameFilter"
                placeholder="Filter by name"
                value={filters.name}
                onChange={(e) => handleNameFilterChange(e.target.value)}
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
