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
pageSha256: "38ccf40d575acb00104c0d5f0743e4598f66e469e13736bbe26cc49af4d18a2f"
contentMode: "local-full"
zh: ""
---

## Settings precedence

Permission rules follow the same [settings precedence](https://code.claude.com/docs/en/settings#settings-precedence) as all other Claude Code settings, with managed settings highest: no other level, including command line arguments, can override a managed permission rule.

If a tool is denied at any level, no other level can allow it. For example, a managed settings deny can't be overridden by `--allowedTools`, and `--disallowedTools` can add restrictions beyond what managed settings define.

The same holds across settings scopes: if user settings allow a permission and project settings deny it, the deny rule blocks it. The reverse is also true: a user-level deny blocks a project-level allow, because deny rules from any scope are evaluated before allow rules.

Embedding hosts can supply additional managed policy via the SDK `managedSettings` option, including permission allow rules unless the admin sets the `allowManaged*Only` locks; [Deliver policy to Claude Desktop sessions](https://code.claude.com/docs/en/claude-apps-gateway#deliver-policy-to-claude-desktop-sessions) covers when embedder policy applies at all.
