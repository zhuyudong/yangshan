FROM node

LABEL maintainer="Yudong Zhu <zhuyudong@aliyun.com>"

WORKDIR /usr/src/app/
USER root
ADD package.json ./
RUN yarn --silent --no-cache --registry=https://registry.npm.taobao.org

COPY ./ ./

CMD ["yarn", "build-webpack"]
