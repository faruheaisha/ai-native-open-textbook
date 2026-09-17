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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-angle-d-language-pitfall-specialist.md"
sourceRel: "system-prompts/skill-code-review-angle-d-language-pitfall-specialist.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-angle-d-language-pitfall-specialist.md"
sourceSha256: "3b404c4ba9f3395e0f664519ae848e81cda721a151c87df08bc161aaacd0569c"
pageSha256: "3b404c4ba9f3395e0f664519ae848e81cda721a151c87df08bc161aaacd0569c"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

### Angle D — language-pitfall specialist

Scan for the classic pitfalls of the diff's language/framework — for example:
JS falsy-zero, `==` coercion, closure-captured loop var; Python mutable default
args, late-binding closures; Go nil-map write, range-var capture; SQL injection;
timezone/DST drift; float equality. Flag any instance the diff introduces.
