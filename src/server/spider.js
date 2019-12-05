const path = require('path')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const superagent = require('superagent')
const schedule = require('node-schedule')
const { ToolTagRegs } = require('../common/constants/tags')

const articles = []
const ruanyifeng = 'https://github.com/ruanyf/weekly'
const filename = path.join(__dirname, '../pages/tools/', 'sources.js')

/*
 * 每月 1 号执行一次定时任务
 */
schedule.scheduleJob('1 * *', async () => {
  try {
    /* 抓取文章目录及链接 */
    const time1 = process.hrtime()
    const mds = await superagent.get(ruanyifeng)
    const $ = cheerio.load(mds.text)
    $('p').each((i, p) => {
      $(p)
        .find('a')
        .each((j, a) => {
          const href = $(a).attr().href
          if (/\/ruanyf\/weekly\/blob/.test(href)) {
            articles.push(`https://github.com${href}`)
          }
        })
    })
    const diff1 = process.hrtime(time1)
    console.log(
      `抓取 ${ruanyifeng} 文章目录并解析 URL ${(diff1[0] * 1e9 + diff1[1]) /
        1000000}ms`
    )
    /* 批量抓取文章并解析 */
    const tools = []
    const time2 = process.hrtime()
    const pros = articles.map(i => superagent.get(i))
    const htmls = await Promise.all(pros)
    const diff2 = process.hrtime(time2)
    console.log(
      `批量抓取各文章内容，总耗时：${(diff2[0] * 1e9 + diff2[1]) / 1000000}ms`
    )
    htmls.forEach((html, ix) => {
      const time = process.hrtime()
      const $ = cheerio.load(html.text)
      let title
      $('h1').each((i, h1) => {
        if (i === 1) {
          title = $(h1).text()
        }
      })
      let toolIndex = Number.MAX_SAFE_INTEGER
      let pictureIndex = Number.MAX_SAFE_INTEGER
      $('.markdown-body.entry-content.p-3.p-md-6>').each((i, el) => {
        if (!title && i === 0) {
          title = $(el)
            .text()
            .split('# ')[1]
        }
        if (/工具|软件/.test($(el).text())) {
          toolIndex = i
        } else if (/图片|文摘/.test($(el).text())) {
          pictureIndex = i
        }

        if (i > toolIndex && i < pictureIndex) {
          if (/\d+&#x3001;/.test($(el).html()) && $(el).find('a')) {
            const a = $(el).find('a')
            tools.push({
              title: a.text(),
              href: a.attr('href'),
              referrer: articles[ix]
            })
          } else if (
            tools.length &&
            $(el)
              .find('img')
              .attr()
          ) {
            tools[tools.length - 1].image = $(el)
              .find('img')
              .attr().src
          } else if (tools.length) {
            const description = $(el).text()
            tools[tools.length - 1].description = description
            const tags = ToolTagRegs.map(item => {
              if (item.reg.test(description)) {
                return item.tag
              }
            }).filter(Boolean)
            tools[tools.length - 1].tags = tags
          }
        }
      })
      const diff = process.hrtime(time)
      console.log(
        `解析：《${title}》，${articles[ix]} ${(diff[0] * 1e9 + diff[1]) /
          1000000}ms`
      )
    })
    const time = process.hrtime()
    fs.outputFileSync(
      filename,
      `export default ${JSON.stringify(tools, null, 2)
        .replace(/"title"/g, 'title')
        .replace(/"image"/g, 'image')
        .replace(/"href"/g, 'href')
        .replace(/"description"/g, 'description')
        .replace(/"referrer"/g, 'referrer')}
        // .replace(/'/, '\'')
        // .replace(/"/g, '\'')}`
    )
    const diff = process.hrtime(time)
    console.log(
      `更新工具 JSON 配置文件完成 ${(diff[0] * 1e9 + diff[1]) / 1000000}ms`
    )
  } catch (err) {
    console.error(err)
  }
})
