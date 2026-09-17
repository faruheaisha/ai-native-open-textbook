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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/02-tool-management/index.md"
sourceRel: "learn-agent-interview/02-tool-management/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/02-tool-management/index.md"
sourceSha256: "aa8ef11d87c2122215c82572365a04968e18ba073c2f852c7624cc42745ca7d2"
pageSha256: "d6782549078906f82cbe9d3e7bf71e6e17c2e18ba95a5fe1242b792f96595c9c"
contentMode: "local-full"
zh: ""
---

## Q：Agent 调用启动较慢的外部工具时，如何设计异步任务和结果回调？

> 来源：途游 Agent 二面（2026-08-18）【[月之暗面（Moonshot）- Agent 应用开发岗](https://www.nowcoder.com/discuss/926274239747952640)追问：异步任务如何处理？】

**新手答**：“开一个异步线程等待工具完成，完成后通知 Agent。”

**高手答**：

先把工具调用建模为持久任务，而不是占住模型请求或 Web 线程等待。提交阶段生成 `task_id` 和幂等键，记录租户、调用参数摘要、deadline、回调地址与状态版本；工具服务异步启动并执行，状态通过消息队列、Webhook 或事件流回传。编排器收到事件后用 `task_id + event_id` 去重，校验任务版本和剩余预算，再恢复对应 checkpoint。

客户端可以先收到“已受理 + 进度事件”，不必保持原始请求。超时后应取消或隔离迟到结果；工具不支持取消时，至少用 fencing token 防止旧任务回写覆盖新状态。重试只用于幂等、可恢复错误，并设置退避、上限和死信队列。模型负责根据结构化结果决定下一步，任务可靠性由编排器保证。

**差距在哪**：新手把异步等同于线程，高手给出了任务账本、事件协议、幂等、超时和恢复边界。面试官考的是能否把慢工具接入可恢复的分布式工作流。
