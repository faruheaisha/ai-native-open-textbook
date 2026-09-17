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
pageSha256: "60b305d31547f375e237034df115af5d6338242b772b3fed7bf7de8f1af9638d"
contentMode: "local-full"
zh: ""
---

## Q：高并发场景下，如何设计 Agent 服务的弹性伸缩策略？

> 来源：阿里淘天智能体开发

**新手答**：“加机器、加副本就行。”

**高手答**：

Agent 服务的伸缩和普通 Web 服务有本质不同——单次请求可能持续数十秒、消耗大量 token、调用多个外部工具：

1. **请求粒度拆分**：将 Agent 执行拆为“调度层”和“执行层”。调度层轻量可快速水平扩展；执行层（LLM 调用 + 工具执行）按资源消耗独立伸缩
2. **异步队列削峰**：高并发时不直接打到 LLM，而是入消息队列（Kafka/SQS），按 LLM 供应商的 RPM/TPM 限制控制消费速率
3. **模型分级降级**：流量高峰时自动将非关键任务降级到小模型（如 Haiku），保障核心任务用大模型（如 Opus）
4. **长连接管理**：Agent 的 SSE 长连接占用资源，需要独立的连接池管理和超时回收策略
5. **成本感知伸缩**：不只看 CPU/内存，还要基于 token 消耗速率和 API 配额做伸缩决策——token burn rate 超阈值时触发限流而非加机器
6. **预热与冷启动**：Agent 服务依赖模型连接池、向量数据库连接等，冷启动慢，需要保留最小实例数 + 预热机制

**差距在哪**：面试官要看你是否理解“Agent 的瓶颈不在 CPU 而在外部依赖（LLM API 限流、工具响应）”——传统的 HPA 按 CPU 扩容在 Agent 场景下几乎无效。
