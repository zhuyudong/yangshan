FROM node

LABEL maintainer="Yudong Zhu <zhuyudong@aliyun.com>"

RUN rm -rf /app
RUN mkdir /app

WORKDIR /app
USER root
ADD package.json ./
RUN yarn --silent --no-cache

COPY ./ ./

CMD ["yarn", "build-webpack"]
