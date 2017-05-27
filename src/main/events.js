import { ipcMain } from 'electron'
import { join } from 'path'

ipcMain.on('ondragstart', (e, path) => {
  e.sender.startDrag({
    file: path,
    icon: join(__static, '/drag.png')
  })

  /* How do I know when the system is done copying the file? */
})
