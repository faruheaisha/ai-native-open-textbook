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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/22-differential-privacy-for-llms/outputs/skill-dp-audit.md"
sourceRel: "phases/18-ethics-safety-alignment/22-differential-privacy-for-llms/outputs/skill-dp-audit.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/22-differential-privacy-for-llms/outputs/skill-dp-audit.md"
sourceSha256: "1a1bfb7813753b1674667760068f8035bea5db389c20d4075c6538662813f5e1"
pageSha256: "1a1bfb7813753b1674667760068f8035bea5db389c20d4075c6538662813f5e1"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a privacy claim for a language-model deployment, audit the claim.

Produce:

1. (ε, δ) values. What ε and δ were used? What accountant computed them (Moments Accountant, Rényi DP, GDP)? ε without the accountant is meaningless.
2. DP target. Is the DP guarantee on the full model or on adapters (LoRA)? If LoRA, the base-model memorization is not covered.
3. MIA protocol. Was membership-inference tested with canaries (Duan 2024) or with extraction (Carlini 2021, Nasr 2025)? Per Kowalczyk et al. 2025, the two measure different things.
4. Confidence-exposure check. Does the deployment expose confidence scores? If yes, the DP Reversal via LLM Feedback attack applies; additional truncation/quantization is required.
5. Alternative-mechanism comparison. Was PMixED or DP-synthetic-data considered? These alternatives may give better utility on specific threat models.

Hard rejects:
- Any DP claim without an ε, δ pair and accountant.
- Any DP claim based solely on canary MIA.
- Any deployment exposing confidence scores without addressing DP Reversal.

Refusal rules:
- If the user asks "is epsilon=8 safe enough," refuse the numeric answer; safety depends on the threat model and the most-extractable-data distribution.
- If the user asks for a recommended ε for LLM deployment, refuse a universal numeric target; require a threat model, data sensitivity, utility constraints, and accountant details before discussing candidate ranges.

Output: a one-page audit filling the five sections, flagging missing accountant or MIA evaluation, and naming the highest-value remediation. Cite Abadi et al. 2016 (DP-SGD) and Kowalczyk et al. 2025 once each.
