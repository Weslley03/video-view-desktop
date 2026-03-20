import { app, BrowserWindow } from 'electron'
import path from 'path'
import { videoDialog } from './ipc/videoDialog.js'
import { registerConvertHandlers } from './ipc/videoConvert.js'
import { uiTheme } from './ipc/uiTheme.js'
import { fileURLToPath } from 'url'
import { fileStats } from './ipc/file.js'

let win: BrowserWindow | null = null

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const devEnvironment = Number(process.env.DEV || 0)

function createWindow() {
  win = new BrowserWindow({
    width: 1500,
    height: 760,
    resizable: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      webSecurity: !devEnvironment,
    }
  })


  if (devEnvironment) {
    win.webContents.openDevTools()
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  uiTheme()
  videoDialog()
  registerConvertHandlers()
  fileStats()
  createWindow()
})
