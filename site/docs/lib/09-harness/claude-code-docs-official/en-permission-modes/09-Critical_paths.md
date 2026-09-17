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
pageSha256: "4c811158d60c8ff9398cf4824347b4e61fb60764c9d7490f0bc9b84a5ca42ce7"
contentMode: "local-full"
zh: ""
---

## Critical paths

Claude Code never lets a [`permissions.allow`](https://code.claude.com/docs/en/permissions#manage-permissions) rule or a [`PreToolUse` hook](https://code.claude.com/docs/en/permissions#extend-permissions-with-hooks) that returns `"allow"` approve an `rm` or `rmdir` command that targets a critical path, even in modes that skip other prompts. This circuit breaker guards against model error. A matching deny rule still blocks the command outright.

What happens instead depends on your permission mode:

| Mode                     | What Claude Code does with a critical-path removal                                                                                                                                  |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`, `acceptEdits` | Asks you to approve it                                                                                                                                                              |
| `plan`                   | Asks you to approve it. With [auto mode available during planning](#analyze-before-you-edit-with-plan-mode) and no bypass permissions available, sends it to the classifier instead |
| `auto`                   | Sends it to the [classifier](#eliminate-prompts-with-auto-mode)                                                                                                                     |
| `dontAsk`                | Denies it                                                                                                                                                                           |
| `bypassPermissions`      | Asks you to approve it                                                                                                                                                              |

If an explicit [ask rule](https://code.claude.com/docs/en/permissions#manage-permissions) matches the command, Claude Code asks you even in `auto` mode. In modes that ask, a [`PermissionRequest` hook](https://code.claude.com/docs/en/hooks#permissionrequest) can answer the prompt the way it answers any other.

Claude Code treats an `rm` or `rmdir` target as a critical path when it is any of the following:

* The filesystem root
* Top-level directories, meaning any direct child of the root, such as `/usr`, `/etc`, or `/data`
* Your home directory
* Windows drive roots and their top-level directories, such as `C:\` and `C:\Windows`
* Your working directory and its parents
* Your additional working directories and their parents, but only when the removal is a glob under one of them, such as `rm -rf <dir>/*`. `rm -rf <dir>` on the directory itself doesn't trigger this check

Claude Code also treats a glob or trailing slash directly under a shell variable, such as `rm -rf "$DIR"/*`, as a critical-path removal, because the command becomes a removal from the filesystem root when the variable is empty.

Hiding the removal inside command substitution with `$(...)` or backticks, or process substitution with `<(...)`, doesn't skip the check. Claude Code finds a critical-path removal whether it sits inside the substitution, as in `echo "$(rm -rf ~)"`, or elsewhere in the same command.

### Remove-Item in PowerShell

When you enable the [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool), Claude Code gives `Remove-Item` its own check, separate from the `rm` critical-path list. The outcome depends on the target, and the first matching case applies:

* **System paths**: the filesystem root and its top-level directories, drive roots and their top-level directories, and your home directory. Claude Code denies the command in every mode, without asking you.
* **Wildcards**: a bare `*`, or any target ending in `/*` or `\*`, including a glob under a shell variable such as `$dir/*`. Claude Code denies the command in every mode, without asking you, before the [classifier](#eliminate-prompts-with-auto-mode) sees it.
* **Your working directory or one of its parents, with `-Recurse`**: Claude Code treats the command like any other that needs approval in your permission mode, so it asks you in modes that ask, sends it to the classifier in `auto` mode, and denies it in `dontAsk` mode. `bypassPermissions` mode skips this check.
