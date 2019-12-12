## webpack

`webpack.config.js`

```js
/* run-disable */
module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.txs', '.ts', '.js']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}
```