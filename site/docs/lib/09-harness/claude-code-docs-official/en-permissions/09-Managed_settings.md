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
sourceRel: "en/permissions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permissions.md"
sourceSha256: "6cc02236c28e33b38f1977f95d5c1b3c8805c0ad97cb377866cd1de1c5cb8cbc"
pageSha256: "9cb74c0caa57002fb5dc39703c4dec56b06833612b3f86495524bfde057c0e3f"
contentMode: "local-full"
zh: ""
---

## Managed settings

For organizations that need centralized control, administrators deploy managed settings that user and project settings can't override, apart from a few [security-sensitive keys](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence). [Deploy managed settings](https://code.claude.com/docs/en/managed-settings) covers the delivery mechanisms, precedence within the managed tier, and the [keys that only managed settings can set](https://code.claude.com/docs/en/managed-settings#managed-only-settings).

One of those keys, [`allowManagedPermissionRulesOnly`](https://code.claude.com/docs/en/settings-reference#allowmanagedpermissionrulesonly), makes managed settings the only settings source of permission rules. Its entry lists every source Claude Code then ignores.

`disableBypassPermissionsMode` is typically placed in managed settings to enforce organizational policy, but it works from any scope. A user can set it in their own settings to lock themselves out of bypass mode.
