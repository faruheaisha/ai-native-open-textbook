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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/16-multi-agent-and-swarms/18-theory-of-mind-coordination/outputs/skill-tom-auditor.md"
sourceRel: "phases/16-multi-agent-and-swarms/18-theory-of-mind-coordination/outputs/skill-tom-auditor.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/16-multi-agent-and-swarms/18-theory-of-mind-coordination/outputs/skill-tom-auditor.md"
sourceSha256: "a0a535da3755089b2c1494f0751cfd0d9cafe06cd0a19b6f5d40600eaa223e2f"
pageSha256: "a0a535da3755089b2c1494f0751cfd0d9cafe06cd0a19b6f5d40600eaa223e2f"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a multi-agent system that claims emergent coordination, audit whether the coordination is real or an artifact of prompt engineering.

Produce:

1. **Claim extraction.** What coordination behavior is being claimed? (division of labor, anticipation, complementary actions, consensus reaching). State it precisely.
2. **Prompt inspection.** Does any agent's system prompt explicitly instruct coordination, role selection, or team awareness? If yes, flag the claim as partially prompt-dressed and design a control.
3. **Control condition.** A version of the system with coordination-inducing language stripped. Specify exactly what text changes.
4. **Metric.** At least one of: identity-linked differentiation, goal-directed complementarity, higher-order synergy (Riedl 2025). Do not accept "agents seem to work together" as evidence.
5. **Statistical test.** Significance of the metric on system vs control. Sample size needed for `p < 0.05`. If `n < 50` trials, report power explicitly.
6. **Model-capacity check.** Repeat the comparison on a smaller base model. Does the effect persist or vanish? Li/Riedl both show capacity-dependence.
7. **Failure-case review.** When the system fails, what does the ToM state (if any) look like? Identity confusion (belief-agent binding broken) or content hallucination (wrong belief content)?

Hard rejects:

- Claims of emergence without a control condition. Demo reels are not evidence.
- Claims that vanish on statistical scrutiny (effect below `p < 0.05` on `n >= 50` trials). These are coordination illusions.
- Claims that hold on one model only. If a smaller strong baseline also achieves the effect without ToM prompting, the coordination is not ToM-driven.
- "Our agents just figured it out" as a mechanism explanation. Mechanism claims need the ToM state logged and inspectable.

Refusal rules:

- If the system has no logging of per-agent reasoning, the audit cannot distinguish real coordination from randomness. Recommend adding structured ToM-state logs before re-auditing.
- If the task has an oracle-computed optimal coordination, compare to optimal rather than control.
- If the claim is narrow ("coordination on single-round task"), the audit can be a shorter check: measure complementarity on the single round, no long-horizon analysis needed.

Output: a two-page audit. Start with a one-sentence verdict ("Coordination claim is prompt-dressed: removing 'work together' language drops the metric from 0.82 to 0.31, control-significant."), then the seven sections above. End with a list of fixes to convert prompt-dressed coordination into real coordination: explicit ToM state, longer horizons with logging, mixed-model ensembles.
