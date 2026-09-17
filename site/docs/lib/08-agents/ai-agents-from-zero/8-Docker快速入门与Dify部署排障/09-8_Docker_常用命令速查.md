---
title: "从零构建 AI Agent（didilili）"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/8-Docker快速入门与Dify部署排障.md"
sourceRel: "8-Docker快速入门与Dify部署排障.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/8-Docker快速入门与Dify部署排障.md"
sourceSha256: "09297f7e78a6c302e7b2504713cae07d1ff33ac759d225d046868a0ba30ae6a8"
pageSha256: "8719c9f724f02f13d03824d02e13c0d329a80adfb3498f7c27e9ddae4aac7560"
contentMode: "local-full"
zh: ""
---

## 8、Docker 常用命令速查

### 8.1 镜像管理

| 目的             | 命令                                    |
| ---------------- | --------------------------------------- |
| 查看本地镜像     | `docker images`                         |
| 拉取镜像         | `docker pull mysql:8.0.45`              |
| 搜索镜像         | `docker search mysql`                   |
| 删除镜像         | `docker rmi mysql:8.0.45`               |
| 查看镜像详细信息 | `docker inspect mysql:8.0.45`           |
| 构建自定义镜像   | `docker build -t my-app:1.0 .`          |
| 打包镜像         | `docker save mysql:8.0.45 -o mysql.tar` |
| 导入镜像         | `docker load -i mysql.tar`              |

### 8.2 容器管理

| 目的           | 命令                                                  |
| -------------- | ----------------------------------------------------- |
| 查看运行中容器 | `docker ps`                                           |
| 查看全部容器   | `docker ps -a`                                        |
| 查看容器日志   | `docker logs -f <容器名>`                             |
| 进入容器       | `docker exec -it <容器名> sh`                         |
| 停止容器       | `docker stop <容器名>`                                |
| 启动容器       | `docker start <容器名>`                               |
| 重启容器       | `docker restart <容器名>`                             |
| 删除已停止容器 | `docker rm <容器名>`                                  |
| 查看容器挂载   | <code v-pre>docker inspect <容器名> --format '{{json .Mounts}}'</code> |

### 8.3 Compose 项目管理

| 目的                         | 命令                               |
| ---------------------------- | ---------------------------------- |
| 启动整套服务                 | `docker compose up -d`             |
| 启动并重新构建               | `docker compose up -d --build`     |
| 查看服务状态                 | `docker compose ps`                |
| 查看全部服务容器             | `docker compose ps -a`             |
| 查看服务清单                 | `docker compose config --services` |
| 查看某个服务日志             | `docker compose logs -f <服务名>`  |
| 临时运行一个服务             | `docker compose run --rm <服务名>` |
| 进入服务容器执行命令         | `docker compose exec <服务名> sh`  |
| 拉取镜像                     | `docker compose pull`              |
| 构建服务镜像                 | `docker compose build <服务名>`    |
| 停止服务                     | `docker compose stop`              |
| 停止并删除容器、网络         | `docker compose down`              |
| 停止并删除容器、网络、volume | `docker compose down -v`           |
| 停止并删除项目关联镜像       | `docker compose down --rmi all`    |
| 查看最终配置                 | `docker compose config`            |

### 8.4 Dify 常用命令

下面命令默认在 Dify 的 `docker` 目录执行。

| 目的             | 命令                                                                             |
| ---------------- | -------------------------------------------------------------------------------- |
| 查看服务清单     | `docker compose config --services`                                               |
| 查看全部容器     | `docker ps -a`                                                                   |
| 查看 API 日志    | `docker compose logs -f api`                                                     |
| 查看 worker 日志 | `docker compose logs -f worker`                                                  |
| 查看 nginx 日志  | `docker compose logs -f nginx`                                                   |
| 查看数据库日志   | `docker compose logs -f db_postgres`                                             |
| 进入数据库容器   | `docker exec -it docker-db_postgres-1 sh`                                        |
| 连接 PostgreSQL  | `docker exec -it docker-db_postgres-1 psql -U postgres -d dify`                  |
| 查看容器挂载     | <code v-pre>docker inspect <容器名> --format '{{json .Mounts}}'</code>                            |
| 查看 volume      | `docker volume ls`                                                               |
| 备份数据库       | `docker exec -t docker-db_postgres-1 pg_dump -U postgres dify > dify_backup.sql` |

容器名和服务名可能因 Dify 版本或 Compose 项目名不同而变化。命令执行失败时，先用 `docker compose ps` 或 `docker ps` 确认当前环境里的真实名称。

### 8.5 Ubuntu 服务器常用命令

| 目的                     | 命令                                                                             |
| ------------------------ | -------------------------------------------------------------------------------- |
| 查看 Docker 服务状态     | `sudo systemctl status docker`                                                   |
| 重启 Docker 服务         | `sudo systemctl restart docker`                                                  |
| 配置当前用户免 sudo 使用 | `sudo usermod -aG docker $USER`                                                  |
| 查看 Docker Engine 配置  | `docker info`                                                                    |
| 编辑镜像源配置           | `sudo vim /etc/docker/daemon.json`                                               |
| 重新加载 systemd 配置    | `sudo systemctl daemon-reload`                                                   |
| 停止 Docker 服务         | `sudo systemctl stop docker`                                                     |
| 卸载 Docker 软件包       | `sudo apt remove -y docker-ce docker-ce-cli containerd.io docker-compose-plugin` |
| 删除 Docker 数据目录     | `sudo rm -rf /var/lib/docker /var/lib/containerd`                                |

最后一条是高风险清理命令，会删除本机 Docker 管理的数据。只在确认没有重要容器、镜像、volume 后使用。

### 8.6 危险操作清单

这些命令不是不能用，而是不能在没备份、没确认环境的情况下随手用：

| 命令                          | 可能后果                              | 使用前必须确认                         |
| ----------------------------- | ------------------------------------- | -------------------------------------- |
| `docker compose down -v`      | 删除当前 Compose 项目的 volume        | 数据库、向量库、上传文件是否已备份     |
| `docker volume rm <volume名>` | 删除指定 volume                       | 这个 volume 是否真的是废弃数据         |
| `docker volume prune`         | 删除所有未被容器使用的 volume         | 是否有停掉但还要保留数据的项目         |
| `docker system prune -af`     | 清理未使用容器、网络、镜像、构建缓存  | 是否能接受重新拉镜像和重建缓存         |
| `rm -rf ./volumes`            | 删除当前部署目录下的挂载数据          | 是否已经确认是测试环境或有备份         |
| `sudo rm -rf /var/lib/docker` | 删除 Docker Engine 管理的全部本地数据 | 是否是在重装机器，且已迁出所有数据     |
| `DROP DATABASE dify;`         | 删除 Dify 业务数据库                  | 是否已经停服务、备份、确认目标库可清空 |

确实要清空测试环境时，建议先把“查看命令”和“删除命令”分开执行：

```bash
docker compose ps
docker volume ls
docker inspect <容器名> --format '{{json .Mounts}}'
```

确认之后，再执行清理命令。这个习惯在本地看起来慢一点，到了服务器上能少很多麻烦。

**本章小结：**

- 镜像是模板，容器是运行实例。
- Dockerfile 负责构建镜像，Compose 负责编排多服务。
- `ports` 左边是宿主机端口，右边是容器端口。
- `volumes` 决定数据和文件从哪里来、落到哪里去。
- Windows 本地和 Ubuntu 服务器的 Docker 使用方式相通，但路径、权限、镜像源配置不同。
- Dify 的 Docker 部署是一组服务协同，不是单个容器。
- 排障时先看容器状态和日志，再看端口、`.env`、数据库和向量库。
- 升级前先备份数据库，避免 migration 或误操作带来不可逆损失。
