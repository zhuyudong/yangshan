## postcss

`postcss.config.js`

```js
/*run-disable*/
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
  plugins: [autoprefixer, cssnano]
}
```

### packages
- [`postcss`](https://github.com/postcss/postcss/blob/master/README-cn.md) Transforming styles with JS plugins [https://postcss.org/](https://postcss.org/)
- [`autoprefixer`](https://github.com/postcss/autoprefixer) Parse CSS and add vendor prefixers to rules by [Can I Use](https://twitter.com/autoprefixer)
- [`cssnano`](https://cssnano.co/) Plug in cssnano into your build step for modern CSS compression.