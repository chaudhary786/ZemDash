"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, ChevronDown, ChevronUp, FileDown, Printer } from "lucide-react"
import { format } from "date-fns"

export interface TransferFilterOptions {
  year: string
  month: string
  day: string
  name: string
}

interface TransferFilterControlsProps {
  filters: TransferFilterOptions
  onFiltersChange: (filters: TransferFilterOptions) => void
  onExportPDF: () => void
  onPrint: () => void
  transferCount: number
  searchTerm: string
  onSearchChange: (search: string) => void
}

export function TransferFilterControls({
  filters,
  onFiltersChange,
  onExportPDF,
  onPrint,
  transferCount,
  searchTerm,
  onSearchChange,
}: TransferFilterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      onFiltersChange({
        ...filters,
        year: format(selectedDate, "yyyy"),
        month: format(selectedDate, "MM"),
        day: format(selectedDate, "dd"),
      })
    }
  }

  const clearDate = () => {
    setDate(undefined)
    onFiltersChange({
      ...filters,
      year: "",
      month: "",
      day: "",
    })
  }

  const handleNameChange = (value: string) => {
    onFiltersChange({
      ...filters,
      name: value,
    })
  }

  const clearAllFilters = () => {
    setDate(undefined)
    onFiltersChange({
      year: "",
      month: "",
      day: "",
      name: "",
    })
    onSearchChange("")
  }

  const activeFilterCount = [
    !!searchTerm?.trim(),
    !!filters.year,
    !!filters.name?.trim(),
  ].filter(Boolean).length

  return (
    <Card className="border-0 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <span>Filters & Export</span>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              {activeFilterCount}
            </span>
          )}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-600"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transfers..."
              value={searchTerm || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-gray-800/50"
            />
          </div>

          {isExpanded && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Filter</label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-white/50 dark:bg-gray-800/50"
                        >
                          {date ? format(date, "dd.MM.yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {date && (
                      <Button variant="ghost" size="icon" onClick={clearDate}>
                        ×
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Name Filter</label>
                  <Input
                    placeholder="Filter by name"
                    value={filters.name || ""}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50"
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <Button
                    variant="outline"
                    className="bg-white/50 dark:bg-gray-800/50"
                    onClick={clearAllFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Results: <span className="font-medium">{transferCount} transfers</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50"
                    onClick={onExportPDF}
                  >
                    <FileDown className="h-4 w-4" />
                    <span>PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50"
                    onClick={onPrint}
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
