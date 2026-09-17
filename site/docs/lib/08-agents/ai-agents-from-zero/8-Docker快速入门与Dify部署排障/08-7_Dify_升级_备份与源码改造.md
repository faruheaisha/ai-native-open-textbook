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
pageSha256: "c22cbc6374a7eab34e14a86de50fc311c23a840db1763a2a9f68fdb8225f6365"
contentMode: "local-full"
zh: ""
---

## 7、Dify 升级、备份与源码改造

Dify 升级不是简单执行 `docker compose pull && docker compose up -d`。它同时牵涉镜像、`.env`、数据库 migration、volume 挂载、插件目录、向量库和前后端版本兼容。

升级前先按这个清单确认一遍：

| 检查项                    | 为什么重要                   | 推荐动作                                    |
| ------------------------- | ---------------------------- | ------------------------------------------- |
| 旧环境是否健康            | 带着旧问题升级，会让排障更乱 | 先看 `docker compose ps` 和 `api` 日志      |
| 数据库是否已备份          | migration 可能改表结构       | 用 `pg_dump` 导出 SQL                       |
| volume / 挂载目录是否确认 | 新版本可能挂到新目录         | 用 `docker inspect` 看 Mounts               |
| `.env` 是否对照新版本     | 新版本可能新增或废弃变量     | 对比 `.env.example` 和 `envs/*.env.example` |
| 是否需要回滚              | 升级失败时要能退回           | 保留旧目录、旧 `.env`、备份文件             |

### 7.1 升级流程

升级前的原则：**先备份，后停服务；先确认数据位置，再启动新版本。**

下面用“旧版本 -> 新版本”的通用流程说明。命令里的容器名、路径和版本号都要按你的环境替换。

Dify 升级不仅是拉取新镜像，还涉及镜像版本、`.env` 配置、数据库 migration、volume 挂载和前后端兼容。任何一个环节没对上，都可能表现为页面打不开、进入 `/install` 或后台任务异常。

**第 1 步：升级前检查**

在旧版本 `docker` 目录执行：

```bash
docker compose ps
docker ps
docker compose logs --tail=100 api
```

先确认旧环境本身是可用的。不要在旧环境已经异常、数据状态不明时直接升级。

如果旧环境已经有报错，先记录当前状态和日志。否则升级失败后，很难判断问题是升级引入的，还是旧环境本来就已经异常。

**第 2 步：确认数据库名**

```bash
docker exec -it docker-db_postgres-1 psql -U postgres -c "\l"
```

常见业务库名是 `dify`。如果你的数据库容器叫 `docker-db-1` 或其他名字，按 `docker ps` 结果替换。

**第 3 步：备份数据库**

```bash
docker exec -t docker-db_postgres-1 pg_dump -U postgres dify > dify_backup.sql
```

建议把备份文件复制到安全位置，不要只放在即将改动的部署目录里。

备份完成后，最好至少确认文件不是 0 字节；重要环境还可以在测试库里试导入一次。没有验证过的备份，只能算“可能有用”。

**第 4 步：停旧版本**

```bash
docker compose down
```

这一步会删除当前 Compose 项目创建的容器和网络，但默认不删除 volume。除非你明确要清空数据，否则不要使用 `docker compose down -v`。

这里用 `down` 是为了让旧容器退出，避免新旧版本同时占用端口或写同一份数据。它不是清库操作，也不应该顺手加 `-v`。

执行后，终端里通常会看到容器和网络被移除：

![执行 docker compose down 后容器和网络被移除的终端输出](/mirror/06/06c9bd3e086770ef00fd042911a54f28879989b7.webp)

可以再看一眼 volume 是否仍然存在：

![docker compose down 后使用 docker volume ls 确认 volume 仍然存在](/mirror/c4/c4449611d24163da203ea04310fa836acd5562da.webp)

**第 5 步：准备新版本**

常见方式是拉取或解压新版本 Dify，然后进入新版本的 `docker` 目录：

```bash
