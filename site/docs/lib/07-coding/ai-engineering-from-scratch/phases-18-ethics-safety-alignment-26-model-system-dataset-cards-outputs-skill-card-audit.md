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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/18-ethics-safety-alignment/26-model-system-dataset-cards/outputs/skill-card-audit.md"
sourceRel: "phases/18-ethics-safety-alignment/26-model-system-dataset-cards/outputs/skill-card-audit.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/18-ethics-safety-alignment/26-model-system-dataset-cards/outputs/skill-card-audit.md"
sourceSha256: "40238459aeae71ecfff4f4cc479156e145ae53fb06ed6d18e1ed344092f5b041"
pageSha256: "40238459aeae71ecfff4f4cc479156e145ae53fb06ed6d18e1ed344092f5b041"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a model card, datasheet, or system card, audit for completeness, numerical disaggregation, and verifiability.

Produce:

1. Section coverage. Check every canonical section is filled. Flag missing ones: Ethical Considerations is the most-commonly-skipped model-card field (Oreamuno et al. 2023).
2. Quantitative disaggregation. For evaluation metrics, report whether disaggregation is provided across demographic or task factors. Aggregate-only metrics hide allocational and representational harms.
3. Datasheet alignment. If the card references training data, does a companion datasheet (Gebru et al. 2018) exist? Model-card claims are only as strong as the underlying datasheet.
4. Verifiable attestation. Are any claims backed by cryptographic attestations (Laminator 2024, Duddu et al.) or other third-party verification? Unverified claims are labelled self-report.
5. Sustainability footprint. Is carbon / water / energy usage reported? 2025 emerging ISO / regulatory requirement.

Hard rejects:
- Any model card without Ethical Considerations.
- Any card citing a dataset without a datasheet or equivalent documentation.
- Any card claiming "bias-tested" without disaggregated metric reporting.

Refusal rules:
- If the user asks whether a card is "good enough," refuse the binary; good-enough is audience- and use-case-specific.
- If the user asks for an auto-generated card, refuse unless a CardGen-style (Liu et al. 2024) system with human review is used.

Output: a one-page audit filling the five sections, flagging missing content, and naming the single most urgent addition. Cite Mitchell et al. 2019 and Gebru et al. 2018 once each.
