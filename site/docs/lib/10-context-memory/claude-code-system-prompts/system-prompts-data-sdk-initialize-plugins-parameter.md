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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-initialize-plugins-parameter.md"
sourceRel: "system-prompts/data-sdk-initialize-plugins-parameter.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-initialize-plugins-parameter.md"
sourceSha256: "71f5d1c2df61dcf7ae7c7e14cfd846d8ae41d8c9da31524c35a729772b9b385d"
pageSha256: "71f5d1c2df61dcf7ae7c7e14cfd846d8ae41d8c9da31524c35a729772b9b385d"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Plugins to load for the session, in the same shape as the SDK `plugins` option: the stdin form of one --plugin-dir flag per entry (--plugin-dir-no-mcp when skipMcpDiscovery is set), so the launch command line does not grow with the plugin count. Loaded only by a CLI launched with --await-initialize, which reads this request during startup before any plugin work. Without that flag, on a repeated initialize, or over a remote session transport the field loads nothing; plugins_applied in the response reports whether the listed plugins are in fact loaded.
