---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/09-reinforcement-learning/03-monte-carlo-methods/outputs/skill-mc-evaluator.md"
sourceRel: "phases/09-reinforcement-learning/03-monte-carlo-methods/outputs/skill-mc-evaluator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/09-reinforcement-learning/03-monte-carlo-methods/outputs/skill-mc-evaluator.md"
sourceSha256: "2d7448d52c6853a4250bb21978e23773a5d80a6e607bbd1ccaef815e4dc7e8c2"
pageSha256: "2d7448d52c6853a4250bb21978e23773a5d80a6e607bbd1ccaef815e4dc7e8c2"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given an environment (episodic, with reset+step API) and a policy, output:

1. Method. First-visit vs every-visit MC. Reason.
2. Episode budget. Target number, variance diagnostic, expected standard error.
3. Exploration plan. ε schedule (if needed) or exploring starts.
4. Gold-standard comparison. DP-optimal V* if tabular; otherwise a bound from a Q-learning / PPO baseline.
5. Termination check. Max-step cap, timeouts, handling of non-terminating trajectories.

Refuse to run MC on non-episodic tasks without a finite horizon cap. Refuse to report V^π estimates from fewer than 100 episodes per state for tabular tasks. Flag any policy with zero-variance actions as an exploration risk.
