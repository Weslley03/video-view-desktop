import { reactive } from 'vue'

export type ToastType = 'error' | 'warning' | 'info' | 'success'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

const toasts = reactive<Toast[]>([])
let toastId = 0

export function useToast() {
  function createToast(message: string, type: ToastType = 'info', duration = 3000) {
    const existingIndex = toasts.findIndex(t => t.type === type)
    if (existingIndex !== -1) return

    const id = toastId++
    toasts.push({ id, message, type })
    setTimeout(() => removeToast(id), duration)
  }

  function removeToast(id: number) {
    const index = toasts.findIndex(t => t.id === id)
    if (index !== -1) toasts.splice(index, 1)
  }

  function toastColor(type: ToastType) {
    switch (type) {
      case 'success': return 'green'
      case 'error': return 'red'
      case 'warning': return 'yellow'
      case 'info': return 'blue'
      default: return 'gray'
    }
  }

  return { toasts, createToast, removeToast, toastColor }
}