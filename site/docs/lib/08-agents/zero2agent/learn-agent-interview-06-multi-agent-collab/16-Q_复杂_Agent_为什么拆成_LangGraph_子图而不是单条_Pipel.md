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
pageSha256: "046513cf72a2492ce96133207af639c3fdf76f0b37a7c4c94c40ac755ffd181e"
contentMode: "local-full"
zh: ""
---

## Q：复杂 Agent 为什么拆成 LangGraph 子图而不是单条 Pipeline？子图的状态与 IO 契约如何设计？

> 来源：[小红书/百度 Agent 实习一面](https://www.nowcoder.com/feed/main/detail/e319aadc79a9479397a6661a7f5ca088)（2026-08-24）

**新手答**：“子图更模块化，可以复用；每个子图定义自己的 State，输入输出用 JSON。”

**高手答**：

单 Pipeline 适合步骤固定、失败语义简单的流程；当某个领域内部有循环、条件路由、暂停恢复、独立重试或专属权限时，拆成子图才能形成清晰故障域。拆分边界应围绕稳定业务能力和独立验收标准，而不是“一节点一子图”。如果只是三步确定性转换，子图只会增加状态映射、checkpoint 和调试成本。

父图只持有跨域最小状态，如 `task_id、goal、shared_facts、budget、status`；子图维护自己的私有工作状态，不把草稿、工具原始返回和内部重试计数泄漏给父图。边界通过版本化 typed contract 连接：输入包含目标、已验证证据、权限、deadline 与幂等键；输出使用判别联合区分 `success / need_input / retryable_error / terminal_error`，并携带结果、证据引用和可恢复 checkpoint。共享字段要指定唯一 owner 和 reducer，避免两个子图同时覆盖同一状态。

工程上还要验证契约兼容、超时/取消传播、重试幂等和 checkpoint 迁移。对子图做独立单测与回放，再做父子图契约测试；trace 同时保留父任务 ID、子图 run ID 和状态版本。这样子图可以独立演进、降级和回滚，而父图无需理解其内部节点。

**差距在哪**：新手把子图理解为代码分文件，高手把它当具有私有状态、稳定契约、独立故障域和生命周期的可组合状态机。
