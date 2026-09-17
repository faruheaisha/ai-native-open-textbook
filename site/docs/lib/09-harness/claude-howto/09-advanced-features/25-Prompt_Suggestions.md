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
pageSha256: "b6609c24d403f28c46b831e276c320cb037da371a1e3dc7b465aa1ef01a07c6d"
contentMode: "local-full"
zh: ""
---

## Prompt Suggestions

Prompt Suggestions display grayed-out example commands based on your git history and current conversation context.

### How It Works

- Suggestions appear as grayed-out text below your input prompt
- Press `Tab` to accept the suggestion
- Press `Enter` to accept and immediately submit
- Suggestions are context-aware, drawing from git history and conversation state

### Disabling Prompt Suggestions

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```
