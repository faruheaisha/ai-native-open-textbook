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
sourceRel: "en/permission-modes.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permission-modes.md"
sourceSha256: "6b8fc8344f52131aab75fcba4eafee2853287d6d2cc3398dde09f46b4d52a2ff"
pageSha256: "1e4bae77593d8352310e77e5731eeef7155ab6efc1bf59f32fc685d2333fa4d7"
contentMode: "local-full"
zh: ""
---

## Available modes

Each mode makes a different tradeoff between convenience and oversight. The table below shows what Claude can do without a permission prompt in each mode. Manual mode appears under its config value, `default`.

| Mode                                                                | What runs without asking                                                                                  | Best for                                        |
| :------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| `default`                                                           | Reads only                                                                                                | Reviewing every action yourself, sensitive work |
| [`acceptEdits`](#auto-approve-file-edits-with-acceptedits-mode)     | Reads, file edits, and common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, etc.)                    | Iterating on code you're reviewing              |
| [`plan`](#analyze-before-you-edit-with-plan-mode)                   | Reads, plus classifier-approved commands when [auto mode](#eliminate-prompts-with-auto-mode) is available | Exploring a codebase before changing it         |
| [`auto`](#eliminate-prompts-with-auto-mode)                         | Everything, with background safety checks                                                                 | Long tasks, reducing prompt fatigue             |
| [`dontAsk`](#allow-only-pre-approved-tools-with-dontask-mode)       | Only pre-approved tools                                                                                   | Locked-down CI and scripts                      |
| [`bypassPermissions`](#skip-all-checks-with-bypasspermissions-mode) | Everything                                                                                                | Isolated containers and VMs only                |

The mode that reviews every action is named **Manual** in the CLI, in `claude --help`, in the VS Code and JetBrains extensions, and in the desktop app. Its config value is `default`, which is what hooks and SDK integrations use. The CLI accepts `manual` as an alias wherever you type the value, for example `claude --permission-mode manual` or `"defaultMode": "manual"`. The Manual label and the `manual` alias require Claude Code v2.1.200 or later. The desktop app's label doesn't depend on your CLI version.

Writes to [protected paths](#protected-paths) are never auto-approved except in `bypassPermissions` mode and in plan-mode sessions where bypass permissions are available, meaning sessions started in a way that [puts `bypassPermissions` in the mode cycle](#switch-permission-modes).

Modes set the baseline. Layer [permission rules](https://code.claude.com/docs/en/permissions#manage-permissions) on top to pre-approve or block specific tools. Deny rules block in every mode, including `bypassPermissions`. Deny and ask rules don't apply to [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior) as long as Claude still has at least one other tool it can call. Allow rules have no effect in `bypassPermissions`.

<h3 id="actions-no-mode-auto-approves">
  Actions no mode auto-approves
</h3>

Claude Code doesn't auto-approve the following in any mode, including `bypassPermissions`. Each bullet links to the section that says what happens instead in each mode:

* Tools matched by an explicit [ask rule](https://code.claude.com/docs/en/permissions#manage-permissions)
* Connector tools your organization [set to `ask`](https://code.claude.com/docs/en/mcp#organization-controls-on-connector-tools), in sessions where that setting reaches Claude Code
* Tools that require user interaction: the built-in `AskUserQuestion` tool and MCP tools marked [`requiresUserInteraction`](https://code.claude.com/docs/en/mcp#require-approval-for-a-specific-tool)
* `rm` and `rmdir` removals targeting a [critical path](#critical-paths), which no allow rule or `PreToolUse` hook `"allow"` approves
* The [cross-session messaging safeguards](#skip-all-checks-with-bypasspermissions-mode)
* Reads outside the working directories while [`permissions.blockReadsOutsideWorkingDirectories`](https://code.claude.com/docs/en/settings-reference#permissions-blockreadsoutsideworkingdirectories) is on: recognized file-reading Bash commands and any [unsandboxed retry](https://code.claude.com/docs/en/sandboxing#the-unsandboxed-retry-escape-hatch) that needs approval to run outside the sandbox prompt even in auto mode and `bypassPermissions` mode. Requires Claude Code v2.1.257 or later
