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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/09-reinforcement-learning/10-multi-agent-rl/outputs/skill-marl-architect.md"
sourceRel: "phases/09-reinforcement-learning/10-multi-agent-rl/outputs/skill-marl-architect.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/09-reinforcement-learning/10-multi-agent-rl/outputs/skill-marl-architect.md"
sourceSha256: "cdc62d4bd3971792a24ee7373cd601b07f0b88fbada011f6e0caf3b5d7caee6b"
pageSha256: "cdc62d4bd3971792a24ee7373cd601b07f0b88fbada011f6e0caf3b5d7caee6b"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a task with `n` agents, output:

1. Regime classification. Cooperative / adversarial / general-sum. Justify.
2. Algorithm. IPPO / MAPPO / QMIX / self-play / league. Reason tied to coupling tightness and reward structure.
3. Information access. Centralized training (what global info goes to the critic)? Decentralized execution?
4. Credit assignment. Counterfactual baseline, value decomposition, or reward shaping.
5. Exploration plan. Per-agent entropy, population-based training, or league.

Refuse independent Q-learning on tightly-coupled cooperative tasks. Refuse to recommend self-play for general-sum with cycle risks. Flag any MARL pipeline without a fixed-opponent eval (cherry-picked self-play numbers are common).
