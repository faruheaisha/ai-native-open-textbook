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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-auto-compact-inputs-changed-event-schema.md"
sourceRel: "system-prompts/data-auto-compact-inputs-changed-event-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-auto-compact-inputs-changed-event-schema.md"
sourceSha256: "5d406ab19de638c27e1b681a012738bb9e327bd6a813ce63ef5d846b8d0f14b9"
pageSha256: "5d406ab19de638c27e1b681a012738bb9e327bd6a813ce63ef5d846b8d0f14b9"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Worker-resolved auto-compact state, emitted by CCR workers at boot, whenever the resolved state changes (/autocompact, model switch, settings change), re-checked at each turn start, and re-emitted after a conversation reset. Thin clients adopt it so the "% until auto-compact" indicator counts down to the worker's real compaction trigger instead of re-resolving against client-local state. Turn-scoped divergence is accepted: a turn running under a skill/command frontmatter model override compacts against that model's window while the frame keeps the resting model's (the local indicator shares this limitation). From sessionState.onAutocompactInputsChanged.
