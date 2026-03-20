export type ThemeColors = {
  primary100: string
  primary200: string
  primary300: string
  primary400: string

  secondary100: string
  secondary200: string
  secondary300: string
  secondary400: string

  background: string
  surface: string
  text: string
}

export type Theme = {
  name: string
  colors: ThemeColors
}
