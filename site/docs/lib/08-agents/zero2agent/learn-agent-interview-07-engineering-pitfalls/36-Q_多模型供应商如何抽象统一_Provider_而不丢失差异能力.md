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
pageSha256: "7f62eb1f40f346ed43574693f5231cd8938e48f07e64897829a17bddb89743bf"
contentMode: "local-full"
zh: ""
---

## Q：多模型供应商如何抽象统一 Provider，而不丢失差异能力？

> 来源：成都晓多科技 Agent 开发岗二面（2026-08-12）

**新手答**：“定义统一的 chat 和 stream 接口，再写适配器。”

**高手答**：先定义最小公共协议：消息、工具调用、流式事件、usage、错误分类和取消；供应商特性通过 capability negotiation 和显式扩展字段暴露，不能硬塞进最低公分母。适配器负责角色、schema、finish reason、错误码和流事件转换；网关再做路由、限流、重试、观测与版本兼容。契约测试同时验证普通文本、并行工具、截断、流式中断和安全拒绝。

**差距在哪**：新手统一函数签名，高手统一语义并保留能力发现与兼容测试。
