import createComponent from '@src/utils/createComponent'
import G6 from '@antv/g6'
import { Instance, getTree, explain, containerStyle } from '@src/utils/g6'

export default createComponent({
  id: 'javascript/prototype',
  examples: [
    'object',
    'array',
    'number',
    'string',
    // 'date',
    'math',
    'function',
    'regexp'
    // 'symbol'
  ],
  dependencies: {
    G6,
    explain,
    getTree,
    Instance,
    containerStyle
  }
})
