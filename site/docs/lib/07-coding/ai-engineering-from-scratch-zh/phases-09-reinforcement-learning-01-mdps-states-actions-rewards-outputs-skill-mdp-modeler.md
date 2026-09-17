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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/09-reinforcement-learning/01-mdps-states-actions-rewards/outputs/skill-mdp-modeler.md"
sourceRel: "phases/09-reinforcement-learning/01-mdps-states-actions-rewards/outputs/skill-mdp-modeler.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/09-reinforcement-learning/01-mdps-states-actions-rewards/outputs/skill-mdp-modeler.md"
sourceSha256: "e3397775fadd73f514697cc5253d81dfc0b88556fcee0e9239488b4568f37fd8"
pageSha256: "e3397775fadd73f514697cc5253d81dfc0b88556fcee0e9239488b4568f37fd8"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a task (control / game / recommendation / LLM fine-tuning), output:

1. State. Exact feature vector or tensor spec. Justify Markov property.
2. Action. Discrete set or continuous range. Dimensionality.
3. Transition. Deterministic, stochastic-with-known-model, or sample-only.
4. Reward. Function and source. Sparse vs shaped. Terminal vs per-step.
5. Discount. Value and horizon justification.

Refuse to ship any MDP where the state is non-Markovian without explicit mention of frame-stacking or recurrent state. Refuse any reward that was not defined in terms of the target outcome. Flag any `γ ≥ 1.0` on an infinite-horizon task. Flag any reward range >100x the typical step reward as a likely gradient-explosion source.
