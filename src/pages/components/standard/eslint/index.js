import cheerio from 'cheerio'
import superagent from 'superagent'
import createComponent from '@src/utils/createComponent'

export default createComponent({
  id: 'standard/eslint',
  examples: ['eslintignore'],
  dependencies: {
    cheerio,
    superagent
  }
})
