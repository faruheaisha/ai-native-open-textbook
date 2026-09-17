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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-engineering-pitfalls.md"
sourceRel: "publish-pdf/staging/07-engineering-pitfalls.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/07-engineering-pitfalls.md"
sourceSha256: "7be5d79d7f9b134845ed49bebe8aa81acea85d81cc9c8aa99f6133ad085da81e"
pageSha256: "fab4c45306beb14bc31e2ea1adf0566cd877ea5ef5b4efe9e41ff31f1ac5a7a4"
contentMode: "local-full"
zh: ""
---

## Q：Redis 在 Agent 系统中适合承担哪些职责，哪些数据不应只放 Redis？

> 来源：点点互动/Agent开发秋招一面

**新手答**：“Redis 可以缓存对话和工具结果，提高速度。”

**高手答**：

Redis 适合高频、短生命周期、允许重建的数据：会话热状态、短期记忆窗口、工具结果缓存、幂等键、限流计数器、分布式锁、任务队列和流式事件。设计时必须为 key 加租户与会话命名空间，设置 TTL，并明确缓存穿透、击穿和热 key 的保护策略。

不应只放 Redis 的数据包括：审计日志、长期用户事实、不可丢的工作流 checkpoint、训练反馈和计费记录。这些需要持久数据库或对象存储作为事实源，Redis 只做热缓存或加速层。否则淘汰、过期、故障切换都可能造成状态不可恢复。

典型分层是：`Redis（热状态/协调） + PostgreSQL（事实与事务） + 向量库（语义记忆） + 对象存储（大结果）`。关键不是“用了 Redis”，而是每类状态的持久性、一致性和恢复目标是否匹配。

**差距在哪**：新手把 Redis 当万能高速数据库，高手能按生命周期、一致性和可恢复性划分职责。面试官考的是 Agent 状态工程，而不是 Redis 数据类型背诵。
