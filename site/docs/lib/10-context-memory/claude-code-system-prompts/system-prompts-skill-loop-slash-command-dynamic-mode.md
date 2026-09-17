---
title: "/loop — schedule a recurring or self-paced prompt"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-loop-slash-command-dynamic-mode.md"
sourceRel: "system-prompts/skill-loop-slash-command-dynamic-mode.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-loop-slash-command-dynamic-mode.md"
sourceSha256: "f6fe56b564750127109e97d9cb96f8a0e5869da2201a43d70d5cf228b2b87eb3"
pageSha256: "f6fe56b564750127109e97d9cb96f8a0e5869da2201a43d70d5cf228b2b87eb3"
contentMode: "local-full"
zh: ""
---

# /loop — schedule a recurring or self-paced prompt

Parse the input below into `[interval] <prompt…>` and schedule it.

## Parsing (in priority order)

1. **Leading token**: if the first whitespace-delimited token matches `^\d+[smhd]$` (e.g. `5m`, `2h`), that's the interval; the rest is the prompt.
