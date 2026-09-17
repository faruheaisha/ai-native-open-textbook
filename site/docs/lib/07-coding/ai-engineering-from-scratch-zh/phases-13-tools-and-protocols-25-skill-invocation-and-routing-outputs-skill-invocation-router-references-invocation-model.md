---
title: "调用模型"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/references/invocation-model.md"
sourceRel: "phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/references/invocation-model.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/references/invocation-model.md"
sourceSha256: "3e91500e166fe35773b485501224390684b3e240fa0810df8b66d01a74690d59"
pageSha256: "3e91500e166fe35773b485501224390684b3e240fa0810df8b66d01a74690d59"
contentMode: "local-full"
zh: ""
---

# 调用模型

| 通道 | 发起者 | 选择方式 | 典型用途 |
|---|---|---|---|
| 显式人工调用 | 用户 | 精确的已发现名称 | 有意选择工作流 |
| 隐式模型或 agent 调用 | 模型或自治 agent | 描述相关性加宿主策略 | 上下文敏感路由 |
| 程序化应用调用 | 产品运行时 | 精确配置名称和目标 allowlist | 确定性产品工作流 |
| Skill 组合 | 另一 skill 或 subagent | 精确目标、调用者身份和深度策略 | 有界工作流依赖 |
| 程序化 harness | 评测运行时 | 精确配置名称和目标 allowlist | 确定性评测 |

人工和模型激活组成 2×2：两者都不能、仅人工、仅模型或两者都可。应用、组合和 harness 激活是独立通道，各自有目标、调用者和深度策略。

隐式路由先按 actor 和宿主扩展判断资格，再按相关性排序。被阻止的高分 skill 不是赢家：从候选集中移除后再评估余下可用项。可用集为空或最高分未到阈值时应弃权。

`user-invocable`、`disable-model-invocation` 等字段可对特定宿主有意义；适配器可以强制执行，但可移植文档不能声称每个运行时都认识同一字段和值。
