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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-eval-and-vision.md"
sourceRel: "publish-pdf/staging/05-eval-and-vision.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/05-eval-and-vision.md"
sourceSha256: "522251cd44ac5841f540eaf4da4f60a49782ca1736e0ab863498790f1cfd6e8e"
pageSha256: "6d5a1797710c17877fd0175f7f1ad55a8c2a5b0842a9f0f9a07120aaff9fba51"
contentMode: "local-full"
zh: ""
---

## Q：Multi-Agent 出现 Badcase 时，如何定位责任 Agent，并判断是否需要 SFT？

> 来源：字节/Agent 开发二面

**新手答**：“查看日志找到出错的 Agent，收集数据做微调。”

**高手答**：

先把端到端失败拆成可观测的责任链：路由、规划、检索、工具、子 Agent 输出、聚合与验证。每个节点保存输入版本、输出、模型与 Prompt 版本、工具结果和局部评分，通过 trace 回放找到第一个偏离预期的节点，而不是把最终失败归给最后一个 Agent。

是否 SFT 要按根因决策：

- Prompt 或 schema 能稳定修复，且错误模式少：先改约束与验证器。
- 知识缺失或证据召回错误：修 RAG，不做 SFT。
- 工具不稳定或状态污染：修工程链路。
- 同类决策错误高频、边界稳定、已有足够高质量轨迹：才考虑 SFT。

SFT 后必须在责任 Agent 的局部集和端到端回归集同时验证，防止局部指标提升却破坏协作协议。

**差距在哪**：新手看到 badcase 就微调，高手先做首错点归因，再区分 Prompt、RAG、工具和模型能力问题。面试官考的是评测驱动的优化决策，而不是训练冲动。
