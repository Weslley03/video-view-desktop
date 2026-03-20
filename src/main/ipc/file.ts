import { ipcMain } from "electron"
import { FileStats } from '../../shared/FileStats.js'
import fs from 'fs'

export function fileStats() {
  ipcMain.handle('file:stats', (_, path: string): FileStats => {
    return fs.statSync(path)
  })
}