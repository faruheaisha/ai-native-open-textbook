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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-training-and-data.md"
sourceRel: "publish-pdf/staging/10-training-and-data.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/10-training-and-data.md"
sourceSha256: "72b8ac45ccf488f6af62cdf704acc8a12a82f64f686774cbef90d5410e88bd0d"
pageSha256: "ce5b9b74ccac15cdb0dfd76bd6b83686f06a0be307f37981545ee16b6c8af9ae"
contentMode: "local-full"
zh: ""
---

## Q：Agentic CPT、SFT、RL 三阶段分别训练什么能力？

> 来源：字节跳动/AI Agent 秋招一面

**新手答**：“CPT 学领域知识，SFT 学格式，RL 提升效果。”

**高手答**：

三阶段解决的问题不同：

| 阶段 | 主要数据 | 核心目标 |
|------|----------|----------|
| Agentic CPT | 领域文档、代码、工具说明、交互日志 | 建立领域表征和环境先验 |
| SFT | 高质量示范轨迹 | 学会协议、工具格式、规划和恢复范式 |
| RL | 可执行环境中的在线采样轨迹 | 超越示范，优化任务成功率、成本和安全 |

CPT 不能替代 RAG，它适合稳定、通用的领域模式，不适合频繁变化的事实；SFT 要覆盖成功、澄清和失败恢复轨迹，避免模型只会“顺风局”；RL 的奖励应包含任务完成、工具正确性、效率和安全，并通过 KL 约束防止破坏已有能力。

工程上不是固定三段全做：基座已懂领域且示范足够时可跳过 CPT；没有可靠可验证环境时不要贸然上 RL。每阶段都要用同一套端到端基准验收，避免局部 loss 下降却任务成功率变差。

**差距在哪**：新手只背训练名词，高手能说明每阶段的数据、能力边界、可跳过条件和统一验收标准。面试官考的是 Agent 后训练方案设计。
