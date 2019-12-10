##### 生命周期管理

```bash
# 使用nginx:latest镜像以守护进程模式（-d）运行nginx，名为nginx
docker run --name nginx -d nginx:lastest
# 等效于
docker run --name nginx -d nginx
# -P 表示将容器 80 端口映射到主机随机端口
docker run -P -d nginx:lastest
docker run -d -p 80:80 -v /data:/data nginx:latest
# 绑定容器的 8080 端口，并将其映射到本地主机 127.0.0.1 的 80端口，以交互模式在容器内启动 bash
docker run -it -p 127.0.0.1:80:8080/tcp ubuntu bash
docker run -it -p 127.0.0.1:80:8080/tcp ubuntu /bin/bash

```

`docker ps`

| CONTAINER ID | IMAGE | COMMAND                | CREATED      | STATUS      | PORTS              | NAMES |
| :----------- | :---- | :--------------------- | :----------- | :---------- | :----------------- | ----- |
| 8ca10f33c3cc | nginx | "nginx -g 'daemon of…" | 15 hours ago | Up 15 hours | 0.0.0.0:80->80/tcp | nginx |

STATUS

- `created`
- `restarting`
- `running`
- `removing` 迁移中
- `paused`
- `exited`
- `dead`

PORTS:

- `tcp`
- `udp`

```bash
# 列出所有容器容器ID
docker ps -a -q
```

##### 容器操作

```bash
# 以下命令容器id皆可以用容器name代替
docker start 8ca10f33c3cc
docker stop 8ca10f33c3cc
docker restart 8ca10f33c3cc

# 杀死一个容器
docker kill -s KILL nginx

# 创建一个容器但不启动
docker create --name nginx nginx

# 暂停容器中所有进程
docker pause 8ca10f33c3cc
docker unpause 8ca10f33c3cc

# 强制删除正在运行的容器
docker rm -f 8ca10f33c3cc
# 删除一个容器及其数据卷
docker rm -v 8ca10f33c3cc
# 删除已经停止的容器
docker rm $(docker ps -a -q)
# 删除容器连接名为db的连接
docker rm -l db

# 在运行的容器中执行 demo.sh 脚本
docker exec -it nginx /bin/sh /root/demo.sh
# 在容器中开启一个交互模式的终端
docker exec -it nginx /bin/bash

# 列出容器端口映射
docker port 8ca10f33c3cc # 80/tcp -> 0.0.0.0:80

# 将容器导出为指定格式文件
docker export -o nginx-`date +%Y%m%d`.tar 8ca10f33c3cc
# 列出指定格式文件
ls nginx-`date +%Y%m%d`.tar

# 阻塞运行知道容器停止，并打印其退出代码
docker wait 8ca10f33c3cc

# 获取容器日志
docker logs 8ca10f33c3cc
# 跟踪日志输出
docker logs -f 8ca10f33c3cc
# 查看指定日期内最近10条日志
docker logs --since="2018-12.109" --tail=10 8ca10f33c3c

# 获取服务器事件
docker events --since="2019"
docker events -f "image"="nginx" --since="2019-12-09"

# 使用8ca10f33c3c创建一个新镜像，名为nginx:v1
docker commit -a "yudong.zhu" -m "新创建一个镜像" 8ca10f33c3c nginx:v1

# 将主机内目录拷贝至容器内
docker cp /www/cp 8ca10f33c3c:/www/
# 将主机内目录拷贝至容器内并重命名为www
docker cp /www/cp 8ca10f33c3c:/www
# 将容器www目录拷贝至主机tmp目录
docker cp  96f7f14e99ab:/www /tmp/
```

`docker diff nginx` 查看容器里文件结构的更改

```
C /run
A /run/nginx.pid
C /var
C /var/cache
C /var/cache/nginx
A /var/cache/nginx/scgi_temp
A /var/cache/nginx/uwsgi_temp
A /var/cache/nginx/client_temp
A /var/cache/nginx/fastcgi_temp
A /var/cache/nginx/proxy_temp
```

##### 镜像操作

```bash
docker images
docker images nginx
# 将指定镜像保存为指定文件
docker save -o nginx.tar nginx
docker save -o nginx.tar runoob/ubuntu:v3
# 导入镜像
docker load < nginx.tar
docker load --input nginx.tar
# 从镜像归档文件创建镜像
docker import nginx.tar nginx:v2
# 标记本地镜像并将其归入某一仓库并加上版本号
docker tag nginx repo/nginx:v2
# 强制删除一个镜像
docker rmi -f nginx
docker history nginx

docker build -t runoob/ubuntu:v1
docker build github/creack/docker-firefox
docker build -f /path/to/a/Dockerfile .
# 执行Dockerfile前先进行语法检查
docker build -t test/myapp .
```

##### 镜像仓库

```bash
docker login -u 用户名 -p 密码
docker logout
docker pull mysql
# 拉取所有tagged镜像
docker pull -a mysql
docker push nginx:v2
docker search mysql
# is-automated 只列出 automated build 类型的镜像，--no-trunc 完整的镜像描述， stars=100 收藏数不小于100
docker search mysql --no-trunc --filter=is-automated=true --filter=stars=100
```

| NAME               | DESCRIPTION                                                                                         | STARS | OFFICIAL | AUTOMATED |
| :----------------- | :-------------------------------------------------------------------------------------------------- | :---- | :------- | --------- |
| mysql/mysql-server | Optimized MySQL Server Docker images. Created, maintained and supported by the MySQL team at Oracle | 658   |          | [OK]      |

##### 容器信息

```bash
# 列出容器/镜像元数据
docker inspect
# 获取容器的ip
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nginx
for i in `docker ps | grep Up | awk '{print $1}'`;do echo \ && docker top $i; done
```

`docker top nginx`

| UID  | PID   | PPID  | C   | STIME | TTY | TIME     | CMD                                        |
| :--- | :---- | :---- | :-- | :---- | :-- | :------- | ------------------------------------------ |
| root | 30830 | 30815 | 0   | Dec09 | ?   | 00:00:00 | nginx: master process nginx -g daemon off; |
| 101  | 30878 | 30830 | 0   | Dec09 | ?   | 00:00:00 | nginx: worker process                      |

`docker info`

```
Client:
 Debug Mode: false

Server:
 Containers: 4
  Running: 3
  Paused: 0
  Stopped: 1
 Images: 6
 Server Version: 19.03.5
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: true
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: b34a5c8af56e510852c35414db4c1f4fa6172339
 runc version: 3e425f80a8c931f88e6d94a8c831b9d5aa481657
 init version: fec3683
 Security Options:
  seccomp
   Profile: default
 Kernel Version: 3.10.0-862.el7.x86_64
 Operating System: CentOS Linux 7 (Core)
 OSType: linux
 Architecture: x86_64
 CPUs: 1
 Total Memory: 1.796GiB
 Name: VM_0_12_centos
 ID: SUHB:WFN6:VTTB:GXID:YW4C:GW4J:AC2L:R3L3:IHN3:ZS6V:D5PI:SUED
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false

WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled
```

`docker version`

```
Client: Docker Engine - Community
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12
 Git commit:        633a0ea
 Built:             Wed Nov 13 07:25:41 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.12.12
  Git commit:       633a0ea
  Built:            Wed Nov 13 07:24:18 2019
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.2.10
  GitCommit:        b34a5c8af56e510852c35414db4c1f4fa6172339
 runc:
  Version:          1.0.0-rc8+dev
  GitCommit:        3e425f80a8c931f88e6d94a8c831b9d5aa481657
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683
```
