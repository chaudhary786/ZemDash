"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { calculateFinancialSummary, filterTransactions } from "@/lib/finance-utils"
import type { Transaction, FilterOptions, FinancialSummary } from "@/types/finance"
import { UserTransactionModal } from "@/components/user/user-transaction-modal"
import { UserFilterControls } from "@/components/user/user-filter-controls"
import { 
  FinancialHealthScoreCard,
  TotalTransactionsCard,
  MonthlyBalanceCard,
  MonthlyIncomeCard,
  MonthlyExpensesCard,
  NetBalanceCard,
} from "@/components/user/user-finance-card"
import { BankStatementCard } from "@/components/user/bank-statement-card"
import { UserAddTransactionCard } from "@/components/user/user-add-transaction-card"
import { UserTransactionHistoryCard } from "@/components/user/user-transaction-history-card"

// Mock data - in a real app, this would come from an API
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2024-12-15"),
    day: "Sunday",
    type: "income",
    category: "stripe",
    amount: 2500.0,
    quantity: 1,
    description: "Monthly subscription revenue",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    date: new Date("2024-12-10"),
    day: "Tuesday",
    type: "expense",
    category: "office",
    amount: 450.0,
    quantity: 1,
    description: "Office rent",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    date: new Date("2024-12-05"),
    day: "Thursday",
    type: "income",
    category: "stripe",
    amount: 1200.0,
    quantity: 1,
    description: "New customer subscriptions",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    date: new Date("2024-12-02"),
    day: "Monday",
    type: "expense",
    category: "software",
    amount: 79.99,
    quantity: 1,
    description: "Software subscription",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    date: new Date("2024-11-28"),
    day: "Thursday",
    type: "expense",
    category: "travel",
    amount: 350.0,
    quantity: 2,
    description: "Business transportation",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function UserFinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [filters, setFilters] = useState<FilterOptions>({})
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all")
  const [sortConfig, setSortConfig] = useState<{
    key: "date" | null
    direction: "asc" | "desc"
  }>({ key: "date", direction: "desc"})

  // Filter transactions based on selected filters and search term
  const filteredTransactions = useMemo(() => {
    let result = filterTransactions(transactions, {
      type: filters.type,
      category: filters.category,
      start: filters.dateRange?.start,
      end: filters.dateRange?.end,
      searchTerm
    })
    
    // Apply tab filter
    if (activeTab === "income") {
      result = result.filter(t => t.type === "income")
    } else if (activeTab === "expense") {
      result = result.filter(t => t.type === "expense")
    }
    
    return result
  }, [transactions, filters, searchTerm, activeTab])

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
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  // Calculate financial health score (0-100) based on income-to-expense ratio
  const calculateHealthScore = (income: number, expenses: number): number => {
    if (income === 0 && expenses === 0) return 0;
    if (expenses === 0) return 100; // No expenses is perfect health
    
    const ratio = income / expenses;
    // Cap the ratio at 3 (300%) for score calculation
    const cappedRatio = Math.min(ratio, 3);
    // Convert to a 0-100 score where 1:1 ratio is 50, 3:1 is 100, 0:1 is 0
    const score = Math.min(100, Math.max(0, (cappedRatio / 3) * 100));
    return Math.round(score);
  };

  // Calculate financial summary
  const financialSummary: FinancialSummary = useMemo(() => {
    return calculateFinancialSummary(filteredTransactions)
  }, [filteredTransactions])

  // Calculate income and expense totals
  const incomeSummary = useMemo(() => {
    const incomeTransactions = filteredTransactions.filter(t => t.type === "income")
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0)
    return { totalIncome, count: incomeTransactions.length }
  }, [filteredTransactions])

  const expenseSummary = useMemo(() => {
    const expenseTransactions = filteredTransactions.filter(t => t.type === "expense")
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0)
    return { totalExpenses, count: expenseTransactions.length }
  }, [filteredTransactions])

  // Calculate net balance
  const netBalance: number = useMemo(() => {
    return (incomeSummary.totalIncome || 0) - (expenseSummary.totalExpenses || 0)
  }, [incomeSummary, expenseSummary])
  
  // Handle export to PDF
  const handleExportPDF = () => {
    console.log("Exporting PDF...")
    // Implementation would go here
  }
  
  // Handle print statement
  const handlePrint = () => {
    console.log("Printing...")
    window.print()
  }

  const getPeriodDisplay = () => {
    if (filters.dateRange?.start && filters.dateRange?.end) {
      return `${format(filters.dateRange.start, "MMM d, yyyy")} - ${format(filters.dateRange.end, "MMM d, yyyy")}`
    } else if (filters.month !== undefined && filters.year !== undefined) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      return `${monthNames[filters.month - 1]} ${filters.year}`
    } else if (filters.year !== undefined) {
      return `${filters.year}`
    } else {
      return "All Time"
    }
  }

  const handleCreateTransaction = () => {
    setEditingTransaction(null)
    setModalMode("create")
    setIsTransactionModalOpen(true)
  }

  const handleAddTransaction = (data: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
    const newTransaction: Transaction = {
      ...data,
      id: `${transactions.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTransactions([...transactions, newTransaction])
    setIsTransactionModalOpen(false)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setModalMode("edit")
    setIsTransactionModalOpen(true)
  }

  const handleUpdateTransaction = (data: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
    if (!editingTransaction) return

    const updatedTransaction: Transaction = {
      ...data,
      id: editingTransaction.id,
      createdAt: editingTransaction.createdAt,
      updatedAt: new Date(),
    }

    setTransactions(transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    ))
    setIsTransactionModalOpen(false)
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }
  
  // Get category label
  const getCategoryLabel = (category: string) => {
    return category.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")
  }

  return (
    <div className="space-y-6">
      {/* Top Row - Bank Statement */}
      <div className="grid grid-cols-1 gap-4">
        <BankStatementCard 
          period={getPeriodDisplay()}
          onViewAnalytics={() => console.log("View Analytics")}
          onAddTransaction={handleCreateTransaction}
        />
      </div>

      {/* Middle Row - Financial Health and Total Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinancialHealthScoreCard
          score={calculateHealthScore(financialSummary.totalIncome, financialSummary.totalExpenses)}
          description="Based on your income-to-expense ratio"
        />
        <TotalTransactionsCard 
          count={financialSummary.transactionCount}
          incomeCount={financialSummary.incomeCount}
          expenseCount={financialSummary.expenseCount}
          period={format(new Date(), 'MMMM yyyy')}
        />
      </div>

      {/* Bottom Section - 4 Column Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MonthlyBalanceCard 
          balance={netBalance}
          period={format(new Date(), 'MMMM yyyy')}
        />
        <MonthlyIncomeCard 
          income={incomeSummary.totalIncome || 0}
          transactionCount={incomeSummary.count}
        />
        <MonthlyExpensesCard 
          expenses={expenseSummary.totalExpenses || 0}
          transactionCount={expenseSummary.count}
        />
        <NetBalanceCard 
          balance={financialSummary.netBalance}
          trend={financialSummary.netBalance >= 0 ? 'up' : 'down'}
          trendValue={`${Math.abs(financialSummary.netBalanceChangePercent || 0)}%`}
        />
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <UserFilterControls
          filters={filters}
          onFiltersChange={setFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExportPDF={handleExportPDF}
          onPrint={handlePrint}
          transactionCount={filteredTransactions.length}
        />
      </div>
      
      {/* Transaction History Card */}
      <UserTransactionHistoryCard
        transactions={filteredTransactions}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
        formatCurrency={formatCurrency}
        getCategoryLabel={getCategoryLabel}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as "all" | "income" | "expense")}
      />

      {/* Transaction modal */}
      <UserTransactionModal
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
        mode={modalMode}
        transaction={editingTransaction}
        onSubmit={modalMode === "create" ? handleAddTransaction : handleUpdateTransaction}
      />
    </div>
  )
}
