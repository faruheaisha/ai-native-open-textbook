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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-mcp-http-standard-header-validation-rationale.md"
sourceRel: "system-prompts/data-mcp-http-standard-header-validation-rationale.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-mcp-http-standard-header-validation-rationale.md"
sourceSha256: "a27d4455988125896f528c1fcdbaaa3497487185aea06865678ace312fbc5ff3"
pageSha256: "a27d4455988125896f528c1fcdbaaa3497487185aea06865678ace312fbc5ff3"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

SEP-2243 standard `Mcp-Method` / `Mcp-Name` headers — presence, sentinel decoding, and `Mcp-Name` ↔ body cross-check — are validated by the HTTP entry on a modern-classified request after the supported-revision gate and before dispatch. The classifier’s own header-mismatch cells (protocol-version, `Mcp-Method` mismatch) stay on the edge `era-classification` rung; this rung carries the entry-layer presence/`Mcp-Name` half. Evaluated before the capability gate, the factory call, and the `Mcp-Param-*` rung so a request that fails several rungs is answered by the standard-header rung first. The documented order (after method-registry 5 and request-params 6) is NOT the observed precedence: serveModern evaluates this rung immediately after the supported-revision gate, so a request that also fails a dispatch rung is answered here before the dispatch rungs (5–6) are consulted.
