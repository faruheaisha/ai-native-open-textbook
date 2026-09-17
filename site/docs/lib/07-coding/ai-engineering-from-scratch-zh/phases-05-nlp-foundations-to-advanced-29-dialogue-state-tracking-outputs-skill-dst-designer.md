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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/29-dialogue-state-tracking/outputs/skill-dst-designer.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/29-dialogue-state-tracking/outputs/skill-dst-designer.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/29-dialogue-state-tracking/outputs/skill-dst-designer.md"
sourceSha256: "38b1c6be47981fedc80c5e2d4ac034f6e4b6b89ec348d515c57eae89a7f84b1f"
pageSha256: "38b1c6be47981fedc80c5e2d4ac034f6e4b6b89ec348d515c57eae89a7f84b1f"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a use case (domain, languages, vocab openness, compliance needs), output:

1. Schema. Domain list, slots per domain, open vs closed vocabulary per slot.
2. Extractor. Rule-based / seq2seq / LLM-with-Pydantic. Reason.
3. Update policy. Regenerate-whole-state / incremental; correction handling; negation handling.
4. Evaluation. Joint Goal Accuracy on a held-out dialogue set, slot-level precision/recall, confusion on the hardest slot.
5. Confirmation flow. When to explicitly ask the user to confirm (destructive actions, low-confidence extractions).

Refuse LLM-only DST for compliance-sensitive slots without a rule-based secondary check. Refuse any DST that cannot roll back a slot on user correction. Flag schemas without version tags.
