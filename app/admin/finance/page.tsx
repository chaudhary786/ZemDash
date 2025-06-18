"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, Plus, Edit, Trash2, FileText, Calendar, Shield, Users } from "lucide-react"
import { AdminTransactionModal } from "@/components/admin/admin-transaction-modal"
import { AdminFilterControls } from "@/components/admin/admin-filter-controls"
import { FinancialSummaryComponent } from "@/components/finance/financial-summary"
import { FinancialHealthScoreCard } from "@/components/finance/financial-health-score-card"
import { TotalTransactionsCard } from "@/components/finance/total-transactions-card"
import { TransactionTrendsCard } from "@/components/finance/transaction-trends-card"
import { format } from "date-fns"
import type { Transaction, FilterOptions, FinancialSummary } from "@/types/finance"
import { ADMIN_USERS } from "@/types/finance"

// Mock data with admin names - in a real app, this would come from an API
const mockAdminTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2024-12-15"),
    day: "Sunday",
    type: "income",
    category: "stripe",
    amount: 2500.0,
    quantity: 1,
    description: "Monthly subscription revenue",
    name: "asjid-farooq",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    date: new Date("2024-12-14"),
    day: "Saturday",
    type: "expense",
    category: "web-hosting",
    amount: 89.99,
    quantity: 1,
    description: "Server hosting costs",
    name: "zahid-chaudhary",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    date: new Date("2024-12-13"),
    day: "Friday",
    type: "income",
    category: "sumup",
    amount: 1250.5,
    quantity: 1,
    description: "Payment processing revenue",
    name: "asjid-farooq",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    date: new Date("2024-12-12"),
    day: "Thursday",
    type: "expense",
    category: "drei",
    amount: 45.9,
    quantity: 1,
    description: "Mobile phone bill",
    name: "zahid-chaudhary",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    date: new Date("2024-12-11"),
    day: "Wednesday",
    type: "expense",
    category: "pay-asjid",
    amount: 2500.0,
    quantity: 1,
    description: "Monthly salary payment",
    name: "asjid-farooq",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    date: new Date("2024-12-10"),
    day: "Tuesday",
    type: "expense",
    category: "pay-zahid",
    amount: 2200.0,
    quantity: 1,
    description: "Monthly salary payment",
    name: "zahid-chaudhary",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    date: new Date("2024-12-09"),
    day: "Monday",
    type: "income",
    category: "randstad",
    amount: 3200.0,
    quantity: 1,
    description: "Consulting services payment",
    name: "asjid-farooq",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    date: new Date("2024-12-08"),
    day: "Sunday",
    type: "expense",
    category: "arag-versicherung",
    amount: 125.5,
    quantity: 1,
    description: "Monthly insurance premium",
    name: "zahid-chaudhary",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function AdminFinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockAdminTransactions)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [filters, setFilters] = useState<FilterOptions>({})
  const [sortConfig, setSortConfig] = useState<{
    key: "date" | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })
  const [searchTerm, setSearchTerm] = useState("")
  
  // Add decorative blob animation CSS class
  const blobAnimation = "animate-pulse-slow"

  // Enhanced filter transactions with search functionality
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Search functionality - search across multiple fields
      if (searchTerm.trim() !== "") {
        const searchLower = searchTerm.toLowerCase()
        const adminLabel = getAdminLabel(transaction.name).toLowerCase()
        const categoryLabel = getCategoryLabel(transaction.category).toLowerCase()
        const description = (transaction.description || "").toLowerCase()
        const amount = transaction.amount.toString()
        const date = format(transaction.date, "dd.MM.yyyy")

        const matchesSearch =
          (transaction.description?.toLowerCase().includes(searchLower) ?? false) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          transaction.amount.toString().includes(searchLower) ||
          (transaction.type.toLowerCase().includes(searchLower)) ||
          (transaction.name?.toLowerCase().includes(searchLower) ?? false)

        if (!matchesSearch) {
          return false
        }
      }

      // Type filter
      if (filters.type && transaction.type !== filters.type) return false

      // Admin filter (specific to admin dashboard)
      if (filters.name && transaction.name !== filters.name) return false

      // Category filter
      if (filters.category && transaction.category !== filters.category) return false

      // Year filter
      if (filters.year && new Date(transaction.date).getFullYear() !== filters.year) return false

      // Month filter
      if (filters.month && new Date(transaction.date).getMonth() + 1 !== filters.month) return false

      // Date range filter
      if (filters.dateRange) {
        const transactionDate = new Date(transaction.date)
        const start = new Date(filters.dateRange.start)
        const end = filters.dateRange.end ? new Date(filters.dateRange.end) : new Date(filters.dateRange.start)
        
        // Set time to beginning and end of day for proper comparison
        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 999)
        
        if (transactionDate < start || transactionDate > end) return false
      }

      return true
    })
  }, [transactions, filters, searchTerm])

  // Sort transactions based on current sort config
  const sortedTransactions = useMemo(() => {
    if (!sortConfig.key) return filteredTransactions

    return [...filteredTransactions].sort((a, b) => {
      if (sortConfig.key === "date") {
        const dateA = a.date.getTime()
        const dateB = b.date.getTime()

        if (sortConfig.direction === "asc") {
          return dateA - dateB
        } else {
          return dateB - dateA
        }
      }
      return 0
    })
  }, [filteredTransactions, sortConfig])

  const handleSort = (key: "date") => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  // Enhanced financial summary calculation using filtered data for real-time updates
  const financialSummary = useMemo((): FinancialSummary => {
    // Use filtered transactions for summary when filters are active
    const sourceTransactions =
      Object.keys(filters).length > 0 || searchTerm.trim() !== "" ? filteredTransactions : transactions

    // Determine which month to show in summary cards
    let targetMonth: number
    let targetYear: number

    if (filters.month && filters.year) {
      targetMonth = filters.month
      targetYear = filters.year
    } else if (filters.month) {
      targetMonth = filters.month
      targetYear = new Date().getFullYear()
    } else if (filters.year) {
      targetMonth = new Date().getMonth() + 1
      targetYear = filters.year
    } else {
      const currentDate = new Date()
      targetMonth = currentDate.getMonth() + 1
      targetYear = currentDate.getFullYear()
    }

    // Get transactions for the target month/year from filtered data
    const targetMonthTransactions = sourceTransactions.filter((t) => {
      // If we have active filters other than date filters, use all filtered data
      if (searchTerm.trim() !== "" || filters.type || filters.category) {
        return true // Use all filtered transactions
      }
      // Otherwise filter by target month/year
      return t.date.getMonth() + 1 === targetMonth && t.date.getFullYear() === targetYear
    })

    const income = targetMonthTransactions.filter((t) => t.type === "income")
    const expenses = targetMonthTransactions.filter((t) => t.type === "expense")

    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)
    const netBalance = totalIncome - totalExpenses

    // Calculate previous month for comparison (only when no active filters)
    let prevMonthIncome = 0
    let prevMonthExpenses = 0
    let prevMonthNetBalance = 0

    if (Object.keys(filters).length === 0 && searchTerm.trim() === "") {
      let prevMonth = targetMonth - 1
      let prevYear = targetYear
      if (prevMonth === 0) {
        prevMonth = 12
        prevYear = targetYear - 1
      }

      const prevMonthTransactions = transactions.filter((t) => {
        return t.date.getMonth() + 1 === prevMonth && t.date.getFullYear() === prevYear
      })

      const prevIncome = prevMonthTransactions.filter((t) => t.type === "income")
      const prevExpenses = prevMonthTransactions.filter((t) => t.type === "expense")

      prevMonthIncome = prevIncome.reduce((sum, t) => sum + t.amount, 0)
      prevMonthExpenses = prevExpenses.reduce((sum, t) => sum + t.amount, 0)
      prevMonthNetBalance = prevMonthIncome - prevMonthExpenses
    }

    // Calculate percentage changes
    const incomeChangePercent =
      prevMonthIncome > 0 ? ((totalIncome - prevMonthIncome) / prevMonthIncome) * 100 : undefined
    const expensesChangePercent =
      prevMonthExpenses > 0 ? ((totalExpenses - prevMonthExpenses) / prevMonthExpenses) * 100 : undefined
    const balanceChangePercent =
      prevMonthIncome > 0 ? ((totalIncome - prevMonthIncome) / prevMonthIncome) * 100 : undefined
    const netBalanceChangePercent =
      prevMonthNetBalance !== 0 ? ((netBalance - prevMonthNetBalance) / Math.abs(prevMonthNetBalance)) * 100 : undefined

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      totalBalance: totalIncome,
      transactionCount: targetMonthTransactions.length,
      incomeCount: income.length,
      expenseCount: expenses.length,
      incomeChangePercent,
      expensesChangePercent,
      balanceChangePercent,
      netBalanceChangePercent,
    }
  }, [transactions, filteredTransactions, filters, searchTerm])

  // Enhanced summary period display
  const getSummaryPeriod = () => {
    // Show "Filtered Results" when search or filters are active
    if (
      searchTerm.trim() !== "" ||
      Object.keys(filters).some((key) => {
        const value = filters[key as keyof FilterOptions]
        return value !== undefined && value !== null && value !== "all"
      })
    ) {
      return "Filtered Results"
    }

    let targetMonth: number
    let targetYear: number

    if (filters.month && filters.year) {
      targetMonth = filters.month
      targetYear = filters.year
    } else if (filters.month) {
      targetMonth = filters.month
      targetYear = new Date().getFullYear()
    } else if (filters.year) {
      targetMonth = new Date().getMonth() + 1
      targetYear = filters.year
    } else {
      const currentDate = new Date()
      targetMonth = currentDate.getMonth() + 1
      targetYear = currentDate.getFullYear()
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return `${monthNames[targetMonth - 1]} ${targetYear}`
  }

  const handleCreateTransaction = () => {
    setEditingTransaction(null)
    setModalMode("create")
    setIsTransactionModalOpen(true)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setModalMode("edit")
    setIsTransactionModalOpen(true)
  }

  const handleDeleteTransaction = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    }
  }

  const handleSubmitTransaction = (data: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
    if (modalMode === "create") {
      const newTransaction: Transaction = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setTransactions((prev) => [newTransaction, ...prev])
    } else if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id ? { ...data, id: t.id, createdAt: t.createdAt, updatedAt: new Date() } : t,
        ),
      )
    }
  }

  const handleExportPDF = () => {
    console.log("Exporting transactions to PDF...")
    alert("PDF export functionality would be implemented here")
  }

  const handlePrint = () => {
    window.print()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getCategoryLabel = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getAdminLabel = (adminValue: string | undefined) => {
    if (!adminValue) return "Unknown"
    const admin = ADMIN_USERS.find((a) => a.value === adminValue)
    return admin ? admin.label : adminValue
  }

  const getSelectedPeriod = () => {
    if (filters.year && filters.month) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      return `${monthNames[filters.month - 1]} ${filters.year}`
    }
    if (filters.year) return filters.year.toString()
    if (filters.dateRange) {
      return `${format(filters.dateRange.start, "dd.MM.yyyy")} - ${format(filters.dateRange.end || filters.dateRange.start, "dd.MM.yyyy")}`
    }
    return "All Time"
  }

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="glass-finance-card rounded-xl p-6 relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-300/30 blur-2xl dark:from-blue-900/20 dark:to-purple-800/20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-pink-200/20 to-blue-300/20 blur-2xl dark:from-pink-900/10 dark:to-blue-800/10"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="rounded-full p-2 bg-gradient-to-br from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm shadow-sm">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">Finance Management</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
              <div className="flex items-center space-x-2 bg-white/30 dark:bg-gray-800/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <span>{getSelectedPeriod()}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/30 dark:bg-gray-800/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <span>System-wide Transactions</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80 shadow-sm transition-all duration-200"
            >
              <BarChart3 className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-200">Reports</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-md hover:shadow-lg transition-all duration-200" 
              onClick={handleCreateTransaction}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      {/* Financial Health and Transactions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <FinancialHealthScoreCard 
          score={financialSummary.totalIncome > 0 ? Math.min(100, Math.round((financialSummary.netBalance / financialSummary.totalIncome) * 100)) : 0} 
          label={financialSummary.netBalance >= 0 ? "Positive" : "Negative"} 
        />
        <TotalTransactionsCard 
          count={sortedTransactions.length} 
          changePercentage={8.3} 
        />
        <TransactionTrendsCard 
          weeklyTrends={[5, 8, 3, -2, 6, 9, 4]} 
          monthlyTrend="+15% growth trend"
        />
      </div>
      
      <FinancialSummaryComponent summary={financialSummary} selectedPeriod={getSummaryPeriod()} />

      {/* Enhanced Filter Controls */}
      <AdminFilterControls
        filters={filters}
        onFiltersChange={setFilters}
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
        transactionCount={filteredTransactions.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Transactions Table */}
      <Card className="glass-finance-card backdrop-blur-xl border-0 relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-300/20 blur-3xl dark:from-blue-900/20 dark:to-purple-800/20"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-tr from-pink-200/20 to-blue-300/20 blur-3xl dark:from-pink-900/10 dark:to-blue-800/10"></div>
        
        <CardHeader className="relative z-10 border-b border-white/10 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">Transaction History</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                System-wide transaction management
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm bg-white/40 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
              {filteredTransactions.length} transactions
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="rounded-lg overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-gray-800/30 border border-white/10 dark:border-gray-700/10 shadow-inner">
            <Table className="[&_tr:hover]:bg-white/10 dark:[&_tr:hover]:bg-gray-800/20 [&_th]:text-gray-600 dark:[&_th]:text-gray-300 [&_th]:font-medium">
              <TableHeader>
                <TableRow className="border-white/20 dark:border-gray-700/20">
                  <TableHead
                    className="text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors select-none"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {sortConfig.key === "date" && (
                        <span className="text-blue-600 dark:text-blue-400">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Day</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTransactions.length === 0 ? (
                  <TableRow className="border-white/20 dark:border-gray-700/20">
                    <TableCell colSpan={7} className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-white/20 dark:border-gray-700/20 hover:bg-white/10 dark:hover:bg-gray-800/20 transition-colors backdrop-blur-sm">
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {format(transaction.date, "dd.MM.yyyy")}
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
                          <div className="w-6 h-6 rounded-full bg-blue-100/80 dark:bg-blue-900/30 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {getAdminLabel(transaction.name)
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {getAdminLabel(transaction.name)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditTransaction(transaction)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTransaction(transaction.id)}
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
        </CardContent>
      </Card>

      {/* Transaction Modal */}
      <AdminTransactionModal
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
        onSubmit={handleSubmitTransaction}
        transaction={editingTransaction}
        mode={modalMode}
      />
    </div>
  )
}
