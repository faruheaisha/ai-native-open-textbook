---
title: "Deploy managed settings"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/managed-settings.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/managed-settings.md"
sourceSha256: "d004e5b69cafe5d2bb7b626e4b76989e9712594969ab0ca8ce430cadf56dcb6b"
pageSha256: "caaf99bee914625d96b852409d09697ff4ba70584c90801140369c151c1895cb"
contentMode: "local-full"
zh: ""
---

# Deploy managed settings

> Deploy managed settings to every developer's machine: delivery mechanisms per OS, how Claude Code combines managed sources, and how to verify enforcement.

Managed settings are the settings your organization deploys to every developer's machine. Claude Code applies them above every other level, so no user, project, local, or `--settings` value overrides them, apart from a few [security-sensitive exceptions](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence) where a stricter value from a lower level still counts.

This page is for the administrator who deploys managed settings or debugs why one isn't applying. To decide what to enforce, start with the [Decide what to enforce](https://code.claude.com/docs/en/admin-setup#decide-what-to-enforce) table. For the claude.ai console path, see [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings). For which file a developer's own values go in, see [Settings](https://code.claude.com/docs/en/settings).

## 本篇目录

- [Deploy a managed settings file](https://code.claude.com/docs)
- [Choose a delivery mechanism](https://code.claude.com/docs)
- [How Claude Code combines managed sources](https://code.claude.com/docs)
- [Check that a policy is in force](https://code.claude.com/docs)
- [Keys only a managed source can set](https://code.claude.com/docs)
- [Turn telemetry off for your organization](https://code.claude.com/docs)
- [See also](https://code.claude.com/docs)
