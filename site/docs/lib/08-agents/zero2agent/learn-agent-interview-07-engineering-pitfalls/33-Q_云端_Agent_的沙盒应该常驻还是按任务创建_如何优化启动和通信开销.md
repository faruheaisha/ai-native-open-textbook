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
pageSha256: "d6cd9372e0f34e6853156548ff8ae54660c2d48a92c74c49f83c67cb9ac5a9c5"
contentMode: "local-full"
zh: ""
---

## Q：云端 Agent 的沙盒应该常驻还是按任务创建？如何优化启动和通信开销？

> 来源：顺极 Agent 开发二面（2026-08-23）

**新手答**：“常驻更快，按任务创建更安全，看业务选择。”

**高手答**：

默认采用“按任务隔离、池化复用”的混合方案：高风险或跨租户任务创建一次性沙盒，任务结束后销毁；同一租户的低风险连续任务可在短 TTL 内复用预热实例，但必须清理工作区、凭据、网络连接和进程树。不能为了冷启动把不同租户放进同一可写环境。

启动优化包括预拉镜像、分层快照、预热池和惰性挂载；通信只传结构化事件和对象存储引用，避免反复复制大文件。调度器要设置租户配额、并发预算和背压，沙盒用租约与心跳防止泄漏。验收同时看 P95 启动时间、任务成功率、隔离逃逸、空闲成本和销毁完整率。

**差距在哪**：新手把问题当成速度二选一，高手同时处理隔离边界、冷启动、资源池、数据清理和成本。面试官考的是能否把执行沙盒做成可运营的多租户基础设施。
