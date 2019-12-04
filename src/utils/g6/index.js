import G6 from '@antv/g6'
import React from 'react'
import { capitalize } from 'lodash/string'

export const explain = {
  'writable-true': '可改变',
  'writable-false': '不可改变',
  'enumerable"-true': '可枚举',
  'enumerable-false': '不可枚举',
  'configurable-true': '可删除',
  'configurable-false': '不可删除'
}

export const containerStyle = { width: '100%', border: '1px solid orange' }
const constructors = [
  '',
  'name',
  'length',
  'constructor',
  'toString',
  'valueOf',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__proto__',
  '__lookupSetter__',
  'get',
  'set'
  // 'writable',
  // 'enumerable',
  // 'configurable'
]
export const getTree = obj => {
  const results = []
  Object.getOwnPropertyNames(obj).map(name => {
    if (
      ['prototype', '__proto__'].includes(name) &&
      typeof obj[name] === 'object'
    ) {
      if (obj[name] === null) {
        results.push({
          id: name
        })
      } else {
        const item = {
          id: [name],
          children: getTree(obj[name])
        }
        if (
          (typeof obj.__proto__ === 'object' && obj.__proto__ !== null) ||
          (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj) !== null)
        ) {
          if ((obj.__proto__ !== null || Object.getPrototypeOf(obj)) === null) {
            item.children.push({
              id: '__proto__',
              children: [{ id: 'null' }]
            })
          } else {
            item.children.push({
              id: '__proto__',
              children: getTree(obj.__proto__ || Object.getPrototypeOf(obj))
            })
          }
        }
        results.push(item)
      }
    } else {
      results.push({ id: name, children: [] })
    }
  })
  return results
}

const obj = {
  math: Math,
  date: Date,
  array: Array,
  object: Object,
  regexp: RegExp,
  number: Number,
  string: String,
  symbol: Symbol,
  function: Function
}
export const Instance = ({ container }) => {
  React.useEffect(() => {
    const data = {
      id: capitalize(container),
      children: getTree(obj[container])
    }
    const width = document.getElementById(container).scrollWidth
    const height = document.getElementById(container).scrollHeight || 500
    const graph = new G6.TreeGraph({
      container,
      width,
      height,
      pixelRatio: 2,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model').data
              data.collapsed = collapsed
              return true
            }
          },
          'drag-canvas',
          'zoom-canvas'
        ]
      },
      defaultNode: {
        size: 14,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5]
        ],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9'
        }
      },
      defaultEdge: {
        shape: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => {
          return 12
        },
        getWidth: () => {
          return 12
        },
        getVGap: () => {
          return 2
        },
        getHGap: () => {
          return 50
        }
      }
    })

    let centerX = 0
    graph.node(function(node) {
      if (node.id === 'Modeling Methods') {
        centerX = node.x
      }

      return {
        label: node.id,
        labelCfg: {
          position:
            node.children && node.children.length > 0
              ? 'left'
              : node.x > centerX
                ? 'right'
                : 'left',
          offset: 5
        }
      }
    })

    graph.data(data)
    graph.render()
    graph.fitView()
  }, [])

  return <div id={container} style={containerStyle}></div>
}

export default Instance
