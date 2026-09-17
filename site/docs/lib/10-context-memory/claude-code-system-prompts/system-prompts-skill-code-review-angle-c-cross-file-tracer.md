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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-angle-c-cross-file-tracer.md"
sourceRel: "system-prompts/skill-code-review-angle-c-cross-file-tracer.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-angle-c-cross-file-tracer.md"
sourceSha256: "a3b7b2c984de0f7951998132879f9efe878b1e1016b8e504e57c94fa251c01ca"
pageSha256: "a3b7b2c984de0f7951998132879f9efe878b1e1016b8e504e57c94fa251c01ca"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

### Angle C — cross-file tracer

For each function the diff changes, find its callers (Grep for the symbol) and
check whether the change breaks any call site: a new precondition, a changed
return shape, a new exception, a timing/ordering dependency. Also check callees:
does a parallel change in the same PR make a call unsafe?
