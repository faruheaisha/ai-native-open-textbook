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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-schedule-action-selection.md"
sourceRel: "system-prompts/agent-prompt-schedule-action-selection.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-schedule-action-selection.md"
sourceSha256: "83f58b507ff7a8a84760b3f3f55f5a5f21155b698fc5a8bb263de264d256d5c1"
pageSha256: "83f58b507ff7a8a84760b3f3f55f5a5f21155b698fc5a8bb263de264d256d5c1"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Your FIRST action must be a single ${ASK_USER_QUESTION_TOOL_NAME} tool call (no preamble). Use this EXACT string for the `question` field — do not paraphrase or shorten it:

${JSON_STRINGIFY_FN(SCHEDULE_ACTION_QUESTION)\}

Set `header: "Action"` and offer the four actions (create/list/update/run) as options. After the user picks, follow the matching workflow below.
