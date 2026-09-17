---
title: "8 - Docker 快速入门与 Dify 部署排障"
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
pageSha256: "3f859045fb9d08d9942a91f3ff6cef10e51e722cf4edaf99ae2425b8a131afd7"
contentMode: "local-full"
zh: ""
---

# 8 - Docker 快速入门与 Dify 部署排障

第 6 章已经带你在 Windows 上跑过 Coze Studio、Dify、Coze Loop，第 7 章会继续讲企业级大模型部署。本章回头补 Docker 这层基础。后面排查 Dify、迁移服务、升级版本时，经常都要回到 Docker 层看状态、日志和数据挂载。

刚开始做 Dify 私有化部署时，问题经常被简单归成“Dify 装不上”。实际排查下来，卡住的地方往往更基础：镜像和容器分不清，宿主机端口和容器端口分不清，不知道 volume 会不会被删，也看不懂为什么一次启动会拉起一组容器。升级后如果进入初始化页面，问题通常也不在页面本身，而是数据库、挂载目录或 `.env` 没对上。

这一章只抓部署 Dify 和后续实战项目最常用的那条线：镜像怎么交付环境，容器怎么运行服务，Compose 怎么拉起多服务，volume 怎么保存数据，日志和备份怎么辅助排障。

**官方文档与资源**：详见 [工具导航与参考资料索引 - 部署与基础设施](/lib/08-agents/ai-agents-from-zero/工具导航与参考资料索引#部署与基础设施)。

---

## 本篇目录

- [阅读路径](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/01-阅读路径.md)
- [1、为什么要学 Docker](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/02-1_为什么要学_Docker.md)
- [2、Docker 安装：本地 Windows 与服务器 Ubuntu](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/03-2_Docker_安装_本地_Windows_与服务器_Ubuntu.md)
- [3、从单容器到 Compose 多服务编排](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/04-3_从单容器到_Compose_多服务编排.md)
- [4、数据持久化、网络、迁移与危险边界](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/05-4_数据持久化_网络_迁移与危险边界.md)
- [5、把 Docker 知识迁移到 Dify 部署结构](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/06-5_把_Docker_知识迁移到_Dify_部署结构.md)
- [6、Dify 排障：状态、日志、数据与数据库连接](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/07-6_Dify_排障_状态_日志_数据与数据库连接.md)
- [7、Dify 升级、备份与源码改造](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/08-7_Dify_升级_备份与源码改造.md)
- [8、Docker 常用命令速查](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/09-8_Docker_常用命令速查.md)
