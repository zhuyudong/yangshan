FROM node

LABEL maintainer="Yudong Zhu <zhuyudong@aliyun.com>"

RUN rm -rf /app
RUN mkdir /app

WORKDIR /app
USER root
# ADD package.json ./
COPY ./ ./
RUN yarn --silent

CMD ["yarn", "build-webpack"]
