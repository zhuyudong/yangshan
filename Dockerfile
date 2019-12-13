FROM node:alpine

# LABEL maintainer="Yudong Zhu <zhuyudong@aliyun.com>"

WORKDIR /usr/src/app
USER root
# RUN yum install -y libwebp-tools
ADD package.json ./
#--registry=https://registry.npm.taobao.org
RUN npm i -g yarn tyarn
RUN tyarn --no-cache
COPY ./ ./

# EXPOSE 80

CMD ["tyarn", "build-webpack"]
