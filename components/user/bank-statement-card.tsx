"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, LineChart, Plus } from "lucide-react"

interface BankStatementCardProps {
  period: string;
  userName?: string;
  onViewAnalytics: () => void;
  onAddTransaction: () => void;
}

export function BankStatementCard({
  period,
  userName = "User",
  onViewAnalytics,
  onAddTransaction,
}: BankStatementCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50/70 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-300">
            Bank Statement
          </CardTitle>
          <p className="text-xs text-blue-500/80 dark:text-blue-400/80">
            {period}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-blue-600/80 dark:text-blue-300/80">
              Hello, <span className="font-medium">{userName}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              onClick={onViewAnalytics}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              <LineChart className="w-4 h-4 mr-2" />
              View Analytics
            </button>
            <button
              onClick={onAddTransaction}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-700 transition-colors bg-white border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200 dark:hover:bg-blue-900/50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Transaction
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
