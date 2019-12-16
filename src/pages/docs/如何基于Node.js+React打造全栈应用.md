## 如何基于 Node.js+React 打造全栈应用

---

### 核心架构

#### 开发语言

- `TypeScript`

#### 前端

- `antd(React)` 前端组件

#### 后端

- `koa` Node.js HTTP 框架
- `apollo-boost` QraphQL 接口
- `mongoose` MongoDB 数据库 ORM
- `cheerio` 爬虫
- `node-schedule` 定时任务

#### 工具函数

- `lodash` 工具函数
- `dayjs` 时间日期处理

#### 代码规范

- `eslint` 语法检查
- `prettier` 代码格式化

#### git

- `husky` git push 前代码语法及规范检查

#### 测试

- `jest` 测试框架
- `enzyme`

#### 构建

- `babel` 高级语法/API 转译
- `webpack` 模块化构建
- `postcss` css 浏览器前缀、压缩 css
- `typescript`

#### 部署

- `nginx` 负载均衡、反向代理等
- `docker-compose` 容器编排

### 项目目录结构

```
.
├── __mocks__
│ ├── db.ts
│ ├── fileMock.ts
│ └── styleMock.ts
├── __tests__
│ ├── e2e                    端到端测试
│ │ ├── Header.spec.tsx
│ │ ├── Loading.spec.tsx
│ │ ├── Notice.spec.tsx
│ │ ├── Rank.spec.tsx
│ ├── service                接口测试
│ │ └── api.spec.ts
│ ├── unit                   单元测试
│ │ ├── client-util.test.ts
│ │ └── server-util.test.ts
│ └── setup.ts
├── .git
├── .github
│ └── workflows
│   ├── nodejs.yml
├── build                    构建配置文件
│ ├── template
│ │ ├── 404.ejs
│ │ ├── favicon.ico
│ │ └── index.ejs
│ ├── qiniu.config.js
│ ├── webpack.analysis.config.js
│ ├── webpack.base.config.js
│ ├── webpack.dev.config.js
│ └── webpack.prod.config.js
├── dist                     编译构建输出
├── docker                   容器方式部署
│ ├── docker-compose.yml
│ └── Dockerfile
├── logs                     后端日志
│ └── globallog.log
├── node_modules
├── src
│ ├── client                 客户端代码
│ │ ├── components           公共组件
│ │ │ ├── Header             页头
│ │ │ │ ├── index.tsx
│ │ │ │ └── styles.less
│ │ │ ├── HOC                高阶组件
│ │ │ │ ├── RenderLoadingComponent.tsx
│ │ │ │ └── RenderNoEmptyComponent.tsx
│ │ │ ├── Loading
│ │ │ │ ├── index.tsx
│ │ │ │ └── styles.less
│ │ │ ├── Notice
│ │ │ │ ├── index.tsx
│ │ │ │ └── styles.less
│ │ │ ├── Rank
│ │ │ │ ├── index.tsx
│ │ │ │ └── styles.less
│ │ ├── config                配置文件
│ │ │ └── index.ts
│ │ ├── constants             常量定义
│ │ │ └── index.ts
│ │ ├── containers            页面级组件
│ │ │ ├── App                 布局容器
│ │ │ │ ├── index.tsx
│ │ │ │ └── styles.less
│ │ │ ├── Home                首页
│ │ │ │ ├── index.tsx
│ │ │ │ └── styles.less
│ │ ├── context               透传 props
│ │ │ ├── appContext.ts
│ │ │ └── appContextProvider.tsx
│ │ ├── theme                 主题
│ │ │ ├── const.less
│ │ │ └── reset.less
│ │ ├── utils
│ │ │ ├── index.ts            工具函数集
│ │ │ └── request.ts          发起 graphql http 请求
│ │ ├── icons.js              图标
│ │ ├── index.tsx             前端入口
│ │ └── router.tsx            前端路由定义
│ └── server                  服务端代码
│ ├── config                   后端配置
│ │ └── index.ts
│ ├── controllers             响应接口请求
│ │ ├── graphql.ts
│ │ ├── index.ts              请求入口再派发
│ │ └── schedule.ts
│ ├── middleware              http 处理中间件
│ │ └── ErrorHander.ts
│ ├── models                  mongodb 表结构定义及操作方法
│ │ └── someModel.ts
│ ├── utils                   后端工具库
│ │ ├── dbHelper.ts           建立数据库连接和定义异步事件处理
│ │ ├── index.ts              工具函数集
│ │ └── spiderHelper.ts       网路爬虫爬取及解析处理
│ └── app.ts                  后端入口：HTTP 服务器初始化、加载路由处理等中间件、日志配置
├── types                     typescript 类型定义
│ └── index.d.ts
├── .babelrc
├── .editorconfig
├── .eslintignore             代码规范忽略文件
├── .eslintrc.js              代码规划配置规则
├── .gitignore                git 忽略文件
├── .travis.yml               持续集成配置
├── gulpfile.js                后端构建流
├── Introduction.md
├── jest.config.js             测试配置
├── LICENSE
├── package.json
├── postcss.config.js          css 处理插件
├── prettier.config.js         代码格式化配置
├── README.md
├── tsconfig.json              typescript 编译配置
├── webpack.config.js          项目构建配置
└── yarn.lock
```

### [核心代码]()
