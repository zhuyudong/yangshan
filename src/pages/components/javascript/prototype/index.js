import createComponent from '@src/utils/createComponent'
import G6 from '@antv/g6'

const explain = {
  'writable-true': '可改变',
  'writable-false': '不可改变',
  'enumerable"-true': '可枚举',
  'enumerable-false': '不可枚举',
  'configurable-true': '可删除',
  'configurable-false': '不可删除'
}

export default createComponent({
  id: 'javascript/prototype',
  examples: ['object'],
  dependencies: {
    G6,
    explain
  }
})
