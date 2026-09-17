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
pageSha256: "3e7a893ce6631ae6c9a8b4181883ce443bd09c10573bbc940ea4cd444f8ce4d5"
contentMode: "local-full"
zh: ""
---

## Permission modes

Claude Code supports several permission modes that control how it approves tool calls. See [Permission modes](https://code.claude.com/docs/en/permission-modes) for when to use each one. To change the mode sessions start in, set `defaultMode` in your [settings files](https://code.claude.com/docs/en/settings#where-settings-live). [Which mode a session starts in](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in) covers the built-in default for each plan and what the VS Code extension reads.

| Mode                | Description                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`           | Prompts for permission on first use of each tool. Labeled Manual in the CLI, the VS Code and JetBrains extensions, and the desktop app, and Claude Code accepts `manual` as an alias. The label and alias require Claude Code v2.1.200 or later. The desktop app's label doesn't depend on your CLI version                                                                                            |
| `acceptEdits`       | Automatically accepts file edits and common filesystem commands such as `mkdir`, `touch`, `mv`, and `cp` for paths in the working directory or `additionalDirectories`                                                                                                                                                                                                                                 |
| `plan`              | Claude reads files and runs read-only shell commands to explore but doesn't edit your source files; with [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) available, classifier-approved commands also run. Labeled Plan in the CLI and the VS Code extension                                                                                                                        |
| `auto`              | Auto-approves tool calls with background safety checks that verify actions align with your request                                                                                                                                                                                                                                                                                                     |
| `dontAsk`           | Auto-denies tools unless pre-approved via `/permissions` or `permissions.allow` rules. `AskUserQuestion`, MCP tools marked [`requiresUserInteraction`](https://code.claude.com/docs/en/mcp#require-approval-for-a-specific-tool), and connector tools [your organization set to `ask`](https://code.claude.com/docs/en/mcp#organization-controls-on-connector-tools) in sessions where that setting reaches Claude Code are denied even if you've allowed them |
| `bypassPermissions` | Skips permission prompts, except for the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves)                                                                                                                                                                                                                                                                           |

  In `bypassPermissions` mode, Claude Code skips permission prompts, including for writes to [protected paths](https://code.claude.com/docs/en/permission-modes#protected-paths) such as `.git` and `.claude`. The [cross-session messaging safeguards](https://code.claude.com/docs/en/permission-modes#skip-all-checks-with-bypasspermissions-mode) still apply. Only use this mode in isolated environments like containers or VMs where Claude Code can't cause damage.

To prevent `bypassPermissions` or `auto` mode from being used, set `permissions.disableBypassPermissionsMode` or `permissions.disableAutoMode` to `"disable"` in any [settings file](https://code.claude.com/docs/en/settings#where-settings-live). These are most useful in [managed settings](#managed-settings) where they can't be overridden.
