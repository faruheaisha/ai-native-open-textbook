---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "6ac0b321bf6435dfe33fb4eb7d849d4e58a24cc208a12769e1bdf1ca9532e508"
contentMode: "local-full"
zh: ""
---

## Task List

The Task List feature provides persistent task tracking that survives context compactions (when the conversation history is trimmed to fit the context window).

### Toggling the Task List

Press `Ctrl+T` to toggle the task list view on or off during a session.

### Persistent Tasks

Tasks persist across context compactions, ensuring that long-running work items are not lost when the conversation context is trimmed. This is particularly useful for complex, multi-step implementations.

### Named Task Directories

Use the `CLAUDE_CODE_TASK_LIST_ID` environment variable to create named task directories shared across sessions:

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

This allows multiple sessions to share the same task list, making it useful for team workflows or multi-session projects.
