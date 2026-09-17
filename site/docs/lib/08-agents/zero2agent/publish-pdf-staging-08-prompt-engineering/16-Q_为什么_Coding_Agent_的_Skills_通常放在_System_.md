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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-prompt-engineering.md"
sourceRel: "publish-pdf/staging/08-prompt-engineering.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/08-prompt-engineering.md"
sourceSha256: "d712b57348415001dc95647a70207bec02aaff7ce2fa002468a87ac72874651a"
pageSha256: "4c54844a28cd25f41c61cec5bb0ac6177b975fa3ad096d7f6056a850962704e6"
contentMode: "local-full"
zh: ""
---

## Q：为什么 Coding Agent 的 Skills 通常放在 System 上下文，而不是用户 Query 中？

> 来源：文心一言/实习一面

**新手答**：“System Prompt 优先级更高，所以模型更听话。”

**高手答**：

Skill 是宿主提供的能力说明和执行约束，不属于用户临时意图。放在 System 层有四个原因：权限边界更清晰，用户不能伪造或覆盖；跨轮次稳定，不必每轮重复拼接；可由 Host 按需披露并统一版本化；更容易与工具 schema、Hooks 和安全规则组合。

但不应把所有 Skill 全量塞进 System。正确做法是 System 只保留 Skill 索引和不可变规则，路由命中后再加载具体 Skill 内容；动态任务参数仍放用户或运行时上下文。这样既保持指令层级，也控制 token 和注意力污染。

**差距在哪**：新手只会说“优先级高”，高手能区分平台能力、用户意图和运行时数据，并解释渐进式披露与版本治理。面试官考的是上下文分层设计。
