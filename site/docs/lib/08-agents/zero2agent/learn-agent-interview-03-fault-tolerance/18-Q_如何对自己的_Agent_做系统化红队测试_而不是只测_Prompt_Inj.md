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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/03-fault-tolerance/index.md"
sourceRel: "learn-agent-interview/03-fault-tolerance/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/03-fault-tolerance/index.md"
sourceSha256: "ec931d48d76195508909df9d726fa4662052593581a0a4b80cae3e9b5dc97699"
pageSha256: "08e6c09a450b18b2ce51d3a427f439886f4db34b603cc859f3a80128e52a4ba2"
contentMode: "local-full"
zh: ""
---

## Q：如何对自己的 Agent 做系统化红队测试，而不是只测 Prompt Injection？

> 来源：中兴 AI 大模型算法岗一面（2026-08-10）【阿里 Agent Infra 一面题库追问：Prompt Injection 的 Infra 防线】

**新手答**：“准备一些越狱提示词，看模型会不会违规。”

**高手答**：先按资产、信任边界和副作用建立威胁模型，再覆盖直接/间接注入、越权读写、工具投毒、参数走私、跨租户泄漏、秘密外传、循环耗尽和供应链篡改。测试应在隔离环境执行，记录攻击前置条件、实际工具轨迹、外部副作用和检测信号；同时验证权限网关、沙箱、审批、审计与熔断，而不是只看模型回复。成功攻击进入冻结回归集，修复后做同类变体测试。

**差距在哪**：新手测试文本，高手测试完整系统的能力边界和纵深防御。
