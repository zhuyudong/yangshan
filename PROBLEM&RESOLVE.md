#### 1

https://www.jianshu.com/p/cddbe0ae8bf0

`export guide from '../resources/images/guide.svg'`
`应为声明或语句 ts(1128)` 或 `TS1128: Declaration or statement expected.`
解决方案：`export { default as guide } from '../resources/images/guide.svg'`

#### 2

`React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.`
解决方案：

1. yarn add -D `@hot-loader/react-dom`
2. webpack.config.js entry 中加入 `hot: __PRO__ ? void 0 : 'react-hot-loader/patch'`
3. webpack.config.js alias 中加入 `'react-dom': '@hot-loader/react-dom'`

#### 3

`Critical dependency: require function is used in a way in which dependencies cannot be statically extracted`
解决方案：

1. webpack.config.js module 中加入 `unknownContextCritical: false,`
2. src/pages/routers 的 Route getComponent

```js
getComponents={(location, callback) => {
  import(`./components/${route}/index.js`).then(
    ({ default: getComponent }) => {
      const component = getComponent(locale)
      callback && callback(null, component)
      onEntered && onEntered()
    }
  )
}}
```

#### 4

待解决：让 eslint 支持 `<></>` 而非必须要用 `<Fragment></Fragment>`
