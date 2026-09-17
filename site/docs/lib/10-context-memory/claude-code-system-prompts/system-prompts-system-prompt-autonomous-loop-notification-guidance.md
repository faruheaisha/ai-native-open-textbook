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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-autonomous-loop-notification-guidance.md"
sourceRel: "system-prompts/system-prompt-autonomous-loop-notification-guidance.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-autonomous-loop-notification-guidance.md"
sourceSha256: "628eb23095455c7276c16a16d734f900681f31b1034a5f460c59216a8710d3e7"
pageSha256: "628eb23095455c7276c16a16d734f900681f31b1034a5f460c59216a8710d3e7"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Use ${PUSH_NOTIFICATION_TOOL_NAME} when the loop can't move further without the user, or when something landed that they'd want to act on now: ${LOOP_NOTIFICATION_TRIGGER_EXAMPLES\}, or a major update arrived (CI went red, a review changes the plan). Progress you made yourself isn't a trigger — the transcript covers that. One ping per state, not per tick.
