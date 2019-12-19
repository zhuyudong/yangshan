import createComponent from '@src/utils/createComponent'
import G6 from '@antv/g6'
import { Instance, getTree, explain, containerStyle } from '@src/utils/g6'

export default createComponent({
  id: 'javascript/prototype',
  examples: [
    'date',
    'math',
    'array',
    'string',
    'object',
    'number',
    'regexp',
    'symbol',
    'function'
  ],
  dependencies: {
    G6,
    explain,
    getTree,
    Instance,
    containerStyle
  }
})
