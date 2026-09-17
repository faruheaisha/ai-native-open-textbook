---
title: "Skill 调用路由器"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/SKILL.md"
sourceRel: "phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/SKILL.md"
sourceSha256: "286d0d158e185b08f3cf4e74852b2fc81a87c708fafa087817cbcb8a76785d17"
pageSha256: "286d0d158e185b08f3cf4e74852b2fc81a87c708fafa087817cbcb8a76785d17"
contentMode: "local-full"
zh: ""
---

# Skill 调用路由器

当宿主需要可审计的激活策略，而不是一个没有区分的 `invocable` 标志时使用。

1. 阅读 `references/invocation-model.md`，并归类请求通道。
2. 查看 `assets/host-policy.json`；它是适配器配置示例，不是可移植标准。
3. 运行 `python3 scripts/simulate_invocation.py --policy assets/host-policy.json --actor ACTOR --name NAME --description DESCRIPTION --query QUERY [--explicit-name NAME] [--caller-name NAME] [--depth N] [--user-invocable true|false] [--disable-model-invocation true|false]`。
4. 对人工、应用、skill 或 harness 请求，要求精确的已发现名称和该通道的 allowlist。
5. 对 skill 调用者，还要求调用者身份、无环目标和有界组合深度。
6. 对模型或自治 agent 请求，排除 actor 或已识别宿主扩展使其不具资格的候选项。
7. 只为其余描述打分；选最强的合格匹配，若没有候选项过阈值则弃权。
8. 返回包含 adapter、通道、分数和策略原因的 JSON 决策。

激活只会加载指令；它不会批准工具、文件系统变更、网络访问、secret 使用或 bundle 中的脚本。
