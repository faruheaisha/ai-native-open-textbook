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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-tool-management.md"
sourceRel: "publish-pdf/staging/02-tool-management.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/02-tool-management.md"
sourceSha256: "ff29c62f7add4777020864a28d5f388f5a1eb17b853650aa8e6eba538c7c00c1"
pageSha256: "efa00c0d45ad1e4227c57af70b7145f348ad64aa6ba76f399d51e40e0f4182a7"
contentMode: "local-full"
zh: ""
---

## Q：MCP 工具治理为什么需要审计？应该审计哪些证据？

> 来源：拓竹 AI Agent 算法一面（2026-08-18）

**新手答**：“记录谁调用了哪个 MCP 工具和参数。”

**高手答**：审计链应关联真实用户、Agent/run、Server 身份与版本、工具 schema、授权 scope、规范化参数、策略判定、结果摘要、外部副作用和审批证据。敏感内容脱敏但保留哈希与可验证引用；读写、高风险和跨租户调用使用不同保留期与告警。审计日志写入不可由模型修改的存储，并支持从业务对象反查调用链。

**差距在哪**：新手做访问日志，高手建立责任归属、供应链版本和副作用证据链。
