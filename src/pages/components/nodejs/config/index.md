## 配置

```bash
# 修改npm配置
npm config edit
# 列出配置项
npm config ls -l
# 缓存目录
npm config get cache
# node 版本目录
npm config get prefix
# 全局安装目录
npm root -g
```

`.npmrc` npm 配置文件

```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

`.npmignore`

```
/docs
/test
/__test__
/static/doc
/iconfont
```
