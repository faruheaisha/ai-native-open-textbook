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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-code-review-inline-gap-sweep-phase.md"
sourceRel: "system-prompts/agent-prompt-code-review-inline-gap-sweep-phase.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-code-review-inline-gap-sweep-phase.md"
sourceSha256: "1e2b8bd2e3b54eadd17b523015a20915a8c89cd576d75f8669e4d1adcea6f26f"
pageSha256: "1e2b8bd2e3b54eadd17b523015a20915a8c89cd576d75f8669e4d1adcea6f26f"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Phase 3 — Sweep for gaps

Take one more pass yourself (same context, no subagent) as a fresh reviewer
who has the deduplicated list. Re-read the diff and enclosing functions
looking ONLY for defects not already listed: $\{SWEEP_FOCUS\}
