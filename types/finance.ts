export interface Transaction {
  id: string
  date: Date
  day: string
  type: "income" | "expense"
  category: string
  amount: number
  quantity?: number
  description?: string
  name?: string // Name of the admin who created the transaction
  adminId?: string // ID of the admin who created the transaction (for admin dashboard)
  adminName?: string // Name of the admin who created the transaction (for admin dashboard)
  createdAt: Date
  updatedAt: Date
}

// Update the FinancialSummary interface to include percentage changes
export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netBalance: number
  totalBalance: number
  transactionCount: number
  incomeCount: number
  expenseCount: number
  incomeChangePercent?: number
  expensesChangePercent?: number
  balanceChangePercent?: number
  netBalanceChangePercent?: number
}

export interface FilterOptions {
  year?: number
  month?: number
  day?: number
  type?: "income" | "expense" | "all"
  category?: string
  name?: string // Filter by admin name
  adminId?: string // Filter by admin ID (for admin dashboard)
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface CategoryOption {
  value: string
  label: string
  type: "income" | "expense" | "both"
}

export const INCOME_CATEGORIES: CategoryOption[] = [
  { value: "stripe", label: "Stripe", type: "income" },
  { value: "sumup", label: "SumUp", type: "income" },
  { value: "randstad", label: "Randstad", type: "income" },
  { value: "uber", label: "Uber", type: "income" },
]

export const EXPENSE_CATEGORIES: CategoryOption[] = [
  { value: "arag-versicherung", label: "Arag Versicherung", type: "expense" },
  { value: "vav-versicherung", label: "VAV Versicherung", type: "expense" },
  { value: "kaskoversicherung", label: "Kaskoversicherung", type: "expense" },
  { value: "mercedes-bank", label: "Mercedes Bank", type: "expense" },
  { value: "easy-bank", label: "Easy Bank", type: "expense" },
  { value: "svs-versicherung", label: "SVS Versicherung", type: "expense" },
  { value: "finanzamt", label: "Finanzamt", type: "expense" },
  { value: "drei", label: "Drei", type: "expense" },
  { value: "pay-asjid", label: "Pay Asjid", type: "expense" },
  { value: "pay-zahid", label: "Pay Zahid", type: "expense" },
  { value: "ogk", label: "ÖGK", type: "expense" },
  { value: "ecovis", label: "Ecovis", type: "expense" },
  { value: "konto", label: "Konto", type: "expense" },
  { value: "google-ads", label: "Google Ads", type: "expense" },
  { value: "asfinag", label: "Asfinag", type: "expense" },
  { value: "web-hosting", label: "Web Hosting", type: "expense" },
]

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]

// Admin users for the system
export const ADMIN_USERS = [
  { value: "asjid-farooq", label: "Asjid Farooq" },
  { value: "zahid-chaudhary", label: "Zahid Chaudhary" },
]
