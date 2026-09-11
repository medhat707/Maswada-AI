/**
 * Utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function translationDirection(text: string): "ltr" | "rtl" {

  if(!text) return "ltr";

  const arabicTextDirection = /[\u0600-\u06FF]/

  return arabicTextDirection.test(text)? "rtl" : "ltr" 


}

export const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:3001';
