[English][readm-en] | [中文版]

# 洋山

主页: [http://211.159.183.230](http://211.159.183.230)

## 开发

```zsh
git clone https://github.com/zhuyudong/yangshan.git

cd yangshan
yarn
yarn dev
```

启动 `webpack` 服务

```zsh
yarn dev
```

**之后**，在你的浏览器中打开 http://127.0.0.1:8080/ ，开始你的表演。

[readm-en]: https://github.com/zhuyudong/yangshan/blob/master/README.md

## Docker 模式部署

```bash
cd docker
docker-compose rm && docker-compose pull && docker-compose build --no-cache && docker-compose up -d --force-recreate
```
