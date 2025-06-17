"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Filter, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface FiltersProps {
  /** Optional className for styling */
  className?: string
  /** Optional children to render inside the filters panel */
  children?: React.ReactNode
  /** Callback when export button is clicked */
  onExport?: () => void
}

export function Filters({ 
  className,
  children,
  onExport 
}: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          {onExport && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={onExport}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <Card className="mt-4 border">
          <CardContent className="p-4">
            {children}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
