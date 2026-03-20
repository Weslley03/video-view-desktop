import { Theme } from '../../type/ThemeType'
import { themeState } from './themeStore'

/*
THEME MANAGER
*/

export function applyTheme(theme: Theme) {
  themeState.theme = theme
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
}
