import { ipcMain, dialog } from 'electron'

export function videoDialog() {
  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Videos', extensions: ['mp4', 'webm', 'mov', 'mkv'] }]
    })

    if (canceled) return null
    return filePaths[0]
  })
}