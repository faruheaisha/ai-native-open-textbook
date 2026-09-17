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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-plugin-warnings-field.md"
sourceRel: "system-prompts/data-sdk-plugin-warnings-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-plugin-warnings-field.md"
sourceSha256: "383693bbff870aaaad4fcc325560700e5f9b07659b3090746bb68a9e24cfc44b"
pageSha256: "383693bbff870aaaad4fcc325560700e5f9b07659b3090746bb68a9e24cfc44b"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Plugin authoring feedback (e.g., a default folder shadowed by a manifest key). When `plugin` matches an entry in `plugins[]`, that plugin loaded and the warning is advisory; warnings with a synthetic `plugin` source (no matching `plugins[]` entry, e.g. workspace-level suppression notices) describe content that did NOT load. The key is omitted when there are no warnings. On connections that persist frames server-side (the local bridge-worker lane) this key is always omitted — plugin diagnostics stay in the local log, so an omitted key there does NOT assert a clean load.
