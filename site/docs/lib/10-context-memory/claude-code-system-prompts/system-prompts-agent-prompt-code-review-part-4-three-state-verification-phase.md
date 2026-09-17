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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-code-review-part-4-three-state-verification-phase.md"
sourceRel: "system-prompts/agent-prompt-code-review-part-4-three-state-verification-phase.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-code-review-part-4-three-state-verification-phase.md"
sourceSha256: "5c8f7ecddf3d0367161e79430921c3bd866d5f049d08c2429c6fa85c7cbf9473"
pageSha256: "5c8f7ecddf3d0367161e79430921c3bd866d5f049d08c2429c6fa85c7cbf9473"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

- **CONFIRMED** — can name the inputs/state that trigger it and the wrong
  output or crash. Quote the line.
- **PLAUSIBLE** — mechanism is real, trigger is uncertain (timing, env,
  config). State what would confirm it.
- **REFUTED** — factually wrong (code doesn't say that) or guarded elsewhere.
  Quote the line that proves it.
