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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-set-max-thinking-tokens-request-schema.md"
sourceRel: "system-prompts/data-sdk-set-max-thinking-tokens-request-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-set-max-thinking-tokens-request-schema.md"
sourceSha256: "a6c9724465a9f083ffb6790d7b20d1371c010e061880c1af6f3efbbc4d7b4125"
pageSha256: "a6c9724465a9f083ffb6790d7b20d1371c010e061880c1af6f3efbbc4d7b4125"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Sets the maximum number of thinking tokens for extended thinking. When max_thinking_tokens is omitted or null, thinking resets to the session default: any mid-session budget override is cleared (back to the spawn-time budget, if one was set), and thinking stays off for sessions that have it disabled. thinking_display optionally sets the thinking display mode for the rest of the session: a value replaces the session display mode, null clears that override so Claude Code's default display handling applies again, and when omitted the display mode from session start (--thinking-display) is kept.
