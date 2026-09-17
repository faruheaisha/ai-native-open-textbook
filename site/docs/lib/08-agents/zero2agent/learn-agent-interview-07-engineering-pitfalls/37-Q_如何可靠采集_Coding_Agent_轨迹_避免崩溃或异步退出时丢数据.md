---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceRel: "learn-agent-interview/07-engineering-pitfalls/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceSha256: "0214669d4cd53d5c31df35ebc9b82df54b029eeebc1ad4358ad54c8ee17cbace"
pageSha256: "cff99b39c2759014d58b415963e08e91dcc4243a36af3e9bf0cde4b43b4e04a8"
contentMode: "local-full"
zh: ""
---

## Q：如何可靠采集 Coding Agent 轨迹，避免崩溃或异步退出时丢数据？

> 来源：MiniMax 平台研发一面（2026-08-20）

**新手答**：“每一步写日志，任务结束后上传。”

**高手答**：轨迹以 append-only 事件实时写入，事件带 run/step/event ID、因果关系和版本；本地 WAL 或持久队列先确认，再异步汇聚。模型、工具、文件 diff、测试和人工操作分别记录引用，敏感内容分级脱敏。任务结束只是写终止事件，不是唯一上传时机；采集器崩溃可按 offset 重放，服务端按 event ID 幂等去重，并监控缺口和迟到事件。

**差距在哪**：新手依赖正常结束，高手把轨迹采集做成可恢复的数据管道。
