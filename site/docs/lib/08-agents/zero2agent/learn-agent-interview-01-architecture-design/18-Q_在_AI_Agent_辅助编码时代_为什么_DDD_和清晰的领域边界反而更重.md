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
pageSha256: "c66a205a9a17431c9ea510515cb49057a54c763571b6a9e2cac9ba6cd63ec72f"
contentMode: "local-full"
zh: ""
---

## Q：在 AI/Agent 辅助编码时代，为什么 DDD 和清晰的领域边界反而更重要？

> 来源：[地图 Agent 二面](https://www.nowcoder.com/feed/main/detail/0208597586e744c884bdc571dc441fad)（2026-08-24）

**新手答**：“DDD 能让代码结构更清晰，AI 生成代码时更容易理解项目。”

**高手答**：Coding Agent 提高了局部代码产量，却不会自动获得组织内部的业务语义。边界模糊时，它很容易复用名字相近但语义不同的模型、跨层修改数据，或为了让测试通过绕过业务不变量；生成越快，错误耦合扩散也越快。DDD 的价值不是多写几层目录，而是为模型提供机器可读的决策边界。

具体做法是先划分 Bounded Context，让订单、计价、路线规划等上下文各自拥有术语、实体和不变量；跨上下文只通过显式 API、领域事件或防腐层交互。把聚合根的写入规则、允许调用的工具、契约测试和架构依赖规则纳入 Agent 的上下文与验证门禁。这样 Agent 可以在单个上下文内自治修改，跨边界变更则必须展示契约影响、迁移方案并由对应 Owner 审核。

DDD 也不能教条化：简单 CRUD 不必堆砌 Value Object 和 Repository。应把建模成本集中在变化频繁、规则复杂、错误代价高的核心域；支撑域保持简单。衡量标准不是“用了多少模式”，而是 Agent 的变更范围是否可预测、跨域回归是否减少、业务规则能否由测试验证。

**差距在哪**：新手把 DDD 当代码分层，高手看到它为高吞吐的 Coding Agent 提供语义、权限和验证边界。面试官考的是如何用领域模型约束自动化能力，而不是背 DDD 名词。
