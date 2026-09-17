---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-angle-b-removed-behavior-auditor.md"
sourceRel: "system-prompts/skill-code-review-angle-b-removed-behavior-auditor.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-angle-b-removed-behavior-auditor.md"
sourceSha256: "a6691974fa92a69897ce4a61f34771c992dd187573d36baa900859082ba5cd6a"
pageSha256: "a6691974fa92a69897ce4a61f34771c992dd187573d36baa900859082ba5cd6a"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

### Angle B — removed-behavior auditor

For every line the diff DELETES or replaces, name the invariant or behavior it
enforced, then search the new code for where that invariant is re-established.
If you can't find it, that's a candidate: a removed guard, a dropped error
path, a narrowed validation, a deleted test that was covering a real case.
