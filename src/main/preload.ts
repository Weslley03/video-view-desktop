import { contextBridge, ipcRenderer } from 'electron'
import { ConversionOptionsType } from '../shared/ConversionOptionsType.js'
import { ThemeKey } from '../renderer/theme/themes.js'
import { FileStats } from '../shared/FileStats.js'
import { ConvertProgress } from '../shared/ConvertProgress.js'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  fileUrl: (filePath: string) => new URL(`file://${filePath}`).href,
  startConversion: (opts: ConversionOptionsType) => ipcRenderer.invoke('convert:start', opts),
  onProgress: (cb: (data: ConvertProgress) => void) => ipcRenderer.on('convert:progress', (_: any, d: ConvertProgress) => cb(d)),
  cancelConversion: () => ipcRenderer.invoke('convert:cancel'),
  fileStats: (path: string): Promise<FileStats> => ipcRenderer.invoke('file:stats', path),

  getTheme: () => ipcRenderer.invoke('theme:get'),
  setTheme: (themeKey: ThemeKey) => ipcRenderer.invoke('theme:set', themeKey)
}) 
