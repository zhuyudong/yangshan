## Babel

`.babelrc`

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]
  ]
}
```