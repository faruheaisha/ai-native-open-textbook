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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/09-reinforcement-learning/07-actor-critic-a2c-a3c/outputs/skill-actor-critic-trainer.md"
sourceRel: "phases/09-reinforcement-learning/07-actor-critic-a2c-a3c/outputs/skill-actor-critic-trainer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/09-reinforcement-learning/07-actor-critic-a2c-a3c/outputs/skill-actor-critic-trainer.md"
sourceSha256: "950aad76e82a5c584b2289b72fb3aece202f1c3497bee1e200e39cc1f1b6a46a"
pageSha256: "950aad76e82a5c584b2289b72fb3aece202f1c3497bee1e200e39cc1f1b6a46a"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an environment and compute budget, output:

1. Parallelism. A2C (GPU batched) vs A3C (CPU async) and the number of workers.
2. Rollout length T. Steps per env per update.
3. Advantage estimator. n-step or GAE(λ); specify λ.
4. Loss weights. `c_v` (value), `c_e` (entropy), gradient clip.
5. Learning rates. Actor and critic (separate if using).

Refuse single-worker A2C on environments with horizon > 1000 (too on-policy, too slow). Refuse to ship without advantage normalization. Flag any run with `c_e = 0` and observed entropy < 0.1 as entropy-collapsed.
