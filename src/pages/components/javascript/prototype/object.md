# 对象

##### 展示 `Object` 及其原型链上的属性和方法

<!--start-code-->

```js
const style = { width: '100%', border: '1px solid orange' }
const getTree = obj => {
  return Object.entries(Object.getOwnPropertyDescriptors(obj)).map(
    ([name, properties]) => {
      return name === 'prototype'
        ? getTree(obj.prototype)
        : {
            id: name,
            children: Object.entries(properties).map(([n, p]) => ({
              id: explain[`${n}-${p}`]
                ? explain[`${n}-${p}`]
                : typeof p === 'function'
                ? `${n}()`
                : n,
              children: []
            }))
          }
    }
  )
}
const Instance = () => {
  React.useEffect(() => {
    const data = {
      id: 'Object',
      children: getTree(Object)
    }
    const width = document.getElementById('container').scrollWidth
    const height = document.getElementById('container').scrollHeight || 500
    const graph = new G6.TreeGraph({
      container: 'container',
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

  return <div id="container" style={style}></div>
}
ReactDOM.render(<Instance />)
```

<!--end-code-->
