## ESLint

### [规则](https://cn.eslint.org/docs/rules/)

```js
const columns = [
  {
    title: '序号',
    dataIndex: '$index',
    key: '$index'
  },
  {
    title: '推荐',
    dataIndex: 'recommended',
    key: 'recommended'
  },
  {
    title: '可自动修复',
    dataIndex: 'fix',
    key: 'fix'
  },
  {
    title: '规则',
    dataIndex: 'rule',
    key: 'rule'
  },
  {
    title: '解释',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true
  }
]
const ESLintRules = () => {
  const [data, changeDate] = React.useState([])

  React.useEffect(() => {
    superagent.get('https://cn.eslint.org/docs/rules/').end((err, result) => {
      if (err) {
        return
      }
      const $ = cheerio.load(result.text)
      const results = $('tr.rule-zh')
        .map(i =>
          Array.from(i.childNodes)
            .filter(i => i.nodeName === 'TD')
            .map(i => {
              if (i.children && i.children[0] && i.children[0].childNodes) {
                const nodes = i.children[0].childNodes || []
                if (nodes.length === 1 && nodes[0]) {
                  if (nodes[0].nodeValue) {
                    return nodes[0].nodeValue
                  } else if (
                    nodes[0].childNodes &&
                    nodes[0].childNodes[0] &&
                    nodes[0].childNodes[0].nodeValue
                  ) {
                    return nodes[0].childNodes[0].nodeValue
                  }
                } else if (i.children[0].innerHTML) {
                  return i.children[0].innerHTML
                    .replace(/<code class="highlighter-rouge">/g, '')
                    .replace(/<\/code>/g, '')
                }
                return nodes
              }
            })
        )
        .map((i, ix) => ({
          $index: ix,
          recommended: !!i[0],
          fix: !!i[1],
          rule: i[2],
          description: i[3]
        }))
      changeDate(results)
    })
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="$index"
      size="small"
    />
  )
}
ReactDOM.render(<ESLintRules />)
```
