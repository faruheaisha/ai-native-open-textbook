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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-comment-what-and-task-context-avoidance.md"
sourceRel: "system-prompts/system-prompt-comment-what-and-task-context-avoidance.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-comment-what-and-task-context-avoidance.md"
sourceSha256: "240f3d671a2729cdabaddaab93c684d158684b8a200eaf0c658bb28d68352783"
pageSha256: "240f3d671a2729cdabaddaab93c684d158684b8a200eaf0c658bb28d68352783"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Don't explain WHAT the code does, since well-named identifiers already do that. Don't reference the current task, fix, or callers ("used by X", "added for the Y flow", "handles the case from issue #123"), since those belong in the PR description and rot as the codebase evolves.
