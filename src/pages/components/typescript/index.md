# TypeScript

### TypeScript 关键字

无需定义即可直接使用

- `any`
- `string` 字符串类型
- `number` 数值类型
- `boolean` 布尔类型
- `object` 对象类型
- `symbol` `Symbol` 类型
- `unkown`
- `type`
- `private`
- `public`
- `protected`
- `declare`
- `enum`
- `keyof`
- `infer`
- `partial`
- `package`
- `implements`
- `namespace`
- `T` 泛型
- `K`
- `Readonly`
- `Required`
- `Pick`
- `Record`
- `Exclude`
- `Extract`
- `ReturnType`
- `ThisType`
- `InstanceType`
- `NonNullable`
- `Parameters`
- `ConstructorParameters`
- `Omit`
- `Mutable`
- `PowerPartial`
- `Proxify`
- `Deferred`
- `IArguments` 函数实参类型

### 1. 基本类型声明

#### 布尔值

```ts
let isDone: boolean = false
let createByNewBoolean1: Boolean = new Boolean(1)
// ❌ 不能将类型“Boolean”分配给类型“boolean”。“boolean”是基元，但“Boolean”是包装器对象。如可能首选使用“boolean”。ts(2322)
let createByNewBoolean2: boolean = new Boolean(1)
let createByBoolean: boolean = Boolean(1)
```

#### 数值

```ts
let decLiteral1: number = 6
// ❌ 不能将类型“"6"”分配给类型“number”。ts(2322)
let decLiteral2: number = '6'
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
let notANumber: number = NaN
let infinityNumber: number = Infinity
```

#### 字符串

```ts
let myName1: string = 'Michael'
// ❌ 不能将类型“666”分配给类型“string”。ts(2322)
let myName2: string = 666
```

#### 空值

```ts
function alerName(): void {
  alert('My name is Michael')
}
let unusable1: void = undefined
let unusable2: void = void 0
let unusable3: void = null
// ❌ 不能将类型“"str"”分配给类型“void”。ts(2322)
let unusable4: void = 'str'
let u1: undefined = undefined
let u2: undefined = void 0
// ❌ 不能将类型“666”分配给类型“undefined”。ts(2322)
let u3: undefined = 666
let n1: null = null
// ❌ 不能将类型“"str"”分配给类型“null”。ts(2322)
let n2: null = 'str'
```

#### 任意值

```ts
let anyThing1: any = 'hello'
let anyThing2: any = 888
let anyThing3: any = true
let anyThing4: any = null
let anyThing5: any = undefined
let anyThing6: any = void 0
// 未声明类型，可赋值为任意值
let any
any = true
```

#### 对象

```ts
function foo(o: object) {
  return o.toString()
}
foo([])
foo({})
// ❌ 类型“"str"”的参数不能赋给类型“object”的参数。ts(2345)
foo('str')
```

#### 元组

```ts
let x: [string, number]
x = ['string', 9527]
// ❌ 不能将类型“number”分配给类型“string”。ts(2322)
x = [9527, 'string']
```

#### 数组

```ts
let fibonacci1: number[] = [1, 1, 2, 3, 5]
// 等效于
let fibonacci2: Array<number> = [1, 1, 2, 3, 5]
// ❌ 不能将类型“string”分配给类型“number”。ts(2322)
let fibonacci3: Array<number> = ['str', 1, 2, 3, 5]
// ❌ 类型“true”的参数不能赋给类型“number”的参数。ts(2345)
fibonacci1.push(true)
interface NumberArray {
  [index: number]: number
}
let fibonacci4: NumberArray = [1, 1, 2, 3, 5]
// 任意类型
let list: any[] = [
  1,
  'str',
  true,
  undefined,
  null,
  void 0,
  Symbol,
  { key: 'value' },
  function foo() {}
]
/*只读数组*/
let arr: ReadonlyArray<number> = [1, 2, 3]
// ❌ 类型“readonly number[]”中的索引签名仅允许读取。ts(2542)
arr[0] = 12
// ❌ 类型“readonly number[]”上不存在属性“push”。ts(2339)
arr.push(4)
// ❌ Cannot assign to 'length' because it is a read-only property.ts(2540)
arr.length = 4
```

#### 类数组

```ts
function foo1() {
  let args: IArguments = arguments
}
function foo2() {
  // ❌ Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 26 more.ts(2740)
  let args: number[] = arguments
}
```

#### 函数

```ts
function foo3(x: number, y: number): number {
  return x + y
}
foo3(undefined, 2)
// ❌ 应有 2 个参数，但获得 1 个。ts(2554)
foo3(1)
// ❌ 应有 2 个参数，但获得 3 个。ts(2554)
foo3(1, 2, 3)
// 函数表达式
let foo4 = function(x: number, y: number): number {
  return x + y
}
let foo5: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}
// 接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function(source, subString) {
  return source.search(subString) !== -1
}
```

#### 函数参数

```ts
function buildName1(
  firstName: string,
  middleName: string = '.',
  lastName?: string
) {
  if (lastName) return firstName + middleName + ' ' + lastName
  return firstName + middleName
}
let tomcat = buildName1('Tom', '.', 'Cat')
let tom = buildName1('Tom')
// ❌ 应有 1-2 个参数，但获得 3 个。ts(2554)
let tomcat1 = buildName1('Tom', 'Cat', 1)
// ❌ 类型“true”的参数不能赋给类型“string”的参数。ts(2345)
let tomcat2 = buildName1('Tom', true)
/* 参数默认值 */
// ❌ 参数不能包含问号和初始化表达式。ts(1015)
function buildName2(firstName: string, lastName?: string = 'Cat') {
  if (lastName) return firstName + ' ' + lastName
  return firstName
}
// ❌ 必选参数不能位于可选参数后。ts(1016)
function buildName3(firstName: string, lastName?: string, endName: string) {
  //
}

/* 剩余参数 */
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item)
  })
}
let a = []
push(a, 1, 2, 3)
```

### 2. 高级类型

#### 交叉类型

#### 联合类型

```ts
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7

function getString(something: string | number): string {
  return something.toString()
}

// ❌ 类型“number”上不存在属性“length”。ts(2339)
function getLength(something: string | number): number {
  return something.length
}
```

#### 索引类型

#### 映射类型

#### 条件类型

### 3. 类型检查机制

#### 类型推断

Type Inference

```ts
let myFavoriteNumber1 = 'seven'
myFavoriteNumber1 = 'eight'
// ❌ 不能将类型“666”分配给类型“string”。ts(2322)
myFavoriteNumber1 = 666
// 等效于
let myFavoriteNumber2: string = 'seven'
myFavoriteNumber2 = 'eight'
```

#### 类型兼容性

#### 类型保护

### 4. 类型断言

```ts
function getLength1(something: string | number): number {
  if ((<string>something).length) return (<string>something).length
  return something.toString().length
}
// 等效于
function getLength1(something: string | number): number {
  if (something as string) return (something as string).length
  return something.toString().length
}
// ❌ 类型“string | number”上不存在属性“length”。 类型“number”上不存在属性“length”。ts(2339)
function getLength2(something: string | number): number {
  return something.length
}
```

### 5. 类型别名

```ts
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') return n
  return n()
}
```

### 6. 枚举

默认枚举值从 0 开始，可以手动赋值

```ts
enum Days1 {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
console.log(Days1.0) // => 'Sun'
console.log(Days1.Sun) // => 0
console.log(Days1['Sun']) // => 0
enum Days2 {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
console.log(Days2.Sun) // => 7
console.log(Days2.Tue) // => 2
```

### 7. 接口

```ts
interface Person {
  // 确定且只读属性
  readonly id: number
  name: string
  // 可选属性
  age?: number
  // 允许有任意属性，必须和可选都必须是其子类型
  [propName: string]: any
}
let tom: Person = {
  id: 1,
  name: 'Tom',
  age: 25
}
let michael: Person = {
  id: 2,
  name: 'Michael'
}
let luck: Person = {
  id: 3,
  name: 'Luck',
  age: 25,
  sex: 'female'
}
// ❌ Cannot assign to 'id' because it is a read-only property.ts(2540)
luck.id = 4

interface Animal {
  // ❌ 类型“boolean”的属性“isSmall”不能赋给字符串索引类型“string”。ts(2411)
  isSmall: boolean
  // ❌ 类型“number”的属性“age”不能赋给字符串索引类型“string”。ts(2411)
  age?: number
  [propName: string]: string
}

interface IUserInfo {
  age: any
  userName: string
}
function getUserInfo(user: IUserInfo): string {
  return user.age + '=====' + user.userName
}
```

### 8. 类

```ts
class Animal {
  // 静态方法
  static isAnimal(a) {
    return a instanceof Animal
  }

  constructor(name) {
    this.name = name
  }

  sayHi() {
    return `My name is ${this.name}`
  }
}
let a = new Animal('Jack')
console.log(a.sayHi())
```

#### 继承

```ts
class Cat extends Animal {
  constructor(name) {
    super(name)
    console.log(this.name)
  }

  sayHi() {
    return 'Meow, ' + super.sayHi()
  }
}
let c = new Cat('Tom')
console.log(c.sayHi()) // => Meow, My name is Tom
```

#### 存储器

```ts
class Animal {
  constructor(name) {
    this.name = name
  }

  get name() {
    // return 'Jack'
    return this.name
  }

  set name(value) {
    console.log('setter: ' + value)
    this.name = value
  }
}
let a = new Animal('Kitty')
a.name = 'Tom'
console.log(a.name)
```

#### 抽象类

```ts
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('roaming the earch...')
  }
}
// 子类必须实现抽象类的抽象方法
```

#### 成员修饰符

#### 多态

### 9. 泛型

解决类接口方法的复用性，以及对不特定数据类型的支持

```ts
function getData1<T>(value: T): T {
  return value
}
getData1<number>(123)
getData1<string>('str')

interface IConfigFn {
  <T>(value: T): T
}
const getData2: IConfigFn = function<T>(value: T): T {
  return value
}
getData2<boolean>(true)
getData2<string>('str')
getData2<number>(123)
// ❌ 类型“"123"”的参数不能赋给类型“number”的参数。ts(2345)
getData2<number>('123')
```

#### 范型函数

#### 范型接口

#### 范型类

#### 范型约束

### 10. 模块

```ts
```

### 11. 编写声明文件

### 12. 配置 tsconfig

### 13. ts-loader 到 babel

### 14. 使用 jest 单元测试

### 15. 策略

#### 共存策略

#### 严格策略

#### 宽松策略

### 16. React 中使用 TS
