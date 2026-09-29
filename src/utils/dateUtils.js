// src/utils/dateUtils.js
// All helper functions related to dates and number formatting
import { format, parseISO } from 'date-fns'
import { enUS } from 'date-fns/locale'

// "2025-09-01" → "01 Sep"
export const formatShortDate = (dateString) => {
  return format(parseISO(dateString), 'dd MMM', { locale: enUS })
}

// "2025-09-01" → "September 2025"
export const formatMonthYear = (dateString) => {
  return format(parseISO(dateString), 'MMMM yyyy', { locale: enUS })
}

// "2025-09-01" → "01 Sep 2025"
export const formatFullDate = (dateString) => {
  return format(parseISO(dateString), 'dd MMM yyyy', { locale: enUS })
}

// 18000000 → "Rp 18.0M"
export const formatCurrency = (amount) => {
  if (amount >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000)     return `Rp ${(amount / 1_000_000).toFixed(1)}M`
  return `Rp ${amount.toLocaleString('id-ID')}`
}
