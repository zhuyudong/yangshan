FROM node

LABEL maintainer="Yudong Zhu <zhuyudong@aliyun.com>"

WORKDIR /usr/src/app
USER root
ADD package.json ./
RUN npm i -g yarn tyarn cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
COPY ./ ./

CMD ["cnpm", "run", "build-webpack"]
