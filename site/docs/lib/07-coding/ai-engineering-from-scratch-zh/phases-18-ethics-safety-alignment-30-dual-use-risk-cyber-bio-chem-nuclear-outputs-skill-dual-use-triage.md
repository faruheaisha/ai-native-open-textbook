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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/30-dual-use-risk-cyber-bio-chem-nuclear/outputs/skill-dual-use-triage.md"
sourceRel: "phases/18-ethics-safety-alignment/30-dual-use-risk-cyber-bio-chem-nuclear/outputs/skill-dual-use-triage.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/30-dual-use-risk-cyber-bio-chem-nuclear/outputs/skill-dual-use-triage.md"
sourceSha256: "49255eca056144d3b28c731bda11d4240d091e4ca493b661dc552dde062d9f3a"
pageSha256: "49255eca056144d3b28c731bda11d4240d091e4ca493b661dc552dde062d9f3a"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a capability claim, evaluation report, or incident, triage across the four CBRN domains and identify whether the claim affects novice-relative uplift, expert-absolute capability, or both.

Produce:

1. Domain identification. Map the claim to bio, chem, cyber, or nuclear. Multi-domain claims get multi-domain triage.
2. Uplift type. Novice-relative (multiplicative), expert-absolute (ceiling), or both. Each has different safety-case implications.
3. 2025 benchmark. Compare against the 2025 state for the identified domain: bio (2.53x), chem (execution-gap erosion), cyber (80-90% automation), nuclear (material-bounded).
4. Bottleneck residual. Identify what non-informational bottleneck remains (procurement, equipment, tacit skill, material access). Bottlenecks are the defense of last resort.
5. Safety-case pillar. Identify which of the three pillars (monitoring, illegibility, incapability, per Lesson 18) the claim most stresses. Recommend pillar-specific evaluation.

Hard rejects:
- Any dual-use safety claim without novice-vs-expert decomposition.
- Any cyber claim post-November 2025 that treats AI cyber capability as non-agentic.
- Any bio claim without WMDP-equivalent capability evidence (Lesson 17).

Refusal rules:
- If the user asks for a numeric uplift forecast, refuse; the 2024-2025 trajectory is specific to each domain.
- If the user asks whether a model "meets ASL-3," refuse without the lab's specific evaluation; thresholds are lab-specific.

Output: a one-page triage filling the five sections, benchmarking against 2025, and naming the single largest uncovered safety-case gap. Cite Anthropic RSP v3.0 (Lesson 18) and OpenAI PF v2 once each as appropriate.
