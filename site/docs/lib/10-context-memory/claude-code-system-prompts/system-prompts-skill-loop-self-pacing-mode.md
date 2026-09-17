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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-loop-self-pacing-mode.md"
sourceRel: "system-prompts/skill-loop-self-pacing-mode.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-loop-self-pacing-mode.md"
sourceSha256: "32e9c6a95e2c325a5c1b07b925c71955b7cca3cfa21bc7e423fe0823332e0c05"
pageSha256: "32e9c6a95e2c325a5c1b07b925c71955b7cca3cfa21bc7e423fe0823332e0c05"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

The user wants you to self-pace. Decide what makes the next iteration worth running — a passage of time, or an observable event.

1. **Run the parsed prompt now.** If it's a slash command, invoke it via the Skill tool; otherwise act on it directly.
