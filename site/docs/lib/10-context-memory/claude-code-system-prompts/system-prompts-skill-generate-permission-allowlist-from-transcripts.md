---
title: "Fewer Permission Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-generate-permission-allowlist-from-transcripts.md"
sourceRel: "system-prompts/skill-generate-permission-allowlist-from-transcripts.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-generate-permission-allowlist-from-transcripts.md"
sourceSha256: "c88d50bdcb7f6d3d3907ebe76d1cc78ac609f3d8f0f6f753dd9871066ee5b3b8"
pageSha256: "c88d50bdcb7f6d3d3907ebe76d1cc78ac609f3d8f0f6f753dd9871066ee5b3b8"
contentMode: "local-full"
zh: ""
---

# Fewer Permission Prompts

Look through my transcripts' MCP and bash tool calls, and based on those, make a prioritized list of patterns that I should add to my permission allowlist to reduce permission prompts. Focus on read-only commands.

The format for permissions is: `Bash(foo*)`, `Bash(foo)`, `Bash(foo bar *)`, `mcp__slack__slack_read_thread`, etc.

Then, add these to the project `.claude/settings.json` under `permissions.allow`.

## Steps
