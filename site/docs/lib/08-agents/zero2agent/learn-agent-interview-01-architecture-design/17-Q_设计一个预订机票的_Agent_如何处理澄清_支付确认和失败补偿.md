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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/01-architecture-design/index.md"
sourceRel: "learn-agent-interview/01-architecture-design/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/01-architecture-design/index.md"
sourceSha256: "27323a2663d0a83175728db159268a6a57cdca2097344c6d6c8c0210cc6da232"
pageSha256: "d6908a215bca7080c70d6d60a730349ec0f14ebd068367bbec88bcab34800be1"
contentMode: "local-full"
zh: ""
---

## Q：设计一个预订机票的 Agent，如何处理澄清、支付确认和失败补偿？

> 来源：百度 Agent 算法岗二面（2026-08-14）

**新手答**：“先搜索航班，选最便宜的，然后调用支付工具。”

**高手答**：先把日期、出发地、舱位、预算、行李和退改偏好补成结构化约束；搜索结果绑定价格与库存快照，向用户展示候选及总价。预订与支付是高风险副作用，必须二次确认具体航班、乘机人和金额，并使用幂等键、预占/确认两阶段和状态查询。支付超时不能直接重试扣款，应先查单；库存失效则释放预占并重新规划。全链路保存订单状态、证据和补偿记录。

**差距在哪**：新手只画顺序流程，高手处理了实时状态、明确确认、幂等和不可逆副作用。
