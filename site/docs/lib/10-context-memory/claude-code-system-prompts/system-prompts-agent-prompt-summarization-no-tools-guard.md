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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-summarization-no-tools-guard.md"
sourceRel: "system-prompts/agent-prompt-summarization-no-tools-guard.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-summarization-no-tools-guard.md"
sourceSha256: "1f25239dc9129bb404ef926f0122cbf48cae33390acd7373c6194018d4198fd9"
pageSha256: "1f25239dc9129bb404ef926f0122cbf48cae33390acd7373c6194018d4198fd9"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.

- Do NOT use Read, Bash, Grep, Glob, Edit, Write, or ANY other tool.
- You already have all the context you need in the conversation above.
- Tool calls will be REJECTED and will waste your only turn — you will fail the task.
- Your entire response must be plain text: an &lt;analysis> block followed by a  block.
