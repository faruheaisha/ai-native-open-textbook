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
pageSha256: "bc2646b19cb2ae4e54f34772876528d7edaaad16f2d47ff483e26a272ea62184"
contentMode: "local-full"
zh: ""
---

## Manage permissions

You can view and manage Claude Code's tool permissions with `/permissions`. The dialog lists all permission rules and the `settings.json` file each rule comes from. You can open the dialog while Claude is working: when you add or remove a rule, Claude Code applies the change starting with Claude's next tool call in the same turn. Before v2.1.234, Claude Code queued the command until the turn finished.

* **Allow** rules let Claude Code use the specified tool without manual approval.
* **Ask** rules prompt for confirmation whenever Claude Code tries to use the specified tool.
* **Deny** rules prevent Claude Code from using the specified tool.

Rules are evaluated in order: deny, then ask, then allow. The first match in that order determines the outcome, and rule specificity doesn't change the order.

A broad deny rule like `Bash(aws *)` blocks every matching call, including calls that also match a narrower allow rule like `Bash(aws s3 ls)`, so a deny rule can't carry allowlist exceptions. The same precedence applies between ask and allow: a matching ask rule prompts even when a more specific allow rule also matches the same call.

Deny rules behave differently depending on whether they name a tool or scope a pattern within one. A bare tool name like `Bash` removes the tool from Claude's context entirely, so Claude never sees it. Bare-name removal applies to every tool except [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior): a deny rule can't remove it while any other tool remains, and an ask rule never prompts for it. A scoped rule like `Bash(rm *)` leaves the tool available and blocks matching calls when Claude attempts them.

  Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or `CLAUDE.md` shape what Claude tries to do, but they don't change what Claude Code allows. To grant or revoke access, use `/permissions`, the rules described here, a [permission mode](https://code.claude.com/docs/en/permission-modes), or a [PreToolUse hook](#extend-permissions-with-hooks).

When [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) is available to your session, the dialog also includes the [auto mode classifier rules](https://code.claude.com/docs/en/auto-mode-config#edit-rules-from-permissions). Select the **Auto mode** tab to view them.
