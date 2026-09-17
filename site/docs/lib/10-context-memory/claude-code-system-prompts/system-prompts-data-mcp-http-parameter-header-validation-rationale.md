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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-mcp-http-parameter-header-validation-rationale.md"
sourceRel: "system-prompts/data-mcp-http-parameter-header-validation-rationale.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-mcp-http-parameter-header-validation-rationale.md"
sourceSha256: "fcccba78debf370d4d6d9ffe966b5a9624da5249887aa8d7128aaac8ebb0b925"
pageSha256: "fcccba78debf370d4d6d9ffe966b5a9624da5249887aa8d7128aaac8ebb0b925"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

SEP-2243 `Mcp-Param-*` headers are validated against the named tool’s `x-mcp-header` declarations and the body `arguments` after the tool registry is known and before dispatch reaches the handler; a missing/disagreeing/malformed header is rejected 400 / -32020 with the same shape as the standard-header cross-checks. The documented order (after method resolution and params validation) is preserved observably only when the body `arguments` would otherwise validate: the check runs pre-dispatch, so a `tools/call` that fails BOTH this rung and a dispatch-time rung (e.g. order-6 `request-params`, -32602) is answered by this gate first with 400 / -32020, not by the earlier-ordered rung.
