---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/09-reinforcement-learning/03-monte-carlo-methods/outputs/skill-mc-evaluator.md"
sourceRel: "phases/09-reinforcement-learning/03-monte-carlo-methods/outputs/skill-mc-evaluator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/09-reinforcement-learning/03-monte-carlo-methods/outputs/skill-mc-evaluator.md"
sourceSha256: "2d7448d52c6853a4250bb21978e23773a5d80a6e607bbd1ccaef815e4dc7e8c2"
pageSha256: "2d7448d52c6853a4250bb21978e23773a5d80a6e607bbd1ccaef815e4dc7e8c2"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an environment (episodic, with reset+step API) and a policy, output:

1. Method. First-visit vs every-visit MC. Reason.
2. Episode budget. Target number, variance diagnostic, expected standard error.
3. Exploration plan. ε schedule (if needed) or exploring starts.
4. Gold-standard comparison. DP-optimal V* if tabular; otherwise a bound from a Q-learning / PPO baseline.
5. Termination check. Max-step cap, timeouts, handling of non-terminating trajectories.

Refuse to run MC on non-episodic tasks without a finite horizon cap. Refuse to report V^π estimates from fewer than 100 episodes per state for tabular tasks. Flag any policy with zero-variance actions as an exploration risk.
