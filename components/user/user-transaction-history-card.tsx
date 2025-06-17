"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { format, parseISO } from "date-fns"
import type { Transaction } from "@/types/finance"

interface UserTransactionHistoryCardProps {
  transactions: Transaction[]
  onEditTransaction: (transaction: Transaction) => void
  onDeleteTransaction: (id: string) => void
  formatCurrency: (amount: number) => string
  getCategoryLabel: (category: string) => string
  activeTab?: "all" | "income" | "expense"
  onTabChange?: (value: string) => void
}

type SortDirection = 'asc' | 'desc';
type SortableField = 'date' | 'amount';

export function UserTransactionHistoryCard({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
  formatCurrency,
  getCategoryLabel,
  activeTab = "all",
  onTabChange,
}: UserTransactionHistoryCardProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortableField;
    direction: SortDirection;
  }>({ key: 'date', direction: 'desc' });

  const handleSort = (key: SortableField) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return sortConfig.direction === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        return sortConfig.direction === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });
  }, [transactions, sortConfig]);
  
  const SortableHeader = ({ 
    children, 
    sortKey,
    className = '' 
  }: { 
    children: React.ReactNode; 
    sortKey: SortableField;
    className?: string;
  }) => (
    <TableHead 
      className={`text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortConfig.key === sortKey && (
          sortConfig.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
        )}
      </div>
    </TableHead>
  );
  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Transaction History</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            View and manage your financial transactions
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={onTabChange}>
          <div className="px-6 border-b border-gray-100 dark:border-gray-800">
            <TabsList className="h-12 bg-transparent gap-4">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-full"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-full"
              >
                Income
              </TabsTrigger>
              <TabsTrigger
                value="expense"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-full"
              >
                Expenses
              </TabsTrigger>
            </TabsList>
          </div>

          {["all", "income", "expense"].map((tab) => (
            <TabsContent key={tab} value={tab} className="m-0">
              <div className="overflow-auto">
                <Table>
                  <TableHeader className="bg-gray-50/50 dark:bg-gray-800/50">
                    <TableRow className="border-white/20 dark:border-gray-700/20 hover:bg-transparent">
                      <SortableHeader sortKey="date">Date</SortableHeader>
                      <TableHead className="text-gray-500 dark:text-gray-400">Day</TableHead>
                      <TableHead className="text-gray-500 dark:text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-500 dark:text-gray-400">Category</TableHead>
                      <SortableHeader sortKey="amount" className="text-right">Amount</SortableHeader>
                      <TableHead className="text-gray-500 dark:text-gray-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTransactions.length === 0 ? (
                      <TableRow className="border-white/20 dark:border-gray-700/20">
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <p className="text-sm">No transactions found</p>
                            <p className="text-xs mt-1">Try adjusting your filters</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="border-white/20 dark:border-gray-700/20">
                          <TableCell className="font-medium text-gray-900 dark:text-white">
                            {format(transaction.date, "MM/dd/yyyy")}
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">{transaction.day}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  transaction.type === "income" ? "bg-green-500" : "bg-red-500"
                                }`}
                              />
                              <span className="capitalize text-gray-700 dark:text-gray-300">{transaction.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {getCategoryLabel(transaction.category)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.type === "income" ? "+" : "-"}
                              {formatCurrency(transaction.amount)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEditTransaction(transaction)}
                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDeleteTransaction(transaction.id)}
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
