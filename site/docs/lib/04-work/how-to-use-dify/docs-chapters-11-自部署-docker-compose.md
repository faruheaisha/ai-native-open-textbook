---
title: "11 自部署 Docker Compose"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/11-自部署-docker-compose.md"
sourceRel: "docs/chapters/11-自部署-docker-compose.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/chapters/11-自部署-docker-compose.md"
sourceSha256: "31ea610bd75ccb538988483c03e4a96339cc5db6f5dfc462f76b2a7a845fb2c5"
pageSha256: "31ea610bd75ccb538988483c03e4a96339cc5db6f5dfc462f76b2a7a845fb2c5"
contentMode: "local-full"
zh: ""
---

# 11 自部署 Docker Compose

## 学习目标

你将理解 Dify 自部署的基本流程、最低要求和常见风险。

## 什么时候需要自部署

考虑自部署的原因：

- 数据需要留在自己的服务器。
- 需要更强的网络和权限控制。
- 需要接入内部模型、数据库或系统。
- 团队需要统一管理。
- 有特殊合规要求。

不建议一开始就自部署的情况：

- 只是学习 Dify。
- 没有服务器维护经验。
- 不知道如何备份和升级。
- 团队还没验证真实需求。

## 官方最低要求

官方 Docker Compose 快速开始文档中，自部署前的最低硬件要求包括：

- CPU >= 2 Core。
- RAM >= 4 GiB。

macOS 使用 Docker Desktop 时，官方建议给 Docker 虚拟机至少 2 个 vCPU 和 8 GiB 内存。Linux 需要 Docker 19.03+ 和 Docker Compose 1.28+。

## 基础部署流程

官方文档的基本流程是：

1. 克隆 Dify 源码，建议使用 GitHub 最新 release tag。
2. 进入 `dify/docker` 目录。
3. 复制 `.env.example` 为 `.env`。
4. 使用 Docker Compose 启动。

示例：

```bash
git clone --branch "$(curl -s https://api.github.com/repos/langgenius/dify/releases/latest | jq -r .tag_name)" https://github.com/langgenius/dify.git
cd dify/docker
cp .env.example .env
docker compose up -d
```

## 会启动哪些服务

官方文档列出的 Docker Compose 启动内容包括核心服务和依赖组件，例如：

- api
- worker
- worker_beat
- web
- plugin_daemon
- weaviate
- db_postgres
- redis
- nginx
- ssrf_proxy
- sandbox

实际服务可能随版本变化，请以当前官方 compose 文件为准。

## 部署后第一件事

不要急着开放公网。先确认：

- 管理员账号是否创建。
- 模型供应商是否配置。
- 文件上传是否正常。
- 知识库索引是否正常。
- 插件服务是否正常。
- 日志是否有错误。

## 生产注意事项

- 配置强密码和访问控制。
- 反向代理启用 HTTPS。
- 定期备份数据库和上传文件。
- 记录当前 Dify 版本。
- 升级前先备份。
- 不要把测试密钥和生产密钥混用。
- 限制公网访问管理入口。

## 常见错误

- 服务器内存太小。
- Windows 下把数据放在非 Linux 文件系统导致性能差。
- `.env` 没改就直接生产使用。
- 没有备份就升级。
- 只备份 compose 文件，没有备份数据库和存储。
