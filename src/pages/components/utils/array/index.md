# Array

##### chunk

```js
const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}

chunk(['a', 'b', 'c', 'd'], 2)
// => [['a', 'b'], ['c', 'd']]
```

##### compact

```js
;[0, 1, false, 2, '', 3].filter(Boolean)
```

##### concat

```js
const array = [1]
const other = array.concat(2, [3], [[4]])

console.log(other)
// output: [1, 2, 3, [4]]
```

##### difference

```js
const arrays = [
  [1, 2, 3, 4, 5],
  [5, 2, 10]
]
console.log(
  arrays.reduce(function(a, b) {
    return a.filter(function(value) {
      return !b.includes(value)
    })
  })
)
// output: [1, 3, 4]

// ES6
let arrays = [
  [1, 2, 3, 4, 5],
  [5, 2, 10]
]
console.log(arrays.reduce((a, b) => a.filter(c => !b.includes(c))))
// output: [1, 3, 4]
```

##### drop

```js
;[1, 2, 3].slice(1)
// => [2, 3]
;[1, 2, 3].slice(2)
// => [3]
```

##### dropRight

```js
;[1, 2, 3].slice(0, -1)
// => [1, 2]
;[1, 2, 3].slice(0, -2)
// => [1]
```

##### fill

```js
const array = [1, 2, 3]

array.fill('a')

console.log(array)
// output: ['a', 'a', 'a']

Array(3)
  .fill(2)
  [
    // output: [2, 2, 2]

    (4, 6, 8, 10)
  ].fill('*', 1, 3)
// output: [4, '*', '*', 10]
```

##### find

```js
const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true }
]

users.find(function(o) {
  return o.age < 40
})
// output: object for 'barney'
```

##### findIndex

```js
const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true }
]

const index = users.findIndex(function(o) {
  return o.age >= 40
})
console.log(index)
// output: 1
```

##### first

```js
// ;[1, 2, 3, 4, 5][0]
// => 1
//or
// ;[].concat(1, 2, 3, 4, 5).shift()
// => 1
//or
// ;[].concat([1, 2, 3, 4, 5]).shift()
// => 1

// Native (works even with potentially undefined/null, like _.first)
// ;[].concat(undefined).shift()
// => undefined
;[1, 2, 3, 4, 5].slice(0, 2)
// => [1, 2]
```

##### flatten

```js
const flatten = [1, [2, [3, [4]], 5]].reduce((a, b) => a.concat(b), [])
// => [1, 2, [3, [4]], 5]

const flatten = [].concat(...[1, [2, [3, [4]], 5]])
// => [1, 2, [3, [4]], 5]

// Native(ES2019)
const flatten = [1, [2, [3, [4]], 5]].flat()
// => [1, 2, [3, [4]], 5]

const flatten = [1, [2, [3, [4]], 5]].flatMap(number => number)
// => [1, 2, [3, [4]], 5]
```

##### flattenDeep

```js
const flattenDeep = arr =>
  Array.isArray(arr)
    ? arr.reduce((a, b) => a.concat(flattenDeep(b)), [])
    : [arr]

flattenDeep([1, [[2], [3, [4]], 5]])[
  // => [1, 2, 3, 4, 5]

  // Native(ES2019)
  (1, [2, [3, [4]], 5])
].flat(Infinity)
// => [1, 2, 3, 4, 5]

const flattenDeep = arr =>
  arr.flatMap((subArray, index) =>
    Array.isArray(subArray) ? flattenDeep(subArray) : subArray
  )

flattenDeep([1, [[2], [3, [4]], 5]])
// => [1, 2, 3, 4, 5]
```

##### fromPairs

```js
// const fromPairs = function(arr) {
//   return arr.reduce(function(accumulator, value) {
//     accumulator[value[0]] = value[1];
//     return accumulator;
//   }, {})
// }

// Compact form
const fromPairs = arr =>
  arr.reduce((acc, val) => ((acc[val[0]] = val[1]), acc), {})

fromPairs([
  ['a', 1],
  ['b', 2]
])
// => { 'a': 1, 'b': 2 }
```

##### head

```js
const array = [1, 2, 3]
const [head, ...tail] = array
console.log(head)
// output: 1
```

##### tail

```js
const array = [1, 2, 3]
const [head, ...tail] = array
console.log(tail)
// output [2, 3]
```

##### indexOf

```js
const array = [2, 9, 9]
const result = array.indexOf(2)
console.log(result)
// output: 0
```

##### intersection

```js
const arrays = [
  [1, 2, 3],
  [101, 2, 1, 10],
  [2, 1]
]
console.log(arrays.reduce((a, b) => a.filter(c => b.includes(c))))
// output: [1, 2]
```

##### takeRight

```js
// Native
// [1, 2, 3].slice(-1);
// => [3]

// [1, 2, 3].slice(-2);
// => [2, 3]

// [1, 2, 3].slice(-5);
// => [1, 2, 3]

// [1, 2, 3].slice(0);
// => [1, 2, 3]
```

##### isArray

```js
const array = []
console.log(Array.isArray(array))
// output: true
```

##### isArrayBuffer

```js
console.log(new ArrayBuffer(2) instanceof ArrayBuffer)
// output: true
```

##### join

```js
const result = ['one', 'two', 'three'].join('--')
console.log(result)
// output: 'one--two--three'
```

##### last

```js
// Native
const numbers = [1, 2, 3, 4, 5]
// numbers[numbers.length - 1];
// => 5
//or
// numbers.slice(-1)[0];
// => 5
//or
// [].concat(numbers).pop()
// => 5

// Native (works even with potentially undefined/null)
// [].concat(undefined).pop()
// => undefined

numbers.slice(-2)
// => [4, 5]
```

##### lastIndexOf

```js
const array = [2, 9, 9, 4, 3, 6]
const result = array.lastIndexOf(9)
console.log(result)
// output: 2
```

##### reverse

```js
const array = [1, 2, 3]
console.log(array.reverse())
// output: [3, 2, 1]
```

##### slice

```js
const array = [1, 2, 3, 4]
console.log(array.slice(1, 3))
// output: [2, 3]
```

##### without

```js
const array = [1, 2, 3]
console.log(
  array.filter(function(value) {
    return value !== 2
  })
)
// output: [1, 3]
```
