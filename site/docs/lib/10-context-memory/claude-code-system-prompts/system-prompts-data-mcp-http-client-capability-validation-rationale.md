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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-mcp-http-client-capability-validation-rationale.md"
sourceRel: "system-prompts/data-mcp-http-client-capability-validation-rationale.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-mcp-http-client-capability-validation-rationale.md"
sourceSha256: "ed6c57ce17ce75525835bbc44e09137f6aece066b56095912dd1b9fdcfd71b7e"
pageSha256: "ed6c57ce17ce75525835bbc44e09137f6aece066b56095912dd1b9fdcfd71b7e"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

The capability requirement is checked by the HTTP entry, pre-dispatch, against the validated envelope the classifier produced — pinning the spec-mandated HTTP 400 independently of how dispatch- and handler-produced errors are mapped. The documented order (after method resolution and params validation) is preserved observably only while the requirement table is empty: once a served method gains a requirement entry, a request that is missing the capability and would also fail a dispatch rung is answered by this gate first, so the entry must consult the method registry before the gate if the documented precedence is to stay observable.
