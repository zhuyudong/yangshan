# docker-compose

[Compose file format Vs Docker Engine release](https://docs.docker.com/compose/compose-file/compose-versioning/)

##### 安装

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
docker-compose -v
```

#### 配置文件

```
version: "3.7"

services:
  yangshan_build:
    build: ../
    container_name: "yangshan_build"
    volumes:
      - dist:/usr/src/app/dist

  yangshan_web:
    image: nginx
    ports:
      - "80:80"
    container_name: "yangshan_web"
    restart: unless-stopped
    volumes:
      - dist:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf

volumes:
  dist:
```
