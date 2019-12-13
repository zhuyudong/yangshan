FROM node

LABEL maintainer="Yudong Zhu <zhuyudong@aliyun.com>"

WORKDIR /usr/src/app
USER root
ADD package.json ./
RUN npm i -g cnpm
RUN cnpm --silent --no-cache
COPY ./ ./

CMD ["yarn", "build-webpack"]
