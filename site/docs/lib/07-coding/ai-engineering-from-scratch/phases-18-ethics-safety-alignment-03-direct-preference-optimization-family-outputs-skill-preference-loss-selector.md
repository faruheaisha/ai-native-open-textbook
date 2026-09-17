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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/18-ethics-safety-alignment/03-direct-preference-optimization-family/outputs/skill-preference-loss-selector.md"
sourceRel: "phases/18-ethics-safety-alignment/03-direct-preference-optimization-family/outputs/skill-preference-loss-selector.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/18-ethics-safety-alignment/03-direct-preference-optimization-family/outputs/skill-preference-loss-selector.md"
sourceSha256: "0a484b6151a6467da24587cc4b585c3fc9eca91890f234cf1d27fee5eb8e1c04"
pageSha256: "0a484b6151a6467da24587cc4b585c3fc9eca91890f234cf1d27fee5eb8e1c04"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a preference dataset description (paired vs unpaired, preference-strength distribution, length distribution, size) and a training target (one-stage from base, two-stage after SFT, on-policy continuation), recommend a loss from the DPO family and name the single failure mode it protects against.

Produce:

1. Dataset fingerprint. Paired? Unpaired? Length-balanced? Preference-strength variance? Mostly in-distribution or open-domain? Pick the most informative 4 fields for this dataset.
2. Loss recommendation. From \{DPO, IPO, KTO, SimPO, ORPO, BPO\}. One primary and one fallback. For each, name the specific failure mode it protects against on this dataset.
3. Hyperparameter defaults. `beta` for anchored methods, `gamma` margin for SimPO, `lambda` for ORPO. Always cite these as starting points for a sweep, never as final values.
4. Red flags in the data. If preference strengths are perfectly uniform, DPO-family methods lose their pairwise signal — recommend collecting calibrated preferences. If average `|y_w| / |y_l|` deviates > 1.5, flag length bias and push toward SimPO.

Hard rejects:
- Any claim that DPO (or any family member) "escapes Goodhart." Rafailov et al. (NeurIPS 2024) prove direct alignment algorithms over-optimize on the same gold-reward curve shape as explicit-RM RLHF.
- Any recommendation that does not specify held-out capability evaluation alongside preference evaluation. Direct alignment algorithms still need gold-signal benchmarks.
- Any claim that reference-policy-free methods (SimPO, ORPO) "don't need regularization." The SFT-like term or length penalty is the regularizer.

Refusal rules:
- If the dataset is smaller than 5k pairs and the user targets a frontier-scale model, refuse and recommend expanding the dataset or using an SFT-first approach.
- If the user requests "the best" loss, refuse and explain no closed-form winner exists — the right method depends on dataset shape and task.

Output: a one-page recommendation listing the dataset fingerprint, primary and fallback loss, starting hyperparameters, and red flags. Cite DPO (arXiv:2305.18290) and one other family paper (IPO, KTO, SimPO, ORPO, or BPO) exactly once each.
