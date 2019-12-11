const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const rimraf = require('rimraf')
const schedule = require('node-schedule')
const { crawler } = require('./crawler')

const filename = path.join(__dirname, '../pages/tools/', 'sources.js')

;(async () => {
  await crawler()
  if (!fs.existsSync(filename)) {
    console.log(chalk.red('Create file failed'))
  }
})()
if (!fs.existsSync(filename)) {
  // console.log(chalk.yellow(`"${filename}" does not exist`))
  // console.log(chalk.red('Create file failed'))
  // ;(async () => {
  //   await crawler()
  //   if (!fs.existsSync(filename)) {
  //     console.log(chalk.red('Create file failed'))
  //     process.exit(1)
  //   }
  // })()
} else {
  /*
   * 每月 1 号执行一次定时任务
   */
  schedule.scheduleJob('*/1 * *', () => {
    try {
      console.log(chalk.red(`Delete "${filename}"`))
      rimraf(filename, async () => {
        await crawler()
      })
    } catch (err) {
      console.error(err)
    }
  })
}
