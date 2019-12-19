## tsconfig.json 配置项详解

ts 文件类型：`.ts`, `.tsx`, `.d.ts`

`npm i -g typescript` 或 `yarn global add typescript` 安装 `tsc` 全局命令

`tsc --init` 初始化出 `tsconfig.json`

`tsx` 执行编译

### 与文件相关

```json
{
  /*files 会和 include、exclude 合并*/
  // 指定要编译的文件
  "files": ["src/a.ts"],
  // 编译src下所有文件，包含子目录
  "include": ["src"],
  // 只编译src一级目录下文件
  // "include": ["src/*"],
  // 只编译src二级目录下文件
  // "include": ["src/*/*"],

  // 要排除的文件或文件夹，默认包含node_modules
  "exclude": ["src/lib"]
}
```

### 继承与覆盖

`tsconfig.extends.json`

```json
{
  "extends": "./tsconfig.json",
  // 覆盖
  "exclude": [],
  // 保存时自动编译，但是目前 vscode 不支持
  "compileOnSave": true
}
```

### 编译选项详解

```json
{
  "compilerOptions": {
    // 增量编译，提高编译速度 （默认根目录下 tsconfig.tsbuildinfo）
    "incremental": true,
    // 增量编译文件的存储位置
    "tsBuildInfoFile": "./buildFile",
    // 打印诊断信息
    "diagnostics": true,

    // 目标语言的版本，可选值包括：
    "taget": "es5",
    // 生成代码的模块标准，可选值包括：amd、commonjs
    "module": "commonjs",
    // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中
    "outFile": "./app.js",

    // TS 需要引用的库，即声明文件，es5 默认"dom", "es5", "scripthost"
    // "scripthost" 指 activeX 等控件
    // 可写 "es2019.array"
    "lib": [],

    // 允许编译 JS 文件 （js、jsx）
    "allowJs": true,
    // 允许在 JS 文件中报错，通常与 allowJS 一起使用
    "checkJs": true,
    // 指定输出目录，不指定则覆盖原文件
    "outDir": "./out",
    // 指定输入文件目录，默认当前目录，用于控制输出目录结构
    "rootDir": "./src",

    // 生成声明文件
    "declaration": true,
    // 声明文件的路径
    "declarationDir": "./d",
    // 只生成声明文件
    "emitDeclarationOnly": true,
    // 生成目标文件的 sourceMap，（*.map）
    "sourceMap": true,
    // 生成目标文件的 inline sourceMap
    "inlineSourceMap": true,
    // 生成声明文件的 sourceMap
    "declarationMap": true,
    // 声明文件目录，默认 node_mdoules/@types
    "typeRoots": [],
    // 声明文件包
    "types": [],

    // 删除注释
    "removeComments": true,

    // 不输出文件
    "noEmit": true,
    // 发生错误时不输出文件
    "noEmitOnError": true,

    // 不生成 helper 函数，需额外安装 ts-helpers
    "noEmitHelpers": true,
    // 通过 tslib 引入 helper 函数，文件必须是模块
    "importHelpers": true,

    // 降级遍历器的实现（es3/5）
    "downlevelIteration": true,

    // 开启所有严格的类型检查
    "strict": true,
    // 在代码中注入 "use strict"
    "alwaysStrict": false,
    // 不允许隐式的 any 类型
    "noImplicitAny": false,
    // 不允许把 null、undefined 赋值给其他类型变量
    "strictNullChecks": false,
    // 不允许函数参数双向协变
    "strictFunctionTypes": false,
    // 类的实例属性必须初始化
    "strictPropertyInitialization": false,
    //严格的 bind/call/apply 检查
    "strictBindCallApply": false,

    // 检查只声明，未使用的局部变量
    "noUnusedLocals": true,
    // 检查未使用的函数参数
    "noUnusedParameters": true,
    // 防止 switch 语句贯穿
    "noFallthroughCasesInSwitch": true,
    // 每个分支都要有返回值
    "noImplicitReturns": true,

    // 允许 export = 导出，由 import from 导入
    "esModuleInterop": true,
    // 允许在模块中访问 UMD 全局变量
    "allowUmdGlobalAccess": true,
    // 模块解析策略
    "moduleResolution": "node",
    // 解析非相对模块的基地址
    "baseUrl": "./",
    // 路径映射，相对于 baseUrl
    "paths": [
      "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
    ],
    // 将多个目录放在一个虚拟目录下，用于运行时
    "rootDirs": ["src", "out"],

    // 打印输出的文件
    "listEmittedFiles": true,
    // 打印编译的文件（包含引用的声明文件）
    "listFiles": true
  }
}
```

### 最佳完整配置

```json
{}
```
