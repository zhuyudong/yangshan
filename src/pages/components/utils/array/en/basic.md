### 默认

<!--start-code-->

```js
const helloSource = `
  console.log('Hello, world!')
  function foo(){return 10}
  foo()
`
const CodeSandbox = () => {
  return <Embed source={helloSource} />
}
ReactDOM.render(<CodeSandbox />)
```

<!--end-code-->
