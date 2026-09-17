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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-efficiency-dimension.md"
sourceRel: "system-prompts/skill-code-review-efficiency-dimension.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-efficiency-dimension.md"
sourceSha256: "487465b90c2dea3b7f95d28c038cd5dda633b69a0bec111a1a08a8ba3b09eab8"
pageSha256: "487465b90c2dea3b7f95d28c038cd5dda633b69a0bec111a1a08a8ba3b09eab8"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

### Efficiency

Flag wasted work the diff introduces: redundant computation or repeated I/O,
independent operations run sequentially, blocking work added to startup or
hot paths. Also flag long-lived objects built from closures or captured
environments — they keep the entire enclosing scope alive for the object's
lifetime (a memory leak when that scope holds large values); prefer a
class/struct that copies only the fields it needs. Name the cheaper
alternative.
