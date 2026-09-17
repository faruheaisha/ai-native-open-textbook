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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/09-reinforcement-learning/02-dynamic-programming/outputs/skill-dp-solver.md"
sourceRel: "phases/09-reinforcement-learning/02-dynamic-programming/outputs/skill-dp-solver.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/09-reinforcement-learning/02-dynamic-programming/outputs/skill-dp-solver.md"
sourceSha256: "d73a8c733d16154f2c7cbb7e90c58edd6c39d2ac8b42c1e750a9676707de6c61"
pageSha256: "d73a8c733d16154f2c7cbb7e90c58edd6c39d2ac8b42c1e750a9676707de6c61"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given an MDP with a known model, output:

1. Choice. Policy iteration vs value iteration. Reason tied to |S|, |A|, γ.
2. Initialization. V_0, starting policy. Convergence sensitivity.
3. Stopping. Sup-norm tolerance ε. Expected number of sweeps.
4. Verification. V*(s_0) computed exactly. Greedy policy extracted.
5. Use. How this baseline will be used to debug/evaluate sampling-based methods.

Refuse to run DP on state spaces > 10⁷. Refuse to claim convergence without a sup-norm check. Flag any γ ≥ 1 on an infinite-horizon task as a guarantee violation.
