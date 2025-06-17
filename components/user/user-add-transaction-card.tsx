"use client"

import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UserAddTransactionCardProps {
  onClick: () => void
}

export function UserAddTransactionCard({ onClick }: UserAddTransactionCardProps) {
  return (
    <Card className="border-dashed border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[180px]">
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
          <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Add New Transaction</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Record a new income or expense</p>
        <Button 
          onClick={onClick}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </CardContent>
    </Card>
  )
}
