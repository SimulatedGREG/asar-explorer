import fs from 'fs-extra'
import { remote } from 'electron'
import { join } from 'path'

/**
 * Get Array for path contents. Checks if path exists
 * @param  {String} path
 * @return {Promise}
 */
export function readdir (path) {
  return pathExists(path)
    ? fs.readdir(path)
    : Promise.reject(new Error('Path does not exist'))
}

/**
 * Alias of fs.existsSync
 * @param  {String} path
 * @return {Boolean}
 */
export function pathExists (path) {
  return fs.existsSync(path)
}

/**
 * Get path stat
 * @param  {String} path
 * @return {Promise}
 */
export function stat (path) {
  return fs.stat(path)
}

/**
 * Extract item from asar archive
 * @param  {String} path
 * @param  {String} name
 * @return {Promise}
 */
export function extractFile (path, name) {
  return new Promise(async (resolve, reject) => {
    let tmpPath = join(remote.app.getPath('temp'), name)

    try {
      await fs.copySync(path, tmpPath)
      resolve(tmpPath)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Remove file or folder from file system
 * @param  {String} path
 * @return {Promise}
 */
export function removeItem (path) {
  return fs.removeSync(path)
}

/**
 * Take in file path and return contents with stat
 * @param  {String} path
 * @return {Array}
 */
export function getContents (path) {
  return new Promise((resolve, reject) => {
    const contents = []

    readdir(path).then(files => {
      let statsPromises = []

      files.forEach(file => {
        statsPromises.push(stat(join(path, file)))
      })

      Promise.all(statsPromises).then(stats => {
        stats.forEach((stat, i) => {
          contents.push({
            name: files[i],
            path: join(path, files[i]),
            stat
          })
        })

        resolve(contents)
      })
    })
  })
}
