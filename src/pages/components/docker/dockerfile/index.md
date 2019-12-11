# Dockerfile

#### [本项目Dockerfile](https://github.com/zhuyudong/yangshan/blob/master/Dockerfile)

```
FROM node

WORKDIR /usr/src/app/
USER root
ADD package.json ./
RUN yarn --silent --no-cache --registry=https://registry.npm.taobao.org

COPY ./ ./

CMD ["yarn", "build-webpack"]
```