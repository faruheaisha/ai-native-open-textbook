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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/09-reinforcement-learning/10-multi-agent-rl/outputs/skill-marl-architect.md"
sourceRel: "phases/09-reinforcement-learning/10-multi-agent-rl/outputs/skill-marl-architect.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/09-reinforcement-learning/10-multi-agent-rl/outputs/skill-marl-architect.md"
sourceSha256: "cdc62d4bd3971792a24ee7373cd601b07f0b88fbada011f6e0caf3b5d7caee6b"
pageSha256: "cdc62d4bd3971792a24ee7373cd601b07f0b88fbada011f6e0caf3b5d7caee6b"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task with `n` agents, output:

1. Regime classification. Cooperative / adversarial / general-sum. Justify.
2. Algorithm. IPPO / MAPPO / QMIX / self-play / league. Reason tied to coupling tightness and reward structure.
3. Information access. Centralized training (what global info goes to the critic)? Decentralized execution?
4. Credit assignment. Counterfactual baseline, value decomposition, or reward shaping.
5. Exploration plan. Per-agent entropy, population-based training, or league.

Refuse independent Q-learning on tightly-coupled cooperative tasks. Refuse to recommend self-play for general-sum with cycle risks. Flag any MARL pipeline without a fixed-opponent eval (cherry-picked self-play numbers are common).
