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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-syncclaudeaiskills-setting.md"
sourceRel: "system-prompts/data-syncclaudeaiskills-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-syncclaudeaiskills-setting.md"
sourceSha256: "3123d180d7b8951b8521cdf4701b9fd6757b332afd135b6554c08daf188536ea"
pageSha256: "3123d180d7b8951b8521cdf4701b9fd6757b332afd135b6554c08daf188536ea"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Set to false to turn off syncing of the skills you have enabled on claude.ai. In your user settings (or managed settings): nothing more is downloaded, previously synced skills (~/.claude/skills/synced) can no longer be run, are hidden from every session started afterwards, and are moved to ~/.claude/skills/.trash at the next launch (deleted after cleanupPeriodDays; re-downloaded, not restored, if you re-enable). In .claude/settings.local.json or --settings: downloads stop and synced skills are blocked and hidden for sessions in that workspace or invocation only (nothing is moved). Not read from project settings (.claude/settings.json). Only false is honored — the feature is enabled server-side for your account, so setting true does not turn it on early. While it is on, synced skills are available in every session, re-synced every 10 minutes, and removed when you disable them on claude.ai. Only applies when signed in with your Claude account.
