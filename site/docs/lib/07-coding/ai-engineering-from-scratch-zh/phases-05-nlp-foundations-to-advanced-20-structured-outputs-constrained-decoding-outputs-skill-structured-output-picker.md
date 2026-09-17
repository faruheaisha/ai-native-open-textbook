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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/05-nlp-foundations-to-advanced/20-structured-outputs-constrained-decoding/outputs/skill-structured-output-picker.md"
sourceRel: "phases/05-nlp-foundations-to-advanced/20-structured-outputs-constrained-decoding/outputs/skill-structured-output-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/05-nlp-foundations-to-advanced/20-structured-outputs-constrained-decoding/outputs/skill-structured-output-picker.md"
sourceSha256: "f27f84dc570ed8c1a40878e21652c63980816f66dd1ebcab82d2ab25f21ad28b"
pageSha256: "f27f84dc570ed8c1a40878e21652c63980816f66dd1ebcab82d2ab25f21ad28b"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a use case (provider, latency budget, schema complexity, failure tolerance), output:

1. Mechanism. Native vendor structured output, Instructor retries, Outlines FSM, or XGrammar CFG. One-sentence reason.
2. Schema design. Field order (reasoning first, answer last), nullable fields for "unknown", enum vs regex, required fields.
3. Failure strategy. Max retries, fallback model, graceful `null` handling, out-of-distribution refusal.
4. Validation plan. Schema compliance rate (target 100%), semantic validity (LLM-judge), field-coverage rate, latency p50/p99.

Refuse any design that puts `answer` or `decision` before reasoning fields. Refuse to use bare JSON mode without a schema. Flag recursive schemas behind an FSM-only library.
