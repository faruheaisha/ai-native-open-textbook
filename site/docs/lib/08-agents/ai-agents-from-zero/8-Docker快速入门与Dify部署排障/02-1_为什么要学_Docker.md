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
pageSha256: "c94e9d4a890c5f4419c51887ee7b7ca39402faabe98e7dcb5e5bd93c6a1916b8"
contentMode: "local-full"
zh: ""
---

## 1、为什么要学 Docker

### 1.1 环境不一致的问题

在没有 Docker 之前，部署一个项目往往不是“把代码放到服务器上”这么简单。

开发电脑上能跑，测试环境可能报错；测试环境能跑，生产服务器又缺少依赖；换一台机器，就要重新安装 Python、Node.js、数据库、系统库、驱动、配置文件。项目越多，版本越多，环境差异就越难控制。

Docker 解决的就是这个老问题：**把应用和运行环境一起打包，换一台机器也尽量按同一种方式运行**。

放到 Dify、RAG 或智能体项目里，这个问题会更具体。你在浏览器里看到的是一个页面，实际运行时还会涉及**后端接口、后台任务、数据库、Redis、向量库、Nginx、Sandbox、插件服务**等组件。它们的版本、端口、数据目录和启动顺序只要有一处没对上，排障就很容易跑偏。

Docker 的价值在这里很明确：把这些组件放进一套相对固定的部署流程里。先让环境能稳定复现，再谈迁移、升级和排障。

### 1.2 Docker 是什么

Docker 是一个开源的应用容器引擎，底层主要基于 Go 语言开发。你可以把它理解成一个“打包并运行环境”的工具：把应用、依赖、配置和运行环境放进一个轻量、可移植、相对隔离的容器里。

Docker 官方曾经用一句话概括它的目标：

```text
Build, Ship and Run Any App, Anywhere
```

它强调的是构建、分发、运行这一整条链路。一些教程里说的“一次封装，到处运行”，讲的就是这个意思。

和手工安装环境相比，Docker 的价值不只是少装几个软件，而是把应用交付从零散的安装步骤变成可复制的流程：

| 能力     | 说明                                         | 课程中的例子                                      |
| -------- | -------------------------------------------- | ------------------------------------------------- |
| 可移植性 | 同一套镜像可以在本地、测试环境、服务器上运行 | 本地跑通的 MySQL / Redis / 向量库迁到 Ubuntu      |
| 隔离性   | 不同容器有各自的进程、文件系统和依赖         | Dify 的 `api`、`worker`、`redis` 互不直接污染环境 |
| 低开销   | 容器共享宿主机内核，通常比完整虚拟机更轻     | 一台机器上同时跑多个基础服务                      |
| 可伸缩性 | 多实例服务可以更容易复制和扩展               | 后续生产部署中扩展 worker 处理后台任务            |
| 可复现性 | 环境由镜像、Compose、环境变量描述            | 新同学拉起同一套 Dify 环境，排障口径一致          |

当然，Docker 不是万能药。数据库备份、显卡驱动、网络代理、数据权限、云服务器安全组，这些还是要自己处理。但它能把“应用怎么跑”这件事先稳住，这对后面部署 Dify、本地模型和企业级项目很关键。

### 1.3 Docker 和虚拟机的区别

刚接触 Docker 时，可以暂时把它理解成“比虚拟机更轻的运行环境”。这个说法方便入门，但不够准确。

虚拟机会把操作系统也虚拟出来，每个虚拟机都有自己的完整系统；Docker 容器共享宿主机内核，只把应用运行需要的文件、依赖和隔离环境打包起来。

![Docker 与虚拟机在架构层面的区别](/mirror/4d/4d887b8f5f44a027a6b3a3082d647a130a6c6190.webp)

主要看三个区别：

| 对比项   | 虚拟机 VM                        | Docker 容器                        |
| -------- | -------------------------------- | ---------------------------------- |
| 隔离方式 | 虚拟化整套操作系统               | 共享宿主机内核，隔离进程和文件系统 |
| 启动速度 | 通常较慢                         | 通常更快                           |
| 资源占用 | 更高                             | 更低                               |
| 适合场景 | 强隔离、多系统环境、传统基础设施 | 应用交付、开发测试、微服务部署     |

因此，Docker 不是用来替代所有虚拟机的工具。它更适合解决应用交付、环境一致、多服务编排这类问题。

### 1.4 Docker 架构

Docker 是典型的客户端和服务端架构。

你在终端里执行的 `docker` 命令，是 Docker Client；负责创建容器、拉取镜像、管理网络和数据卷的是 Docker Daemon。镜像通常来自 Docker Hub 或其他镜像仓库。

![Docker 客户端、Docker Daemon 与 Registry 的关系](/mirror/2d/2dcadc04fe28b795476826c4b8d7c4150e93de69.webp)

图里重点画出了四个对象：客户端、Docker 主机、镜像仓库、容器。为了后面能读懂 Dify 的 Compose 文件，这里再把 volume 和 Compose 一起补进来：

| 对象                                      | 和谁发生关系                       | 关系说明                                                     |
| ----------------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| Docker Client（Docker 客户端）            | Docker Daemon                      | 终端里的 `docker` 命令会把操作请求发送给 Docker Daemon       |
| Docker Daemon（Docker 守护进程 / 服务端） | Registry、Image、Container、Volume | 负责拉取镜像、创建容器、管理网络和数据卷                     |
| Registry（镜像仓库）                      | Image                              | 存放和分发镜像，例如 Docker Hub 或企业私有仓库               |
| Image（镜像）                             | Container                          | 容器基于镜像创建并运行；一个镜像可以启动多个容器             |
| Container（容器）                         | Image、Volume、Network             | 运行应用进程，并把需要持久化的数据写入 volume 或挂载目录     |
| Volume（数据卷）                          | Container                          | 保存数据库、上传文件、索引等数据，通常独立于容器生命周期     |
| Docker Compose（多容器编排工具）          | Image、Container、Volume、Network  | 用一份 YAML 把镜像、容器、数据卷、网络和环境变量统一描述出来 |

所以执行一条命令时，要知道它在操作谁：

- `docker pull`：从仓库拉镜像。
- `docker run`：基于镜像创建并启动容器。
- `docker ps`：查看容器。
- `docker images`：查看镜像。
- `docker volume ls`：查看数据卷。
- `docker compose up -d`：按配置启动一组服务。

### 1.5 镜像、容器、仓库、数据卷

| 词              | 可以这样理解                 | 常见例子                                     |
| --------------- | ---------------------------- | -------------------------------------------- |
| Docker Engine   | 运行容器的引擎               | Docker Desktop、服务器上的 Docker 服务       |
| 镜像 Image      | 应用的运行模板，像安装包     | `mysql:8.0.45`、`postgres:15-alpine`         |
| 容器 Container  | 镜像运行后的实例             | `mysql-db`、`docker-api-1`                   |
| 仓库 Repository | 存放和下载镜像的平台         | Docker Hub、企业私有镜像仓库                 |
| 数据卷 Volume   | 独立于容器生命周期的数据存储 | `mysql_data`、`postgres_data`                |
| Dockerfile      | 自定义镜像的构建脚本         | `FROM python:3.12`                           |
| Docker Compose  | 用一份 YAML 管理一组容器     | `docker-compose.yaml`                        |
| bind mount      | 把宿主机目录挂到容器里       | `./volumes/db/data:/var/lib/postgresql/data` |

可以这样理解：**镜像负责提供程序，容器负责把程序跑起来，仓库负责分发镜像，volume 负责保存数据，Compose 负责把一组容器编排起来。**

### 1.6 Dockerfile 和 Compose

Dockerfile 和 Compose 经常一起出现，但它们解决的问题不同。

**Dockerfile** 负责构建镜像。比如你想做一个包含 Python 3.12、依赖包和业务脚本的环境，就写 Dockerfile，让 Docker 自动构建。

**Docker Compose** 负责运行一组服务。比如一个项目需要同时启动 MySQL、Python 应用、Redis、Nginx，就用 `docker-compose.yaml` 把它们的镜像、端口、环境变量、网络和数据卷写清楚。

后面 Dify 的部署正是这个思路：官方已经帮我们准备好镜像和 Compose 文件，我们执行 `docker compose up -d`，就能把 web、api、worker、数据库、Redis、向量库、nginx 等服务一起拉起来。
