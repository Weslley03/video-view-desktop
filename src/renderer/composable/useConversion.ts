import { ref, provide, inject } from 'vue'

export interface ConversionState {
  progress: number
  elapsed: number
  duration: number
}

const ConversionSymbol = Symbol('Conversion')

export function provideConversion() {
  const progress = ref(0)
  const elapsed = ref(0)
  const duration = ref(0)

  const state = {
    progress,
    elapsed,
    duration
  }

  provide(ConversionSymbol, state)

  return state
}

export function useConversion() {
  const state = inject<ReturnType<typeof provideConversion>>(ConversionSymbol)

  if (!state) {
    throw new Error('useConversion must be used inside provider')
  }

  return state
}