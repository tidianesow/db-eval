import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function formatScore(score: number, maxScore = 20): string {
  return `${score}/${maxScore}`
}

export function getScoreColor(score: number, maxScore = 20): string {
  const percentage = (score / maxScore) * 100
  if (percentage >= 80) return "text-green-600 dark:text-green-500"
  if (percentage >= 60) return "text-amber-600 dark:text-amber-500"
  return "text-red-600 dark:text-red-500"
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

