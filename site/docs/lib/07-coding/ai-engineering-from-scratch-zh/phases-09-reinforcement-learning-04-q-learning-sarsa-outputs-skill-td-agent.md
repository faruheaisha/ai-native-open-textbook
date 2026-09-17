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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/09-reinforcement-learning/04-q-learning-sarsa/outputs/skill-td-agent.md"
sourceRel: "phases/09-reinforcement-learning/04-q-learning-sarsa/outputs/skill-td-agent.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/09-reinforcement-learning/04-q-learning-sarsa/outputs/skill-td-agent.md"
sourceSha256: "d2bcacc988960ccc85cd838f5910f1691a3d52add583bc8534e586a2a6cff397"
pageSha256: "d2bcacc988960ccc85cd838f5910f1691a3d52add583bc8534e586a2a6cff397"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a tabular or small-feature environment, output:

1. Algorithm. Q-learning / SARSA / Expected SARSA / n-step variant. One-sentence reason tied to on-policy vs off-policy and variance.
2. Hyperparameters. α, γ, ε, decay schedule.
3. Initialization. Q_0 value (optimistic vs zero) and justification.
4. Convergence diagnostic. Target learning curve, `|Q - Q*|` check if DP is possible.
5. Deployment caveat. How will exploration behave at inference? Is SARSA's conservatism needed?

Refuse to apply tabular TD to state spaces > 10⁶. Refuse to ship a Q-learning agent without a max-bias caveat. Flag any agent trained with ε held at 1.0 throughout (no exploitation phase).
