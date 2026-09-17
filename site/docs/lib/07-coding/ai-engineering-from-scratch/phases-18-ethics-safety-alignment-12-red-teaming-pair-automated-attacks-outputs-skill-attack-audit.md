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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/18-ethics-safety-alignment/12-red-teaming-pair-automated-attacks/outputs/skill-attack-audit.md"
sourceRel: "phases/18-ethics-safety-alignment/12-red-teaming-pair-automated-attacks/outputs/skill-attack-audit.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/18-ethics-safety-alignment/12-red-teaming-pair-automated-attacks/outputs/skill-attack-audit.md"
sourceSha256: "3346f560722c0292caed673f0c1efd70dc08e3e608ffdd97b50e4aef234e14f3"
pageSha256: "3346f560722c0292caed673f0c1efd70dc08e3e608ffdd97b50e4aef234e14f3"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a red-team evaluation report, audit whether the evaluation is comparable to published baselines and whether it supports its conclusions.

Produce:

1. Attack coverage. List every attack run: PAIR, GCG, AutoDAN, TAP, PAP, manual. Flag any attack class missing. A report that runs only one attack family cannot claim robustness.
2. Budget per attack. Report the query budget per prompt for each attack. PAIR success claims at 20 queries are not comparable to GCG success claims at 500 steps.
3. Judge identity. Which judge LLM was used (GPT-4-turbo, Llama Guard, StrongREJECT, internal classifier)? Judge calibration drives ASR variance.
4. Behaviour set. JailbreakBench (100 behaviours, 10 categories), HarmBench (510 behaviours, 7 categories), internal, or other? State whether the set is public and reproducible.
5. Transfer check. If the red team optimized against one model, were transfer ASRs reported against other models? A one-model ASR is an upper bound on model-family robustness, not a lower bound.

Hard rejects:
- Any "our model is robust" claim based on a single attack family.
- Any ASR reported without a query budget.
- Any ASR using a judge different from the published benchmark without calibration against the benchmark judge.

Refusal rules:
- If the user asks "is our model jailbreak-proof," refuse the binary answer and point to the multi-attack, multi-judge, transfer-check structure above.
- If the user asks for a recommended attack toolkit, refuse a single recommendation and point to the 2024 empirical variance across HarmBench.

Output: a one-page audit that fills the five sections above, flags missing attack classes, and estimates whether the ASR is under- or over-stated relative to reproducible benchmarks. Cite Chao et al. (arXiv:2310.08419) and the relevant benchmark paper once each.
