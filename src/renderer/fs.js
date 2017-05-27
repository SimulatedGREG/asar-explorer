import fs from 'fs-extra'
import { join } from 'path'

export function getContents (path) {
  return fs.existsSync(path)
    ? fs.readdirSync(path)
    : new Error('File not found or inaccessable')
}
