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
pageSha256: "bd9e46699d4aa83c83b60a011905d37dbfe8253d90ba3e3c4f03f3ad1c8ddaea"
contentMode: "local-full"
zh: ""
---

## Skill 边界模糊时的工具披露

### Q：对于边界不好定义的场景，Skill 形式不能很好区分场景披露工具，怎么办？

> 来源：阿里暑期Agent算法二面

**新手答**：“那就把所有工具都给模型看呗。”

**高手答**：

当场景边界模糊时，静态的 Skill → 工具映射会失效。解决思路是从“硬规则匹配”转向“动态推理 + 渐进披露”。

**问题本质**：Skill 的核心假设是“场景可以被清晰划分”——每个 Skill 对应一组明确的工具。但真实对话中，用户意图经常在多个 Skill 的边界上（比如“帮我查一下上周的销售数据，然后画个图发给老板”——涉及数据查询、可视化、通信三个 Skill）。

**分层解决方案：**

| 层级 | 策略 | 适用场景 |
|------|------|---------|
| **意图预分类** | LLM 先判断属于哪几个 Skill，按置信度披露 | 意图基本可判但有交叉 |
| **渐进式披露** | 先给核心工具，执行中发现需要就动态追加 | 意图需要多步才能明确 |
| **工具描述自带触发条件** | 在 tool description 中写明“当用户需要 XX 时使用”，让 LLM 自主判断 | 工具间无强耦合 |
| **Fallback 全局工具池** | 设置一批“全场景可用”的通用工具（如搜索、计算） | 兜底 |

**工程实践：**
1. **两阶段路由**：第一阶段用轻量分类器（或规则）粗筛 Top 3 Skill；第二阶段把这些 Skill 的工具合并后送给 LLM 选择
2. **动态工具注册**：Agent 执行中途发现当前工具不够，主动请求“追加工具”——类似人类在做事时发现需要新权限
3. **相似度兜底**：当分类器置信度低于阈值时，用 query 和所有工具描述做 embedding 相似度，取 Top K 直接送给模型

**差距在哪**：面试官考的是你对“Skill 系统设计假设”的理解——Skill 本质是静态场景划分，但现实是模糊的。能说出多阶段路由 + 渐进披露 + 动态追加的组合方案，说明你在生产中遇到过这个问题并做了系统性解决。
