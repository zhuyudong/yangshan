# 原型与原型链

#### 引入依赖

```js
/* $$ignore */
// utils/g6/index.js
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
export const getTree = (container, obj) => {
  return Object.entries(Object.getOwnPropertyDescriptors(obj)).map(
    ([name, properties]) => {
      return {
        id: name,
        children: Object.entries(properties).map(([n, p]) => {
          return {
            id: explain[`${n}-${p}`]
              ? explain[`${n}-${p}`]
              : typeof p === 'function'
              ? `${n}()`
              : n,
            children:
              name === 'prototype' &&
              container !== 'symbol' &&
              typeof obj['prototype'] === 'object'
                ? getTree(container, obj['prototype'])
                : []
          }
        })
      }
    }
  )
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
      children: getTree(container, obj[container])
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
        size: 16,
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
          return 8
        },
        getWidth: () => {
          return 16
        },
        getVGap: () => {
          return 10
        },
        getHGap: () => {
          return 250
        },
        getSide: () => {
          return 'right'
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
              ? 'right'
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
```

<!--{demo}-->
