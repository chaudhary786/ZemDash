"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Euro, Plus, X, AlertCircle, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: TransactionFormData) => void
}

interface TransactionFormData {
  date: Date
  type: "income" | "expense" | "transfer"
  category: string
  amount: number
  description?: string
  adminName?: string
  reference?: string
}

interface FormErrors {
  date?: string
  type?: string
  category?: string
  amount?: string
  adminName?: string
}

const transactionCategories = {
  income: [
    { value: "salary", label: "Salary & Wages" },
    { value: "freelance", label: "Freelance Income" },
    { value: "investment", label: "Investment Returns" },
    { value: "business", label: "Business Revenue" },
    { value: "other-income", label: "Other Income" },
  ],
  expense: [
    { value: "office", label: "Office Expenses" },
    { value: "marketing", label: "Marketing & Advertising" },
    { value: "software", label: "Software & Subscriptions" },
    { value: "travel", label: "Travel & Transportation" },
    { value: "utilities", label: "Utilities & Bills" },
    { value: "other-expense", label: "Other Expenses" },
  ],
  transfer: [
    { value: "internal", label: "Internal Transfer" },
    { value: "external", label: "External Transfer" },
    { value: "bank", label: "Bank Transfer" },
    { value: "wallet", label: "Wallet Transfer" },
  ],
}

const adminUsers = [
  { value: "asjid-farooq", label: "Asjid Farooq" },
  { value: "john-doe", label: "John Doe" },
  { value: "jane-smith", label: "Jane Smith" },
  { value: "mike-johnson", label: "Mike Johnson" },
]

export function TransactionModal({ open, onOpenChange, onSubmit }: TransactionModalProps) {
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date(),
    type: "income",
    category: "",
    amount: 0,
    description: "",
    adminName: "",
    reference: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.type) {
      newErrors.type = "Transaction type is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    }

    if (!formData.adminName) {
      newErrors.adminName = "Admin name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onOpenChange(false)
        resetForm()
      }, 1500)

      onSubmit?.(formData)
    } catch (error) {
      console.error("Error submitting transaction:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      date: new Date(),
      type: "income",
      category: "",
      amount: 0,
      description: "",
      adminName: "",
      reference: "",
    })
    setErrors({})
  }

  const handleClose = () => {
    onOpenChange(false)
    resetForm()
  }

  const currentCategories = transactionCategories[formData.type] || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-0 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Add New Transaction
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  Create a new financial transaction record
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Created!</h3>
              <p className="text-gray-600 dark:text-gray-300">Your transaction has been successfully recorded.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type & Date */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-gray-700 dark:text-gray-300 font-medium">
                  Transaction Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "income" | "expense" | "transfer") => {
                    setFormData({ ...formData, type: value, category: "" })
                    setErrors({ ...errors, type: undefined, category: undefined })
                  }}
                >
                  <SelectTrigger className={cn("bg-white/50 dark:bg-gray-800/50", errors.type && "border-red-500")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Income</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="expense">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Expense</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="transfer">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Transfer</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.type}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-700 dark:text-gray-300 font-medium">
                  Transaction Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white/50 dark:bg-gray-800/50",
                        !formData.date && "text-muted-foreground",
                        errors.date && "border-red-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "dd.MM.yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => {
                        if (date) {
                          setFormData({ ...formData, date })
                          setErrors({ ...errors, date: undefined })
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.date}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Category & Amount */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700 dark:text-gray-300 font-medium">
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData({ ...formData, category: value })
                    setErrors({ ...errors, category: undefined })
                  }}
                >
                  <SelectTrigger className={cn("bg-white/50 dark:bg-gray-800/50", errors.category && "border-red-500")}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.category}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300 font-medium">
                  Amount (€) *
                </Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.amount || ""}
                    onChange={(e) => {
                      const value = Number.parseFloat(e.target.value) || 0
                      setFormData({ ...formData, amount: value })
                      setErrors({ ...errors, amount: undefined })
                    }}
                    className={cn("pl-10 bg-white/50 dark:bg-gray-800/50", errors.amount && "border-red-500")}
                  />
                </div>
                {errors.amount && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.amount}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Admin & Reference */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="admin" className="text-gray-700 dark:text-gray-300 font-medium">
                  Admin User *
                </Label>
                <Select
                  value={formData.adminName}
                  onValueChange={(value) => {
                    setFormData({ ...formData, adminName: value })
                    setErrors({ ...errors, adminName: undefined })
                  }}
                >
                  <SelectTrigger
                    className={cn("bg-white/50 dark:bg-gray-800/50", errors.adminName && "border-red-500")}
                  >
                    <SelectValue placeholder="Select admin user" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminUsers.map((admin) => (
                      <SelectItem key={admin.value} value={admin.value}>
                        {admin.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.adminName && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.adminName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference" className="text-gray-700 dark:text-gray-300 font-medium">
                  Reference Number
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Optional
                  </Badge>
                </Label>
                <Input
                  id="reference"
                  placeholder="TXN-2024-001"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="bg-white/50 dark:bg-gray-800/50"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-300 font-medium">
                Description
                <Badge variant="secondary" className="ml-2 text-xs">
                  Optional
                </Badge>
              </Label>
              <Textarea
                id="description"
                placeholder="Additional notes or description for this transaction..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/50 dark:bg-gray-800/50 min-h-[80px]"
              />
            </div>

            <Separator className="bg-white/20 dark:bg-gray-700/20" />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="bg-white/50 dark:bg-gray-800/50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Create Transaction</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
