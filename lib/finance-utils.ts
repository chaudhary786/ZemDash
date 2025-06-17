import { format } from "date-fns"
import type { Transaction } from "@/types/finance"

/**
 * Get the day name from a date object
 */
export const getDayFromDate = (date: Date): string => {
  return format(date, "EEEE")
}

/**
 * Validate a transaction form data object
 * Returns an object with error messages for invalid fields
 */
export const validateTransactionForm = (formData: {
  category: string
  amount: number
  adminId?: string
  useCustomCategory?: boolean
}): Record<string, string | undefined> => {
  const errors: Record<string, string | undefined> = {}

  if (!formData.category && !formData.useCustomCategory) {
    errors.category = "Category is required"
  }

  if (!formData.amount || formData.amount <= 0) {
    errors.amount = "Amount must be greater than 0"
  }

  // Admin-specific validation
  if (formData.adminId !== undefined && !formData.adminId) {
    errors.adminId = "Admin is required"
  }

  return errors
}

/**
 * Filter transactions based on filter options
 */
export const filterTransactions = (
  transactions: Transaction[],
  filters: {
    type?: string
    category?: string
    name?: string
    adminId?: string
    start?: Date
    end?: Date
    searchTerm?: string
  }
): Transaction[] => {
  return transactions.filter((transaction) => {
    // Filter by type
    if (filters.type && filters.type !== "all" && transaction.type !== filters.type) {
      return false
    }

    // Filter by category
    if (filters.category && transaction.category !== filters.category) {
      return false
    }

    // Filter by admin name
    if (filters.name && transaction.name !== filters.name) {
      return false
    }

    // Filter by admin ID
    if (filters.adminId && transaction.adminId !== filters.adminId) {
      return false
    }

    // Filter by date range
    if (filters.start && filters.end) {
      const transactionDate = new Date(transaction.date)
      if (transactionDate < filters.start || transactionDate > filters.end) {
        return false
      }
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase()
      const matchesDescription = transaction.description?.toLowerCase().includes(searchTerm) || false
      const matchesCategory = transaction.category.toLowerCase().includes(searchTerm)
      const matchesName = transaction.name?.toLowerCase().includes(searchTerm) || false
      const matchesAdminName = transaction.adminName?.toLowerCase().includes(searchTerm) || false
      
      if (!matchesDescription && !matchesCategory && !matchesName && !matchesAdminName) {
        return false
      }
    }

    return true
  })
}

/**
 * Calculate financial summary from transactions
 */
export const calculateFinancialSummary = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const netBalance = totalIncome - totalExpenses
  const totalBalance = totalIncome + totalExpenses

  const incomeCount = transactions.filter((t) => t.type === "income").length
  const expenseCount = transactions.filter((t) => t.type === "expense").length

  return {
    totalIncome,
    totalExpenses,
    netBalance,
    totalBalance,
    transactionCount: transactions.length,
    incomeCount,
    expenseCount,
  }
}
