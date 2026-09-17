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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-multi-agent-collab.md"
sourceRel: "publish-pdf/staging/06-multi-agent-collab.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/06-multi-agent-collab.md"
sourceSha256: "45cd341f24a023f5affe2db1b6c5c8527844255ad74a8e55796c4ce86d984b7e"
pageSha256: "ad985d386fb217c31a6b0ae7c0c38e94e9d31e9bd91ebfc381b0af9c464bc1ec"
contentMode: "local-full"
zh: ""
---

## Q：如何按租户、任务和 Agent 层级设置分层并发预算？

> 来源：小红书 AI Agent 开发一面（2026-08-18）

**新手答**：“设置全局最大 Agent 数，超过就排队。”

**高手答**：入口先有租户公平配额，任务级限制总子 Agent、Token、工具并发和 deadline，节点级再按模型/GPU、外部 API 和沙箱资源设置 semaphore。预算随依赖图动态释放，取消向子任务传播；高优任务可抢占只读、可恢复任务，但不能中断不可补偿副作用。监控排队、关键路径、配额拒绝和资源放大系数。

**差距在哪**：新手只有一个数字，高手防止单租户、单任务和单工具分别耗尽系统。
