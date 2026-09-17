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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/05-nlp-foundations-to-advanced/29-dialogue-state-tracking/outputs/skill-dst-designer.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/29-dialogue-state-tracking/outputs/skill-dst-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/05-nlp-foundations-to-advanced/29-dialogue-state-tracking/outputs/skill-dst-designer.md"
sourceSha256: "38b1c6be47981fedc80c5e2d4ac034f6e4b6b89ec348d515c57eae89a7f84b1f"
pageSha256: "38b1c6be47981fedc80c5e2d4ac034f6e4b6b89ec348d515c57eae89a7f84b1f"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a use case (domain, languages, vocab openness, compliance needs), output:

1. Schema. Domain list, slots per domain, open vs closed vocabulary per slot.
2. Extractor. Rule-based / seq2seq / LLM-with-Pydantic. Reason.
3. Update policy. Regenerate-whole-state / incremental; correction handling; negation handling.
4. Evaluation. Joint Goal Accuracy on a held-out dialogue set, slot-level precision/recall, confusion on the hardest slot.
5. Confirmation flow. When to explicitly ask the user to confirm (destructive actions, low-confidence extractions).

Refuse LLM-only DST for compliance-sensitive slots without a rule-based secondary check. Refuse any DST that cannot roll back a slot on user correction. Flag schemas without version tags.
