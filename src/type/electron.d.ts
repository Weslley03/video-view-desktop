import { ThemeKey } from "../renderer/theme/themes"
import type { ConversionOptionsType } from "../shared/ConversionOptionsType"
import { ConvertProgress } from "../shared/ConvertProgress"
import { FileStats } from "../shared/FileStats"

export interface ElectronAPI {
  openFile: () => Promise<string | null>
  fileUrl: (filePath: string) => string
  startConversion: (opts: ConversionOptionsType) => Promise<boolean>
  cancelConversion: () => Promise<boolean>,
  onProgress: (cb: (data: ConvertProgress) => void) => void
  fileStats: (path: string) => Promise<FileStats>
  getTheme: () => Promise<ThemeKey>
  setTheme: (theme: ThemeKey) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export { }