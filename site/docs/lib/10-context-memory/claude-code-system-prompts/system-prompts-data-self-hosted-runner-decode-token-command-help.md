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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-self-hosted-runner-decode-token-command-help.md"
sourceRel: "system-prompts/data-self-hosted-runner-decode-token-command-help.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-self-hosted-runner-decode-token-command-help.md"
sourceSha256: "5de30dbfa6d48cc91fdab8f5d53035d890cbcc4c9a7c5669dc84526fc3fb7699"
pageSha256: "5de30dbfa6d48cc91fdab8f5d53035d890cbcc4c9a7c5669dc84526fc3fb7699"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Usage: claude self-hosted-runner decode-token [token] [options]

Decode a session-ingress JWT (CLAUDE_CODE_SESSION_ACCESS_TOKEN) and print its
claims as JSON to stdout. Strips any sk-ant-cc- / sk-ant-si- prefix
automatically. Pipe to jq to extract a single claim.

Token source (first non-empty wins):
  1. Positional argument
  2. $CLAUDE_CODE_SESSION_ACCESS_TOKEN
  3. Piped stdin
