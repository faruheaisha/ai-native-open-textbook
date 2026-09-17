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
pageSha256: "0d70e490035df86e2802e1b76c1469cabe29b587a9cee3c81fd8b8c1fcae0958"
contentMode: "local-full"
zh: ""
---

## 2、Docker 安装：本地 Windows 与服务器 Ubuntu

### 2.1 先判断你要装在哪里

学习 Docker 时，通常会碰到两种环境：

| 环境             | 推荐安装方式                 | 适合场景                                 |
| ---------------- | ---------------------------- | ---------------------------------------- |
| Windows 本地电脑 | Docker Desktop + WSL 2       | 学习、演示、跑 Dify / Coze Studio 本地版 |
| Ubuntu 云服务器  | Docker Engine + Compose 插件 | 企业部署、远程服务、后续项目上线         |

如果只是跟着本章学习，先装 Docker Desktop 就够了；如果已经在准备云服务器部署，可以直接跳到第 2.10 小节。

两种环境里的常用命令差不多，差别主要在安装方式、文件路径、权限和镜像源配置。

### 2.2 Windows 安装前准备

Windows 本地部署 Coze Studio、Dify、Coze Loop 这类平台时，最常用的方案是 **Docker Desktop + Docker Compose**。

安装前先看几件事：

- Windows 10 / Windows 11 系统。
- 已开启虚拟化功能。大部分新电脑默认开启，如果 Docker Desktop 启动时报虚拟化错误，再进入 BIOS 检查。
- 可以正常使用 WSL 2。Docker Desktop 在 Windows 上通常依赖 WSL 2 来运行 Linux 容器。
- 本机网络能访问 Docker 官网和镜像仓库；如果镜像拉取慢，后面第 4.4 小节再处理。

本章不要求你提前安装 MySQL、Redis、Nginx。后面会直接用 Docker 镜像启动。

Windows 上可以按下面顺序检查：

| 检查项   | 怎么看                                   | 说明                                                   |
| -------- | ---------------------------------------- | ------------------------------------------------------ |
| 系统版本 | `Win + R` 输入 `winver`                  | 建议 Windows 10 2004 及以上，Windows 11 更省心         |
| 虚拟化   | 任务管理器 -> 性能 -> CPU -> 虚拟化      | 如果未启用，需要进 BIOS 开启 Virtualization Technology |
| WSL 功能 | “启用或关闭 Windows 功能”                | 勾选“适用于 Linux 的 Windows 子系统”和“虚拟机平台”     |
| WSL 内核 | Docker Desktop 启动提示或 `wsl --status` | 旧环境可能需要更新 WSL 内核                            |

虚拟化可以在任务管理器里看，确认状态显示为“已启用”：

![在任务管理器中确认 CPU 虚拟化已启用](/mirror/4c/4c9c34c99aa6367f817509cee67de133fa5db4ee.png)

WSL 2 相关功能可以在 Windows 功能里勾选。不同 Windows 版本的显示文字可能略有差异，重点是启用 Virtual Machine Platform 和 WSL：

![在 Windows 功能中启用虚拟机平台和适用于 Linux 的 Windows 子系统](/mirror/fe/fe12f77be2288f650e78f5b04931ac341d714000.png)

如果需要用命令启用 WSL 和虚拟机平台，可以用管理员 PowerShell 执行：

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

执行后需要重启电脑。WSL 内核可从 Microsoft WSL 发布页下载更新包；如果是 ARM 架构设备，要选择对应架构的安装包。

### 2.3 下载 Docker Desktop

进入 Docker Desktop 官方下载页：

```text
https://www.docker.com/products/docker-desktop/
```

选择 Windows 版本下载安装包。

![Docker Desktop 官方下载页面](/mirror/f6/f643c33952a87d9752784928d4278a335ca11886.webp)

### 2.4 安装并启动 Docker Desktop

双击安装包，按提示完成安装即可。安装过程中如果看到 WSL 2、桌面快捷方式等选项，保持默认配置即可。

![Docker Desktop 安装设置界面](/mirror/cd/cdaf44d4d4efa8e3de9944e02b8484e20329f7da.webp)

安装完成后打开 Docker Desktop，确认状态栏显示 **Running**。

![Docker Desktop 成功启动后的主界面](/mirror/63/63345a8d061c80acdbe9c58d2596cd5ff0b509c7.webp)

如果 Windows 提示需要安装“适用于 Linux 的 Windows 子系统”，按提示装完，再重新打开 Docker Desktop。

### 2.5 验证 Docker 环境

打开 PowerShell、CMD、Windows Terminal 或 Docker Desktop 自带终端，依次执行：

```bash
docker --version
docker compose version
docker run hello-world
```

能正常输出版本，并且 `hello-world` 能运行，说明 Docker 基础环境可用。

Windows + Docker Desktop 场景下，官方也建议把 Linux 容器使用的源码和挂载数据放在 WSL 的 Linux 文件系统里，而不是长期放在 Windows 文件系统路径下。这样通常会减少文件同步、权限和性能问题。

如果 Docker Desktop 安装失败、启动异常，或者你想彻底重装，可以按下面思路清理。注意，这会删除 Docker Desktop 管理的镜像、容器和数据，执行前先确认没有重要数据：

```powershell
# 1. 停止所有 WSL 实例
wsl --shutdown

# 2. 查看 WSL 发行版
wsl --list --verbose

# 3. 删除 Docker Desktop 相关发行版
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data
```

还可以手动检查这些残留目录：

```text
C:\Users\你的用户名\.docker
C:\Users\你的用户名\AppData\Local\Docker
C:\Program Files\Docker
```

普通卸载只需要在 Windows “应用和功能”里卸载 Docker Desktop；前面这种清理更接近“彻底重装”，不要把它当成日常排障第一步。

### 2.6 启动 MySQL 容器

先拉取 MySQL 镜像：

```bash
docker pull mysql:8.0.45
```

查看本地镜像：

```bash
docker images
```

![使用 docker images 查看本地 MySQL 镜像](/mirror/98/980c2f1fb36918b46bacf2079b118b02e05b61de.webp)

启动一个 MySQL 容器：

```bash
docker run -d --name mysql-db -p 9999:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0.45
```

这条命令里最重要的是几个参数：

| 参数                            | 含义                                            |
| ------------------------------- | ----------------------------------------------- |
| `-d`                            | 后台运行，不占用当前终端                        |
| `--name mysql-db`               | 给容器起名，后续可以用这个名字 stop、logs、exec |
| `-p 9999:3306`                  | 宿主机 9999 端口映射到容器内 3306 端口          |
| `-e MYSQL_ROOT_PASSWORD=123456` | 给 MySQL 容器注入环境变量，设置 root 密码       |
| `mysql:8.0.45`                  | 要运行的镜像名和版本                            |

查看容器：

```bash
docker ps
```

![使用 docker ps 查看正在运行的 MySQL 容器](/mirror/40/405f7ba579cf0bdc8966ab669111d7bc62bf9b7b.webp)

这里有两个地址容易混：

- 本机访问 MySQL：`127.0.0.1:9999`
- 容器内部 MySQL 实际监听：`3306`

也就是 `-p 9999:3306` 左边给宿主机访问，右边给容器内部服务使用。

### 2.7 Python 连接 MySQL

如果本机已经有 Python 环境，可以安装依赖：

```bash
pip install pymysql cryptography
```

新建 `test_mysql.py`：

```python
import pymysql

conn = pymysql.connect(
    host="127.0.0.1",
    port=9999,
    user="root",
    password="123456",
    database="mysql",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor,
)

with conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT VERSION() AS version")
        row = cursor.fetchone()
        print(f"MySQL 版本：{row['version']}")

print("Python 已成功连接 Docker 中的 MySQL")
```

运行：

```bash
python test_mysql.py
```

![本机 Python 脚本成功连接 Docker 中的 MySQL](/mirror/9e/9ec09d88bf1502afec85a754dc4d8f0da47cc54d.webp)

这个小案例不是为了讲 MySQL，而是先把 Docker 的基本动作串起来：

1. 镜像从仓库下载。
2. 容器基于镜像运行。
3. 宿主机通过端口映射访问容器服务。

后面访问 Dify 的 nginx、PostgreSQL、Redis，用的仍然是这套逻辑。

### 2.8 从 docker ps 区分镜像和容器

执行：

```bash
docker ps
```

命令行里看到的容器列表大致是这样的：

![docker ps 输出中 IMAGE 列与 NAMES 列的区别](/mirror/f6/f65820eb7cbbc0f1786d0ebc73a021af4d7c6e99.webp)

输出里常见两列：

| 列    | 含义   | 示例                                                  |
| ----- | ------ | ----------------------------------------------------- |
| IMAGE | 镜像名 | `postgres:15-alpine`、`langgenius/dify-api:<version>` |
| NAMES | 容器名 | `docker-db_postgres-1`、`docker-api-1`                |

看输出时可以先抓两个特征：

- 带 `:tag` 的通常是镜像，例如 `redis:6-alpine`。
- 像 `docker-api-1`、`mysql-db`、`qdrant` 这种运行中的名字通常是容器。

Docker Desktop 里也能直接区分：

![Docker Desktop 中的 Containers 列表](/mirror/26/266dc8aceee2dee82bd12b43e621d9e8a9e860bd.webp)

![Docker Desktop 中的 Images 列表](/mirror/2d/2dd616b2b0bc254dce4af32d6bb7b3a3caa9c1ac.webp)

一个镜像可以启动多个容器。Dify 的 `api`、`worker`、`worker_beat` 就可能使用同一个后端镜像，只是启动模式不同。

### 2.9 基础命令速查

| 目的              | 命令                          | 说明                     |
| ----------------- | ----------------------------- | ------------------------ |
| 查看 Docker 版本  | `docker --version`            | 检查 Docker CLI 是否可用 |
| 查看 Compose 版本 | `docker compose version`      | 检查 Compose v2 是否可用 |
| 拉取镜像          | `docker pull mysql:8.0.45`    | 从镜像仓库下载镜像       |
| 查看镜像          | `docker images`               | 查看本地镜像             |
| 启动容器          | `docker run ...`              | 基于镜像创建并启动容器   |
| 查看运行中容器    | `docker ps`                   | 只看运行中的容器         |
| 查看全部容器      | `docker ps -a`                | 包括已停止容器           |
| 查看日志          | `docker logs -f mysql-db`     | 跟踪某个容器日志         |
| 进入容器          | `docker exec -it mysql-db sh` | 进入容器内部             |
| 停止容器          | `docker stop mysql-db`        | 停止运行中的容器         |
| 删除容器          | `docker rm mysql-db`          | 删除已停止的容器         |
| 删除镜像          | `docker rmi mysql:8.0.45`     | 删除本地镜像             |

日常排障时，先看 `docker ps`，再看 `docker logs`。在没确认数据位置之前，先别急着删除容器或清理 volume。

### 2.10 Ubuntu 下 Docker 安装与卸载

本地学习阶段通常用 Windows + Docker Desktop；正式上服务器时，更常见的是 Ubuntu + Docker Engine。第 7 章的云服务器部署、后面的电商问数和深度研搜项目，都会先遇到同一个前提：服务器上要有可用的 Docker 和 Compose。

Ubuntu 上安装 Docker，建议优先参考 Docker 官方文档。下面给出课程里最常用的一条路径，适合新服务器初始化：

```bash
# 1. 卸载系统里可能存在的旧版本
sudo apt remove -y docker docker-engine docker.io containerd runc

# 2. 按 Docker 官方 Ubuntu 安装文档配置仓库并安装
# 官方文档：https://docs.docker.com/engine/install/ubuntu/

# 3. 验证 Docker 和 Compose
docker --version
docker compose version
```

如果执行 `docker` 命令时提示权限不足，可以把当前用户加入 `docker` 用户组：

```bash
sudo usermod -aG docker $USER
```

这条命令执行完后，需要退出当前 SSH 会话并重新登录，权限才会生效。不要看到命令没立刻生效就反复执行。

服务器拉镜像慢时，可以配置 Docker Engine 镜像源。Ubuntu 上配置文件通常是：

```bash
sudo vim /etc/docker/daemon.json
```

示例配置：

```json
{
  "registry-mirrors": [
    "https://docker.xuanyuan.me",
    "https://docker.1ms.run",
    "https://docker.m.daocloud.io"
  ]
}
```

保存后重启 Docker：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
docker info
```

在 `docker info` 输出中看到 `Registry Mirrors`，说明配置已经被 Docker Engine 读取。

镜像源是易变资源，今天可用不代表一直可用。生产环境更稳的方式是使用企业私有镜像仓库、云厂商容器镜像服务，或者提前做离线镜像包。

如果 Docker 安装失败、版本混乱，或你确实要彻底清理服务器上的 Docker，可以按下面方式卸载。注意，这会删除本机容器、镜像和 volume 数据，执行前先确认没有重要服务运行：

```bash
sudo systemctl stop docker
sudo apt remove -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
docker --version
```

如果只是普通升级或排障，不要轻易删除 `/var/lib/docker`。这个目录里可能保存着数据库 volume、向量库数据和上传文件。
