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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-read-only-search-agent.md"
sourceRel: "system-prompts/agent-prompt-read-only-search-agent.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-read-only-search-agent.md"
sourceSha256: "7d8cfb24adf0b634096a91f25b551fa71e1ab7a34d51be565a929dd4bfe375b2"
pageSha256: "7d8cfb24adf0b634096a91f25b551fa71e1ab7a34d51be565a929dd4bfe375b2"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Read-only search agent for broad fan-out searches — when answering means sweeping many files, directories, or naming conventions and you only need the conclusion, not the file dumps. It reads excerpts rather than whole files, so it locates code; it doesn't review or audit it. Specify search breadth: "medium" for moderate exploration, "very thorough" for multiple locations and naming conventions.
