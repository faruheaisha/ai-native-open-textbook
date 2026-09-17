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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-result-message-schema.md"
sourceRel: "system-prompts/data-sdk-result-message-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-result-message-schema.md"
sourceSha256: "24519b86a5b290ecae225f03b651227465ad73770ed2c75425d27d11b5b76ca6"
pageSha256: "24519b86a5b290ecae225f03b651227465ad73770ed2c75425d27d11b5b76ca6"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

The outcome of a turn. The CLI emits exactly one result message per turn, after that turn's assistant, user and stream_event messages; treat it as the turn-complete signal (informational system messages such as task notifications, session state changes or prompt suggestions may still follow it). subtype "success" carries the final assistant text in result — or, with is_error true, the error text when the turn ended on an API error; the error subtypes say why the turn stopped early. In single-prompt (non-streaming-input) mode the process exits after the turn.
