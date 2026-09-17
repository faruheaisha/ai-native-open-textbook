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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-dialog-expiry-setting.md"
sourceRel: "system-prompts/data-dialog-expiry-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-dialog-expiry-setting.md"
sourceSha256: "83cb40e29945571f41fd56e4423425f9f1385cbb5e4d02583c0f45e133e56ecf"
pageSha256: "83cb40e29945571f41fd56e4423425f9f1385cbb5e4d02583c0f45e133e56ecf"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Max time a permission/user dialog forwarded to a remote client stays parked awaiting an answer, and how long a HELD cross-session message awaits approval, before either resolves to its safe no-action default (cancelled / dropped-with-denial). Defaults to 5m to match the long-standing remote-dialog deadline; "never" disables the deadline. Local-only permission prompts (no remote client) are unaffected. The CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS env var, when set, overrides this. Read from trusted sources only (never a checked-in repo settings file).
