---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/plugins-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugins-reference.md"
sourceSha256: "c75119ccd8973aad659373d726d412bbe3f5184e6d0ca0d2064512cad255f0a3"
pageSha256: "3b09a60003637893eb573f9f6ec422e50865bbba5164bd5c4a6487397116fa30"
contentMode: "local-full"
zh: ""
---

## Plugin installation scopes

When you install a plugin, you choose a **scope** that determines where the plugin is available and who else can use it:

| Scope     | Settings file                            | Use case                                                                    |
| :-------- | :--------------------------------------- | :-------------------------------------------------------------------------- |
| `user`    | `~/.claude/settings.json`                | Personal plugins available across all projects (default)                    |
| `project` | `.claude/settings.json`                  | Team plugins shared via version control                                     |
| `local`   | `.claude/settings.local.json`            | Project-specific plugins, gitignored when Claude Code saves a setting to it |
| `managed` | [Managed settings](https://code.claude.com/docs/en/managed-settings) | Managed plugins (read-only, update only)                                    |

Plugins use the same scope system as other Claude Code configurations. For installation instructions and scope flags, see [Install plugins](https://code.claude.com/docs/en/discover-plugins#install-plugins). For a complete explanation of scopes, see [Configuration scopes](https://code.claude.com/docs/en/settings#where-settings-live).

***
