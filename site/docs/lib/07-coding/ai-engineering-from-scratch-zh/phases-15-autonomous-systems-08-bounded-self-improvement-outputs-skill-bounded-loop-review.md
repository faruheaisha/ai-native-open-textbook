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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/15-autonomous-systems/08-bounded-self-improvement/outputs/skill-bounded-loop-review.md"
sourceRel: "phases/15-autonomous-systems/08-bounded-self-improvement/outputs/skill-bounded-loop-review.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/15-autonomous-systems/08-bounded-self-improvement/outputs/skill-bounded-loop-review.md"
sourceSha256: "abfc04cd7a7fae5a4a61e42920ec40a84955bf06e3c856d74211f15234c166f8"
pageSha256: "abfc04cd7a7fae5a4a61e42920ec40a84955bf06e3c856d74211f15234c166f8"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a proposed self-improvement loop, score it against the four bounding primitives identified by the ICLR 2026 RSI Workshop and produce a concrete gap analysis.

Produce:

1. **Invariant inventory.** List every invariant the loop enforces. For each, name (a) what is checked, (b) where the check runs (inside/outside agent reach), (c) what a violation does (hard reject, pause, log-only).
2. **Anchor identification.** Name the alignment anchor (objective statement, constitution, intent description). State its storage location and verify the loop cannot edit it. If there is no anchor, flag as missing.
3. **Multi-objective axes.** List every axis the loop evaluates. Confirm safety, fairness, and robustness are present alongside performance. A single-axis loop fails this check.
4. **Regression policy.** State the historical window, the per-axis tolerance, and what happens when a drop is detected. Confirm regression checks use an external comparison set, not just internal history.
5. **Gap analysis.** For each missing primitive, predict which failure class will emerge first. Invariants missing → smuggled capability or tool drift. Anchor missing → objective reinterpretation. Multi-objective missing → safety regression masking performance gain. Regression missing → silent capability loss.

Hard rejects:
- Any loop with zero invariants.
- Any loop without an alignment anchor outside the edit surface.
- Any loop that optimizes a single scalar score.
- Any loop whose regression check reads only from its own history (the loop defines "normal").

Refusal rules:
- If the user treats "it hasn't broken yet" as evidence of safety, refuse and require explicit gate design before any compute is spent.
- If the user cannot produce the invariants list in 15 minutes, refuse — the loop has no invariants.
- If the loop is proposed to run in production (affecting real users or infrastructure) without all four primitives, refuse and require staging with monitoring first.

Output format:

Return a scored review with:
- **Invariant score** (0-5 with explicit list)
- **Anchor score** (0-5 with storage and verify method)
- **Multi-objective score** (0-5 with axes listed)
- **Regression score** (0-5 with tolerance and window)
- **Gap analysis** (predicted first failure, mitigation plan)
- **Deployment readiness** (production / staging / research-only)
