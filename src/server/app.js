const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const rimraf = require('rimraf')
const schedule = require('node-schedule')
const { spider } = require('./spider')

const filename = path.join(__dirname, '../pages/tools/', 'sources.js')

const exists = fs.existsSync(filename)
if (!exists) {
  console.log(chalk.green(`${filename}不存在，新创建一份`))
  ;(async () => {
    await spider()
  })()
} else {
  /*
   * 每月 1 号执行一次定时任务
   */
  schedule.scheduleJob('1 * *', async () => {
    try {
      console.log(chalk.red(`删除${filename}`))
      rimraf(filename)
      await spider()
    } catch (err) {
      console.error(err)
    }
  })
}
