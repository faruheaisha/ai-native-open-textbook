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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sandbox-credential-environment-no-match-setting.md"
sourceRel: "system-prompts/data-sandbox-credential-environment-no-match-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sandbox-credential-environment-no-match-setting.md"
sourceSha256: "77d638559bdb41aa2f6a1c557d365d0cd7717ba22e09a19eab84f8998bd020c5"
pageSha256: "77d638559bdb41aa2f6a1c557d365d0cd7717ba22e09a19eab84f8998bd020c5"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

What to do when `extract` matches nothing in the value. `warn` (default) emits a stderr warning and lets the variable pass through unmasked (fail-open, for credentials that may be legitimately absent); `deny` unsets the variable inside the sandbox (fail-closed); `error` aborts at sandbox setup so nothing runs until the config is fixed. Only meaningful when mode is `mask` and `extract` is set without `decode`. On a mask entry with `decode`, the runtime takes the decode path and never consults this field, so a fail-closed setting
