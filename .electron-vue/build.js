'use strict'

process.env.NODE_ENV = 'production'

const { say } = require('cfonts')
const chalk = require('chalk')
const del = require('del')
const { spawn } = require('child_process')
const webpack = require('webpack')
const Multispinner = require('multispinner')


const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')
const webConfig = require('./webpack.web.config')

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '

if (process.env.BUILD_TARGET === 'clean') clean()
else if (process.env.BUILD_TARGET === 'web') web()
else build()

function clean () {
  del.sync(['build/*', '!build/icons', '!build/icons/icon.*'])
  console.log(`\n${doneLog}${chalk.yellow('`build`')} directory cleaned\n`)
  process.exit()
}

function build () {
  say('lets-build', {
    font: 'simple3d',
    colors: ['yellow'],
    space: false
  })
  console.log()

  del.sync(['dist/electron/*', '!.gitkeep'])

  const tasks = ['main', 'renderer']
  const m = new Multispinner(tasks, {
    preText: 'building',
    postText: 'process'
  })

  let results = ''

  m.on('success', () => {
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log(`\n\n${results}`)
    console.log(`${okayLog}take it away ${chalk.yellow('`electron-builder`')}\n`)
    process.exit()
  })

  pack(mainConfig).then(result => {
    results += result + '\n\n'
    m.success('main')
  }).catch(() => {
    m.error('main')
  })

  pack(rendererConfig).then(result => {
    results += result + '\n\n'
    m.success('renderer')
  }).catch(() => {
    m.error('renderer')
  })
}

function pack (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) reject(stats.toJson().errors)
      else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}

function web () {
  del.sync(['dist/web/*', '!.gitkeep'])
  webpack(webConfig, (err, stats) => {
    if (err || stats.hasErrors()) console.log(err)
    else console.log(`${doneLog}web build complete (dist/web/)\n`)

    console.log(stats.toString({
      chunks: false,
      colors: true
    }))

    process.exit()
  })
}
