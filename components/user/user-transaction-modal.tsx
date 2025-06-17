"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Euro, Plus, AlertCircle, CheckCircle2, Edit } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/types/finance"
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "@/types/finance"

interface TransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => void
  transaction?: Transaction | null
  mode: "create" | "edit"
}

interface FormData {
  date: Date
  day: string
  type: "income" | "expense"
  category: string
  customCategory: string
  amount: number
  quantity: number
  description: string
}

interface FormErrors {
  date?: string
  type?: string
  category?: string
  amount?: string
}

const getDayFromDate = (date: Date): string => {
  return format(date, "EEEE")
}

export function UserTransactionModal({ open, onOpenChange, onSubmit, transaction, mode }: TransactionModalProps): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    date: new Date(),
    day: getDayFromDate(new Date()),
    type: "income",
    category: "",
    customCategory: "",
    amount: 0,
    quantity: 1,
    description: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [useCustomCategory, setUseCustomCategory] = useState(false)

  // Populate form when editing
  useEffect(() => {
    if (transaction && mode === "edit") {
      setFormData({
        date: transaction.date,
        day: transaction.day,
        type: transaction.type,
        category: transaction.category,
        customCategory: "",
        amount: transaction.amount,
        quantity: transaction.quantity || 1,
        description: transaction.description || "",
      })

      // Check if category is custom (not in predefined lists)
      const allPredefinedCategories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].map((cat) => cat.value)
      if (!allPredefinedCategories.includes(transaction.category)) {
        setUseCustomCategory(true)
        setFormData((prev) => ({ ...prev, customCategory: transaction.category, category: "custom" }))
      }
    }
  }, [transaction, mode])

  // Auto-update day when date changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, day: getDayFromDate(prev.date) }))
  }, [formData.date])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.type) {
      newErrors.type = "Transaction type is required"
    }

    if (!formData.category || (formData.category === "custom" && !formData.customCategory.trim())) {
      newErrors.category = "Category is required"
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0"
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
      const finalCategory = formData.category === "custom" ? formData.customCategory.trim() : formData.category

      const transactionData = {
        date: formData.date,
        day: formData.day,
        type: formData.type,
        category: finalCategory,
        amount: formData.amount,
        quantity: formData.quantity,
        description: formData.description,
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onOpenChange(false)
        resetForm()
      }, 1500)

      onSubmit(transactionData)
    } catch (error) {
      console.error("Error submitting transaction:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      date: new Date(),
      day: getDayFromDate(new Date()),
      type: "income",
      category: "",
      customCategory: "",
      amount: 0,
      quantity: 1,
      description: "",
    })
    setErrors({})
    setUseCustomCategory(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    resetForm()
  }

  const currentCategories = formData.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-0 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                {mode === "edit" ? (
                  <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {mode === "edit" ? "Edit Transaction" : "Add New Transaction"}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  {mode === "edit" ? "Update transaction details" : "Create a new financial transaction record"}
                </DialogDescription>
              </div>
            </div>
            {/* Removed duplicate close button, keeping only the X in DialogContent */}
          </div>
        </DialogHeader>

        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Transaction {mode === "edit" ? "Updated" : "Created"}!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your transaction has been successfully {mode === "edit" ? "updated" : "recorded"}.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date & Day */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-700 dark:text-gray-300 font-medium">
                  Date *
                </Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start pl-10 text-left font-normal bg-white/50 dark:bg-gray-800/50",
                          !formData.date && "text-muted-foreground",
                          errors.date && "border-red-500",
                        )}
                      >
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
                </div>
                {errors.date && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.date}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="day" className="text-gray-700 dark:text-gray-300 font-medium">
                  Day
                </Label>
                <Input
                  id="day"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="bg-white/50 dark:bg-gray-800/50"
                  placeholder="e.g., Monday"
                />
              </div>
            </div>

            {/* Type & Category */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-gray-700 dark:text-gray-300 font-medium">
                  Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "income" | "expense") => {
                    setFormData({ ...formData, type: value, category: "", customCategory: "" })
                    setUseCustomCategory(false)
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
                <Label htmlFor="category" className="text-gray-700 dark:text-gray-300 font-medium">
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData({ ...formData, category: value })
                    setUseCustomCategory(value === "custom")
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
                    <Separator />
                    <SelectItem value="custom">
                      <div className="flex items-center space-x-2">
                        <Plus className="h-3 w-3" />
                        <span>Custom Category</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.category}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Category Input */}
            {useCustomCategory && (
              <div className="space-y-2">
                <Label htmlFor="customCategory" className="text-gray-700 dark:text-gray-300 font-medium">
                  Custom Category *
                </Label>
                <Input
                  id="customCategory"
                  placeholder="Enter custom category name"
                  value={formData.customCategory}
                  onChange={(e) => {
                    setFormData({ ...formData, customCategory: e.target.value })
                    setErrors({ ...errors, category: undefined })
                  }}
                  className="bg-white/50 dark:bg-gray-800/50"
                />
              </div>
            )}

            {/* Amount & Quantity */}
            <div className="grid gap-4 md:grid-cols-2">
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

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-gray-700 dark:text-gray-300 font-medium">
                  Quantity
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Optional
                  </Badge>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={formData.quantity || ""}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value) || 1
                    setFormData({ ...formData, quantity: value })
                  }}
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
              <Input
                id="description"
                placeholder="Additional notes or description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/50 dark:bg-gray-800/50"
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
                    <span>{mode === "edit" ? "Updating..." : "Creating..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {mode === "edit" ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span>{mode === "edit" ? "Update Transaction" : "Create Transaction"}</span>
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

// Export with alias for backward compatibility
export { UserTransactionModal as TransactionModal }
