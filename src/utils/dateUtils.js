// src/utils/dateUtils.js
// Semua fungsi helper yang berhubungan dengan tanggal dan format angka
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

// "2025-09-01" → "01 Sep"
export const formatShortDate = (dateString) => {
  return format(parseISO(dateString), 'dd MMM', { locale: id })
}

// "2025-09-01" → "September 2025"
export const formatMonthYear = (dateString) => {
  return format(parseISO(dateString), 'MMMM yyyy', { locale: id })
}

// "2025-09-01" → "01 Sep 2025"
export const formatFullDate = (dateString) => {
  return format(parseISO(dateString), 'dd MMM yyyy', { locale: id })
}

// 18000000 → "Rp 18,0M"
export const formatCurrency = (amount) => {
  if (amount >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000)     return `Rp ${(amount / 1_000_000).toFixed(1)}M`
  return `Rp ${amount.toLocaleString('id-ID')}`
}