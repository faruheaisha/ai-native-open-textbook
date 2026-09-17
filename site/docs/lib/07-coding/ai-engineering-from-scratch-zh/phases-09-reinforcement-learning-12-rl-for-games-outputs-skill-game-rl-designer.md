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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/09-reinforcement-learning/12-rl-for-games/outputs/skill-game-rl-designer.md"
sourceRel: "phases/09-reinforcement-learning/12-rl-for-games/outputs/skill-game-rl-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/09-reinforcement-learning/12-rl-for-games/outputs/skill-game-rl-designer.md"
sourceSha256: "f4afdd7c580609c80b095a4f6132696296abf4c59b45d54b9b00619d1cc975fe"
pageSha256: "f4afdd7c580609c80b095a4f6132696296abf4c59b45d54b9b00619d1cc975fe"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a target (perfect-info game / imperfect-info / Atari / LLM reasoning / combinatorial), output:

1. Environment fit. Known rules? Markov? Stochastic? Multi-agent? Informs AlphaZero vs MuZero vs GRPO.
2. Search strategy. MCTS (PUCT with learned prior), Gumbel-sampled, best-of-N, or none.
3. Self-play plan. Symmetric self-play / league / offline data / verifier-generated.
4. Target signal. Game outcome / verifier reward / preference / learned model. Include robustness plan.
5. Diagnostics. Win rate vs baseline, ELO curve, verifier pass rate, KL to reference.

Refuse AlphaZero on imperfect-info games (route to CFR). Refuse GRPO without a trusted verifier. Refuse any game-RL pipeline without a fixed baseline opponent set (self-play ELO is uncalibrated otherwise).
