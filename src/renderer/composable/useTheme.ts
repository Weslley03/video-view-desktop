import { applyTheme } from "../theme/theme"
import { ThemeKey, themes } from "../theme/themes"
import { themeState } from "../theme/themeStore"

export function useTheme() {
  const setTheme = (key: ThemeKey) => {
    const theme = themes[key]
    applyTheme(theme)
    window.electronAPI.setTheme(key)
  }

  return {
    theme: themeState,
    setTheme
  }
}