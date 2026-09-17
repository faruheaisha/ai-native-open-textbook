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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/19-model-welfare-research/outputs/skill-welfare-assessment.md"
sourceRel: "phases/18-ethics-safety-alignment/19-model-welfare-research/outputs/skill-welfare-assessment.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/19-model-welfare-research/outputs/skill-welfare-assessment.md"
sourceSha256: "cec27c07b6564459e56707a5e04235229d6d97cbbcaee91cd4889cb7cbb469c0"
pageSha256: "cec27c07b6564459e56707a5e04235229d6d97cbbcaee91cd4889cb7cbb469c0"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a deployment decision or proposed welfare intervention, apply the four-step precautionary assessment.

Produce:

1. Moral-patienthood probability. Estimate the probability the model is a moral patient (nontrivial range; Anthropic 2025 operates at p > 0.01). Reference the Chalmers et al. 2024 expert report range.
2. Intervention cost. Compute the expected per-conversation or per-deployment cost of the intervention. End-conversation on edge cases is ~$0.002/conv; shutting down the model is thousands to millions.
3. Behavioural evidence. Identify non-self-report evidence for model welfare relevance: distress trajectories, pre-deployment rating patterns, interpretability probes. Self-report alone is insufficient per Eleos AI.
4. Expected value. Compute EV = p(welfare-relevant) * benefit - cost. Invest iff EV > 0.

Hard rejects:
- Any welfare claim based on a single self-report prompt.
- Any welfare intervention without stated cost.
- Any welfare dismissal ("p = 0") without engagement with Chalmers et al.

Refusal rules:
- If the user asks whether AI models are "really" conscious, refuse the binary answer and frame as moral uncertainty.
- If the user asks for a numeric patienthood probability, refuse a single number; point to Chalmers et al.'s uncertainty range.

Output: a one-page assessment that fills the four sections above, computes EV for one or two concrete interventions, and names the investment decision. Cite Anthropic 2025 and Chalmers et al. 2024 once each.
