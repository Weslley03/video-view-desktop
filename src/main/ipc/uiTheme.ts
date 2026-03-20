import { ipcMain } from "electron"
import { store } from "../store.js"

export function uiTheme() {
  ipcMain.handle('theme:get', () => {
    return store.get('theme')
  })

  ipcMain.handle('theme:set', (_, themeKey) => {
    store.set('theme', themeKey)
  })
}