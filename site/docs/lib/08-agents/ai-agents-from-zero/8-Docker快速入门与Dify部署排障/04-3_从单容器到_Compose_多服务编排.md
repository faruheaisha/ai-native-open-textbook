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
pageSha256: "ba0beb7ed0b00291f40854ce3ff5ce93a39f147b6a02bbe482d264932c16d89d"
contentMode: "local-full"
zh: ""
---

## 3、从单容器到 Compose 多服务编排

第 2 部分的 MySQL 示例只用了 `docker run`，适合快速体验。到了真实项目里，一个容器通常不够。Dify 有 web、api、worker、数据库、Redis、向量库、nginx、sandbox、plugin_daemon 等服务；电商问数项目里也会同时依赖 MySQL、Qdrant、Elasticsearch 和后端服务。

这一部分就往前走一步：不再手动敲一长串 `docker run`，而是用文件描述一组服务。

| 阶段         | 解决的问题                 | 典型文件或命令                   |
| ------------ | -------------------------- | -------------------------------- |
| `docker run` | 快速启动一个现成镜像       | `docker run -d ... mysql:8.0.45` |
| Dockerfile   | 把自己的代码和依赖打成镜像 | `FROM python:3.12`               |
| Compose      | 一次启动多容器项目         | `docker compose up -d`           |

Dify 的 `docker/` 目录也可以按这个思路理解：它不是普通源码目录，更像一份多服务部署说明书。

### 3.1 Dockerfile

刚才的 MySQL 是直接使用官方镜像。如果我们想把自己的 Python 脚本、依赖和运行环境也打包成镜像，就需要 Dockerfile。

在项目目录里新建 `Dockerfile`：

```dockerfile
FROM python:3.12

WORKDIR /app

COPY . /app

RUN pip install pymysql cryptography

CMD ["python", "test_mysql1.py"]
```

逐行理解：

| 指令                  | 作用                          |
| --------------------- | ----------------------------- |
| `FROM python:3.12`    | 以 Python 3.12 官方镜像为基础 |
| `WORKDIR /app`        | 设置容器内工作目录            |
| `COPY . /app`         | 把当前项目文件复制进镜像      |
| `RUN pip install ...` | 构建镜像时安装依赖            |
| `CMD [...]`           | 容器启动时默认执行的命令      |

Dockerfile 解决的是“如何构建一个符合我项目需要的镜像”。它不是用来启动一组服务的，启动多服务要交给 Compose。

### 3.2 Compose

Docker Compose 用一份 YAML 文件描述多容器应用。Docker 官方文档也把 Compose 定义为管理多容器应用的工具，它可以在一个配置文件里统一管理 services、networks、volumes。

常见部署文档会让你进入 `docker` 目录，然后执行：

```bash
docker compose up -d
```

它会按 `docker-compose.yaml` 里的配置做几件事：

1. 拉取或构建镜像。
2. 创建容器。
3. 创建网络。
4. 挂载数据目录或 volume。
5. 后台启动服务。

所以这条命令不是“启动一个程序”，而是“把一组互相依赖的服务一起拉起来”。

### 3.3 MySQL + Python 的 Compose 小案例

项目目录可以这样放：

```text
docker-python-mysql/
├── docker-compose.yml
├── Dockerfile
└── test_mysql1.py
```

`docker-compose.yml` 示例：

```yaml
services:
  mysql-db:
    image: mysql:8.0.45
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: "123456"
      MYSQL_DATABASE: "test_db"
      MYSQL_INITDB_ARGS: "--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci"
    ports:
      - "9999:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - app-network
    healthcheck:
      test:
        ["CMD", "mysqladmin", "ping", "-h", "localhost", "-uroot", "-p123456"]
      interval: 3s
      timeout: 3s
      retries: 10
      start_period: 5s

  python-app:
    build: .
    depends_on:
      mysql-db:
        condition: service_healthy
    environment:
      MYSQL_HOST: "mysql-db"
      MYSQL_PORT: "3306"
      MYSQL_USER: "root"
      MYSQL_PASSWORD: "123456"
      MYSQL_DB: "test_db"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mysql_data:
```

这份 Compose 里有几处值得多看一眼：

- `python-app` 通过 `build: .` 使用当前目录的 Dockerfile 构建镜像。
- `mysql-db` 使用现成镜像 `mysql:8.0.45`。
- `python-app` 连接 MySQL 时，主机名写 `mysql-db`，不是 `localhost`。
- 容器之间走 Docker 网络，端口用容器内部端口 `3306`。
- `healthcheck` 用来判断 MySQL 是否已经就绪。
- `depends_on.condition: service_healthy` 让 Python 容器等 MySQL 健康后再启动。

这里特别容易误解的是：**容器启动不等于服务就绪。** MySQL 容器起来后，还需要初始化数据目录、启动数据库进程、准备账号和库。没有健康检查时，Python 可能抢先连接，结果就是 `Connection refused`。

接着新建 `test_mysql1.py`，让 Python 容器通过环境变量读取 MySQL 连接信息：

```python
import os
import sys
import time

import pymysql

def get_mysql_conn():
    max_retries = 10
    retry_delay = 2

    for i in range(max_retries):
        try:
            conn = pymysql.connect(
                host=os.getenv("MYSQL_HOST", "localhost"),
                port=int(os.getenv("MYSQL_PORT", 3306)),
                user=os.getenv("MYSQL_USER", "root"),
                password=os.getenv("MYSQL_PASSWORD", "123456"),
                database=os.getenv("MYSQL_DB", "test_db"),
                charset="utf8mb4",
                connect_timeout=3,
            )
            print(f"第 {i + 1} 次尝试：MySQL 连接成功")
            return conn
        except pymysql.err.OperationalError as e:
            print(f"第 {i + 1} 次尝试：MySQL 连接失败 - {e}")
            if i < max_retries - 1:
                time.sleep(retry_delay)
            else:
                raise RuntimeError("重试后仍无法连接 MySQL，请检查容器配置") from e

if __name__ == "__main__":
    conn = None
    cursor = None

    try:
        conn = get_mysql_conn()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE()")
        print(f"当前连接的数据库：{cursor.fetchone()[0]}")

        cursor.execute(
            "CREATE TABLE IF NOT EXISTS test_table "
            "(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50))"
        )
        cursor.execute("INSERT INTO test_table (name) VALUES ('Docker Compose test')")
        conn.commit()

        cursor.execute("SELECT * FROM test_table")
        print("test_table 中的测试数据：", cursor.fetchall())
        print(f"当前 Python 版本：{sys.version}")
    except Exception:
        if conn:
            conn.rollback()
        raise
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
```

这段脚本主要看两点：

- 连接信息来自 Compose 的 `environment`，而不是写死在代码里。
- 即使已经有 `healthcheck`，代码层面保留短重试也更稳，因为数据库、网络、DNS 都可能短暂抖动。

### 3.4 运行和验证 Compose 小案例

如果前面第 2 部分已经启动过单独的 `mysql-db` 容器，需要先停掉并删除它，否则 `9999` 端口可能冲突：

```bash
docker ps
docker stop mysql-db
docker rm mysql-db
```

然后在包含 `docker-compose.yml`、`Dockerfile`、`test_mysql1.py` 的目录下启动：

```bash
docker compose up -d
docker compose ps
docker compose logs python-app
```

如果修改了 Dockerfile 或 Python 依赖，重新构建并启动：

```bash
docker compose up -d --build
```

如果只是想重新执行一次 Python 脚本，可以临时运行：

```bash
docker compose run --rm python-app
```

想进入 MySQL 容器看数据，可以执行：

```bash
docker compose exec mysql-db mysql -uroot -p123456 test_db
```

这个案例跑通后，再看 Dify 的 Compose 文件会轻松很多。Dify 部署也是同样的思路：把一组服务按正确顺序拉起来。

### 3.5 Compose 配置阅读顺序

读 compose 文件不要从第一行硬啃到最后一行。可以按这个顺序看：

1. 看 `services`：这套项目启动哪些服务。
2. 看 `image` / `build`：服务是直接用镜像，还是本地构建。
3. 看 `ports`：哪些服务暴露给宿主机或浏览器。
4. 看 `volumes`：哪些数据、配置、模型目录会持久化或挂载。
5. 看 `environment`：服务启动依赖哪些环境变量。
6. 看 `depends_on`：服务之间的大致启动依赖。
7. 看 `networks`：哪些服务能互相访问，哪些被隔离。

常见字段速查：

| 字段             | 作用                       |
| ---------------- | -------------------------- |
| `image`          | 使用现成镜像               |
| `build`          | 从 Dockerfile 构建镜像     |
| `container_name` | 指定容器名                 |
| `restart`        | 容器异常停止后的重启策略   |
| `environment`    | 注入环境变量               |
| `ports`          | 宿主机端口到容器端口的映射 |
| `volumes`        | 数据持久化或目录挂载       |
| `depends_on`     | 启动顺序依赖               |
| `networks`       | 容器网络隔离与互通         |

读 Dify 的 compose 文件时，可以先画一条线：`nginx -> web/api -> db/redis/vector store`。先知道请求和数据大概怎么流动，再看具体变量，会比直接盯着几百行 YAML 更轻松。

### 3.6 Compose 命令速查

下面命令默认在 `docker-compose.yaml` 所在目录执行。

| 目的                         | 命令                               | 说明                   |
| ---------------------------- | ---------------------------------- | ---------------------- |
| 启动整套服务                 | `docker compose up -d`             | 后台启动               |
| 查看服务状态                 | `docker compose ps`                | 看 Up、healthy、Exited |
| 查看服务日志                 | `docker compose logs -f <服务名>`  | 跟踪日志               |
| 临时停止服务                 | `docker compose stop`              | 不删除容器             |
| 启动已停止的服务             | `docker compose start`             | 不重建容器             |
| 停止并删除容器、网络         | `docker compose down`              | 默认不删 volume        |
| 停止并删除容器、网络、volume | `docker compose down -v`           | 会删除 volume，谨慎    |
| 拉取镜像                     | `docker compose pull`              | 更新镜像               |
| 重新构建镜像                 | `docker compose build <服务名>`    | 本地 build 场景使用    |
| 查看最终配置                 | `docker compose config`            | 用于确认变量展开后配置 |
| 查看服务清单                 | `docker compose config --services` | 只列 service 名        |

最容易混的是 `stop`、`down`、`down -v`：

- `stop`：只是暂停容器，容器还在。
- `down`：删除容器和网络，但默认保留 volume。
- `down -v`：连 volume 一起删，数据库、索引、向量库等数据可能随之消失。

日常排障优先用 `ps`、`logs`、`restart`、`up -d`。除非明确要清空测试环境，否则不要把 `-v` 当成习惯性参数。
