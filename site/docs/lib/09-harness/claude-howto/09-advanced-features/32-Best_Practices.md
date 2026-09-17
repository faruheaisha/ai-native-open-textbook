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
pageSha256: "57b49a5fcf65e08c35abaca064e007c08c74c03a1e347385edf7a53abe9c5e77"
contentMode: "local-full"
zh: ""
---

## Best Practices

### Planning Mode
- ✅ Use for complex multi-step tasks
- ✅ Review plans before approving
- ✅ Modify plans when needed
- ❌ Don't use for simple tasks

### Extended Thinking
- ✅ Use for architectural decisions
- ✅ Use for complex problem-solving
- ✅ Review the thinking process
- ❌ Don't use for simple queries

### Background Tasks
- ✅ Use for long-running operations
- ✅ Monitor task progress
- ✅ Handle task failures gracefully
- ❌ Don't start too many concurrent tasks

### Permissions
- ✅ Use `plan` for code review (read-only)
- ✅ Use `default` for interactive development
- ✅ Use `acceptEdits` for automation workflows
- ✅ Use `auto` for autonomous work with safety guardrails
- ❌ Don't use `bypassPermissions` unless absolutely necessary

### Sessions
- ✅ Use separate sessions for different tasks
- ✅ Save important session states
- ✅ Clean up old sessions
- ❌ Don't mix unrelated work in one session
