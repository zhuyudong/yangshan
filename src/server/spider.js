const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const shell = require('shelljs')
const cheerio = require('cheerio')
const superagent = require('superagent')
const { tagRegs } = require('../common/constants')

const articles = []
const ruanyifeng = 'https://github.com/ruanyf/weekly'
const filename = path.join(__dirname, '../pages/tools/', 'sources.js')

const spider = async () => {
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
    chalk.green(
      `Crawl the ${ruanyifeng} article directory and parse url. ${(diff1[0] *
        1e9 +
        diff1[1]) /
        1000000}ms`
    )
  )
  /* 批量抓取文章并解析 */
  const tools = []
  const time2 = process.hrtime()
  const pros = articles.map(i => superagent.get(i))
  const htmls = await Promise.all(pros)
  const diff2 = process.hrtime(time2)
  console.log(
    chalk.green(
      `Grab each article content in batches. ${(diff2[0] * 1e9 + diff2[1]) /
        1000000}ms`
    )
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
      } else if (/图片|文摘|文章/.test($(el).text())) {
        pictureIndex = i
      }

      if (i > toolIndex && i < pictureIndex) {
        if (
          /\d+&#x3001;/.test($(el).html()) &&
          $(el).find('a') &&
          $(el)
            .find('a')
            .text()
        ) {
          const a = $(el).find('a')
          tools.push({
            title: a.text(),
            href: a.attr('href'),
            referr: 'ruanyifeng',
            type: 'software'
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
          tools[tools.length - 1].description = description.replace(
            /（.*\@.+\s?投稿\）|\(.*\@.+\s?投稿\)/,
            ''
          )
          const tags = tagRegs
            .map(item => {
              if (item.reg.test(description)) {
                return item.tag
              }
            })
            .filter(Boolean)
          tools[tools.length - 1].tags = tags
        }
      }
    })
    const diff = process.hrtime(time)
    console.log(
      chalk.green(`Parse《${title}》. ${(diff[0] * 1e9 + diff[1]) / 1000000}ms`)
    )
  })
  const time = process.hrtime()
  fs.outputFileSync(
    filename,
    `export default ${JSON.stringify(tools, null, 2)}`
  )
  shell.exec(`eslint --fix ${filename}`)
  const diff = process.hrtime(time)
  console.log(
    chalk.green(
      `Update tool JSON configuration file completed. ${(diff[0] * 1e9 +
        diff[1]) /
        1000000}ms`
    )
  )
}

exports.spider = spider
