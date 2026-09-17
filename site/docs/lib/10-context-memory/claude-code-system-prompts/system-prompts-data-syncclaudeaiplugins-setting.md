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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-syncclaudeaiplugins-setting.md"
sourceRel: "system-prompts/data-syncclaudeaiplugins-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-syncclaudeaiplugins-setting.md"
sourceSha256: "eb1305d1c660329d49ce520438e951b7dbfe3b052170870ddf5b2adcfeebe3ee"
pageSha256: "eb1305d1c660329d49ce520438e951b7dbfe3b052170870ddf5b2adcfeebe3ee"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Set to false to turn off syncing of the plugins you have enabled on claude.ai. In your user settings (or managed settings): nothing more is downloaded, previously synced plugins (~/.claude/plugins/synced) are hidden from every session started afterwards and moved to ~/.claude/plugins/.trash at the next launch (deleted after cleanupPeriodDays; re-downloaded, not restored, if you re-enable). In .claude/settings.local.json or --settings: downloads stop and synced plugins are hidden for sessions in that workspace or invocation only (nothing is moved). Not read from project settings (.claude/settings.json). Only false is honored — the feature is enabled server-side for your account, so setting true does not turn it on early. While it is on, synced plugins load in every session like plugins you installed yourself (a plugin you installed with the same name takes precedence), are re-synced at each launch, and are removed when you disable them on claude.ai. Only applies when signed in with your Claude account.
