## types

### 如何编写声明文件

### 类型声明库

- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) The repository for high quality TypeScript type definitions. [http://definitelytyped.org/](http://definitelytyped.org/)

`tsconfig.json`

```json
{
  "baseUrl": "types",
  "typeRoots": ["types"]
}
```

#### 1. [`@types/node`](https://github.com/DefinitelyTyped/DefinitelyTyped)

This package contains type definitions for Node.js (http://nodejs.org/).

Global values:

`Buffer`, `NodeJS`, `Symbol`, `__dirname`, `__filename`, `clearImmediate`, `clearImmediate`,
`clearInterval`, `clearTimeout`, `console`, `exports`, `global`, `module`, `process`, `queueMicrotask`,
`require`, `setImmediate`, `setInterval`, `setTimeout`

The types should then be automatically included by the compiler. You may need to add a `types` reference if you're not using modules:

> `/// <reference types="node">`
