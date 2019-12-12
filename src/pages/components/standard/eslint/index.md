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

`.eslintrc.js`

```js
/*run-disable*/
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'eslint-config-airbnb',
    'plugin:@typescript-eslint/recommended',
    // 关闭可能与 prettier 有冲突的规则
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/ban-ts-ignore': 0
  },
  // 解决不能直接默认导入 ts 文件 的问题。import/no-unresolved
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.config.js'
      }
    }
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0
      }
    },
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        'react/prop-types': 0
      }
    }
  ]
}
```
