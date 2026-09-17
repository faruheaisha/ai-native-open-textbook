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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-rate-limit-unified-windows.md"
sourceRel: "system-prompts/data-rate-limit-unified-windows.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-rate-limit-unified-windows.md"
sourceSha256: "1190ec079810b7f1e8c992fc558d1f0f655df7a236b8bcd5bdbbe85436ce82a7"
pageSha256: "1190ec079810b7f1e8c992fc558d1f0f655df7a236b8bcd5bdbbe85436ce82a7"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Per-window usage for the session (5-hour), weekly (7-day), and overage-included weekly (per-model bucket; present only for accounts whose responses carry that window) subscription rate-limit windows, as read from the anthropic-ratelimit-unified-* response headers. utilization is the fraction of the window used (usually 0-1, same scale as the top-level utilization field; values above 1 occur when usage legitimately runs past a window's cap, e.g. lower-priority episodes past the 5-hour limit); resetsAt is unix epoch seconds. Unlike the top-level status/utilization fields, which describe the currently limiting window, both windows are tracked on every observation, and events are emitted when a window's rounded percentage or reset time moves, not only on status transitions. Windows absent from the account state are absent here. Absent until the first response carrying these headers is observed, and always absent for API-key, Bedrock, and Vertex sessions, whose responses do not carry them.
