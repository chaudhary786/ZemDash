import { format } from "date-fns"

export const formatDate = (date: Date, formatString = "dd.MM.yyyy"): string => {
  return format(date, formatString)
}

export const formatCurrency = (amount: number, currency = "EUR"): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export const getDayName = (date: Date): string => {
  return format(date, "EEEE")
}

export const getCurrentMonth = (): string => {
  return format(new Date(), "MMMM yyyy")
}
