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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/06-multi-agent-collab/index.md"
sourceRel: "learn-agent-interview/06-multi-agent-collab/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/06-multi-agent-collab/index.md"
sourceSha256: "5ee244b67f4d348fad5285b36ca146b5ff0d9717e0f3b855e900f08593dbf592"
pageSha256: "fb0916566f894017396bd2d35d05568d06361fb6b4f60bedd28c1a5147d80f7f"
contentMode: "local-full"
zh: ""
---

## Q：如何按租户、任务和 Agent 层级设置分层并发预算？

> 来源：小红书 AI Agent开发一面【[顺极 Agent 开发二面](https://www.nowcoder.com/feed/main/detail/93a26b84a6634558b7228bf350c709b5)追问：模型配额、CPU/内存、工具与依赖图如何共同决定上限】

**新手答**：“设置全局最大 Agent 数，超过就排队。”

**高手答**：入口先有租户公平配额，任务级限制总子 Agent、Token、工具并发和 deadline，节点级再按模型/GPU、外部 API 和沙箱资源设置 semaphore。预算随依赖图动态释放，取消向子任务传播；高优任务可抢占只读、可恢复任务，但不能中断不可补偿副作用。监控排队、关键路径、配额拒绝和资源放大系数。

并发上限应取多类资源预算中的最紧约束，而不是写死一个 `max_subagents`：模型端看 RPM/TPM 和在途 Token，计算端看 CPU、内存与沙箱容量，工具端看连接池和外部 API 限额，任务端看 DAG 的就绪节点和关键路径。没有依赖的任务才允许 fan-out；下游尚未就绪时提前启动 Agent，只会占住上下文和连接。运行时根据实测服务时间和排队长度调节许可，但总预算、deadline 和租户公平性仍由确定性调度器控制。

**差距在哪**：新手只有一个数字，高手防止单租户、单任务和单工具分别耗尽系统。
