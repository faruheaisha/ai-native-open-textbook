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
sourceRel: "en/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings-reference.md"
sourceSha256: "811cfad7d21b8ebbbd64aeb288e903c6720594286d2a21d2b787639b7ab0ac1b"
pageSha256: "6f9911253782561e1800185dde87e2506f5c821693a1d5750fbb888aa64cb4ec"
contentMode: "local-full"
zh: ""
---

## Permission settings

Decide what Claude can do without asking, which permission mode a session starts in, and what auto mode's classifier allows. For rule syntax and the permission model, see [Configure permissions](https://code.claude.com/docs/en/permissions).

### `allowManagedPermissionRulesOnly`

Make managed settings the only settings source of permission rules. Claude Code then ignores `allow`, `ask`, and `deny` rules in user, project, local, and `--settings` files, ignores `--allowedTools`, hides the always-allow choices in permission prompts, and stops saving new rules.

When [parent settings from an embedding host](https://code.claude.com/docs/en/managed-settings#let-an-embedding-host-add-policy) apply, Claude Code treats them as part of the managed tier: it keeps their `deny` and `ask` rules and drops their `allow` rules and `additionalDirectories`.

`--disallowedTools` rules and the current session's `deny` and `ask` rules still apply, including after Claude Code reloads settings mid-session. They only restrict, so they can't widen what the managed rules grant. Before v2.1.257, Claude Code dropped those command-line and session rules at the first settings reload.

* **Scope**: [`Managed`](#scopes)
* **Type**: Boolean
  * `true`: managed settings become the only settings source of permission rules
  * `false`: Claude Code applies permission rules from user, project, local, and `--settings` files in addition to the managed ones
* **Default**: unset, so Claude Code applies permission rules from user, project, and local settings and from `--settings`, in addition to the managed ones

```json managed-settings.json theme={null}
{
  "allowManagedPermissionRulesOnly": true
}
```

This key doesn't lock down the MCP server allowlist; for that, set [`allowManagedMcpServersOnly`](#allowmanagedmcpserversonly). See [Managed-only settings](https://code.claude.com/docs/en/managed-settings#managed-only-settings).

### `autoMode`

Add your own rules to what the [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) classifier blocks and allows. Use it to tell the classifier which repos, buckets, and domains your organization trusts, so it stops blocking routine internal operations. The classifier ships with [built-in allow and deny rules](https://code.claude.com/docs/en/auto-mode-config#inspect-the-defaults-and-your-effective-config). Include the literal string `"$defaults"` in an array to keep those built-in rules at that position and add yours around them; leave it out to replace them with yours.

* **Scope**: [`User or managed`](#scopes)
* **Type**: object with `environment`, `allow`, `soft_deny`, and `hard_deny` arrays of prose rules, plus the [`classifyAllShell`](#automode-classifyallshell) Boolean
* **Default**: unset, so the classifier uses only its [built-in rules](https://code.claude.com/docs/en/auto-mode-config#inspect-the-defaults-and-your-effective-config)

This example keeps the built-in `soft_deny` rules, through `"$defaults"`, and adds one more that blocks `terraform apply`:

```json settings.json theme={null}
{
  "autoMode": {
    "soft_deny": ["$defaults", "Never run terraform apply"]
  }
}
```

When more than one of those files sets the same array, Claude Code concatenates the entries. For the rule format and how each array is applied, see [Configure auto mode](https://code.claude.com/docs/en/auto-mode-config).

### `autoMode.classifyAllShell`

Send every Bash and PowerShell command through the auto mode classifier while auto mode is active. By default, auto mode suspends only allow rules that could run arbitrary code: tool-wide and wildcard rules such as `Bash(*)`, and interpreter or shell-wrapper prefixes such as `Bash(python *)`. A command that any other allow rule matches, such as `Bash(npm test)`, skips the classifier, and a destructive argument the rule's prefix didn't anticipate can get through unseen. Setting this key suspends every shell allow rule for the session so the classifier sees every command. Requires Claude Code v2.1.193 or later.

* **Scope**: [`User or managed`](#scopes). Read wherever [`autoMode`](#automode) is read.
* **Type**: Boolean
  * `true`: while auto mode is active, Claude Code sends every Bash and PowerShell command through the classifier and suspends your shell allow rules; outside auto mode the rules still apply
  * `false`: auto mode suspends only allow rules that could run arbitrary code, such as `Bash(*)` and `Bash(python *)`; a command that any other allow rule matches skips the classifier, and every other shell command goes through it
* **Default**: `false`

```json settings.json theme={null}
{
  "autoMode": {
    "classifyAllShell": true
  }
}
```

See [Route all shell commands through the classifier](https://code.claude.com/docs/en/auto-mode-config#route-all-shell-commands-through-the-classifier). Requires Claude Code v2.1.193 or later.

### `disableAutoMode`

Remove [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) from the `Shift+Tab` cycle. Any session that would otherwise [start in auto mode](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in), whether from `--permission-mode auto`, a settings file, or the built-in default, starts in `default` instead. Administrators set it in managed settings to prevent developers in their organization from using auto mode.

* **Scope**: [`Any file`](#scopes). Most useful in [managed settings](https://code.claude.com/docs/en/managed-settings), where users can't override it. Also accepted under `permissions` as `permissions.disableAutoMode`.
* **Type**: the string `"disable"`
* **Default**: unset

```json settings.json theme={null}
{
  "disableAutoMode": "disable"
}
```

### `permissions`

Control which tools Claude can use without asking, which ones always prompt, and which ones are blocked, and set the [permission mode](https://code.claude.com/docs/en/permission-modes) a session starts in. Every `permissions.*` key below nests under this object.

* **Scope**: [`Any file`](#scopes)
* **Type**: object with `allow`, `ask`, `deny`, `additionalDirectories`, `blockReadsOutsideWorkingDirectories`, `defaultMode`, `disableBypassPermissionsMode`, and `disableAutoMode`
* **Default**: unset

This example approves `npm run` commands without asking, prompts before `git push`, blocks reads of `.env`, and starts sessions in `acceptEdits`:

```json settings.json theme={null}
{
  "permissions": {
    "allow": ["Bash(npm run *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)"],
    "defaultMode": "acceptEdits"
  }
}
```

The three rule arrays share one syntax; see [Permission rule syntax](#permission-rule-syntax) under `permissions.allow`. For how permission rules from different files combine, see [how permission rules merge across scopes](https://code.claude.com/docs/en/permissions#settings-precedence); for how settings keys in general combine, see [Settings precedence](https://code.claude.com/docs/en/settings#settings-precedence) on the settings guide.

### `useAutoModeDuringPlan`

Choose whether Claude Code uses the auto mode classifier to review shell commands in plan mode. With the default `true`, the classifier reviews each command during planning when auto mode is available and you see no prompt. Set `false` to get a permission prompt for every command outside the built-in read-only set. Appears in `/config` as **Use auto mode during plan**.

* **Scope**: [`User, local, or managed`](#scopes). A repository can't turn it off for you.
* **Type**: Boolean
  * `true`: the same as unset; when auto mode is available, the classifier reviews each shell command during planning instead of prompting you for it. A `false` in any of these files still turns it off
  * `false`: you get a permission prompt for every command outside the built-in read-only set
* **Default**: `true`

```json settings.json theme={null}
{
  "useAutoModeDuringPlan": false
}
```

### `permissions.allow`

List the tool uses Claude Code approves without asking you. In an MCP rule, `*` can appear only in the tool name after the `mcp__<server>__` prefix, such as `mcp__github__get_*`; it can't appear in the server name.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of permission rule strings
* **Default**: unset
* **Per-session overrides**: `--allowedTools` adds allow rules for one session, and a deny rule from any settings file still blocks a tool it names

This example approves `git diff` and lets Claude Code read your `.zshrc` without asking:

```json settings.json theme={null}
{
  "permissions": {
    "allow": ["Bash(git diff *)", "Read(~/.zshrc)"]
  }
}
```

Claude Code applies `allow` rules from a project's `.claude/settings.json` only after you accept the [workspace trust dialog](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) for that folder.

#### Permission rule syntax

Permission rules follow the format `Tool` or `Tool(specifier)`. Claude Code evaluates `deny` rules first, then `ask`, then `allow`, and the first match decides regardless of how specific each rule is; see the [permission rule evaluation order](https://code.claude.com/docs/en/permissions#manage-permissions).

Each row shows one rule shape and what it matches.

| Rule                           | What it matches                  |
| :----------------------------- | :------------------------------- |
| `Bash`                         | Every Bash command               |
| `Bash(npm run *)`              | Commands starting with `npm run` |
| `Read(./.env)`                 | Reads of the `.env` file         |
| `WebFetch(domain:example.com)` | Fetch requests to example.com    |

For the complete rule syntax, including wildcard behavior, tool-specific patterns for Read, Edit, WebFetch, MCP, and Agent rules, and the security limitations of Bash patterns, see [Permission rule syntax](https://code.claude.com/docs/en/permissions#permission-rule-syntax).

### `permissions.ask`

List the tool uses that prompt you for confirmation even in a permission mode that would otherwise approve them, such as `acceptEdits` or `bypassPermissions`. In `dontAsk` mode Claude Code denies a matching tool use instead of prompting.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of permission rule strings
* **Default**: unset

```json settings.json theme={null}
{
  "permissions": {
    "ask": ["Bash(git push *)"]
  }
}
```

&lt;span id="exclude-sensitive-files" />

### `permissions.deny`

List the tool uses Claude Code blocks. Use it for files that hold API keys, secrets, or environment values: Claude Code excludes matching files from file discovery and search results, denies reads of them, and blocks the [Edit and Write tools](https://code.claude.com/docs/en/permissions#read-and-edit) on the matching paths. Read and Edit deny rules apply to Claude's built-in file tools, to file commands Claude Code recognizes in Bash, such as `cat`, `head`, `tail`, and `sed`, and to the targets of Bash [redirections](https://code.claude.com/docs/en/permissions#redirections) such as `> file` and `< file`; they don't apply to a command that reads files without naming them, such as `grep -r pattern .`, or to arbitrary subprocesses, so for OS-level enforcement [enable the sandbox](https://code.claude.com/docs/en/sandboxing).

* **Scope**: [`Any file`](#scopes)
* **Type**: array of permission rule strings
* **Default**: unset
* **Per-session overrides**: `--disallowedTools` adds deny rules for one session alongside this key

This example denies reads of `.env` files, the `secrets` directory, and a credentials file, and blocks `curl` commands:

```json settings.json theme={null}
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)",
      "Bash(curl *)"
    ]
  }
}
```

Tool names accept glob patterns, so `"*"` denies every tool and `"mcp__*"` denies every MCP tool. Claude Code ignores a deny rule for the [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior) tool as long as any other tool is still available to Claude. A `Bash` deny rule matches the command as Claude writes it, so `Bash(curl *)` doesn't stop `/usr/bin/curl` or `sh -c 'curl …'`; see [what a Bash rule doesn't match](https://code.claude.com/docs/en/permissions#bash-rule-limits). This key replaces the deprecated `ignorePatterns` configuration.

### `permissions.additionalDirectories`

Give Claude file access to directories outside the one you started in, as additional [working directories](https://code.claude.com/docs/en/permissions#working-directories). Most `.claude/` configuration is [not discovered](https://code.claude.com/docs/en/permissions#additional-directories-grant-file-access-not-configuration) from these directories.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of directory paths
* **Default**: unset
* **Per-session overrides**: `--add-dir` and `/add-dir` add directories for one session alongside this key

```json settings.json theme={null}
{
  "permissions": {
    "additionalDirectories": ["../docs/"]
  }
}
```

Like `allow` rules, entries in a project's `.claude/settings.json` take effect only after you accept the [workspace trust dialog](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) for that folder.

### `permissions.blockReadsOutsideWorkingDirectories`

Stop Claude from reading paths outside the session's [working directories](https://code.claude.com/docs/en/permissions#working-directories) with the Read, Grep, Glob, and LSP tools, in every permission mode including `bypassPermissions`. A Bash command that reads a matching path through a file command Claude Code recognizes, such as `cat`, prompts you even in auto mode and `bypassPermissions` mode. Requires Claude Code v2.1.257 or later.

Claude Code also writes `true` here when you choose to block such reads on [auto mode's prompt before the first read outside the working directories](https://code.claude.com/docs/en/permission-modes#first-read-outside-the-working-directories).

* **Scope**: [`Any file`](#scopes). If any settings source sets `true`, the block applies, so a repository's checked-in file can turn the block on for a project but can't lift a block you set.
* **Type**: Boolean
  * `true`: file reads outside the working directories are blocked
  * `false`: the same as unset; a `true` in any other settings file still blocks
* **Default**: unset, so reads outside the working directories follow your permission mode and rules

```json settings.json theme={null}
{
  "permissions": {
    "blockReadsOutsideWorkingDirectories": true
  }
}
```

If only a repository's checked-in settings file adds a directory, the block still applies to reads there. Files Claude Code itself needs stay readable, such as your skills, plugins, rules, agents, commands, and the `CLAUDE.md` memory file under `~/.claude/`.

When the [sandbox](https://code.claude.com/docs/en/sandboxing) is on, the block also denies sandboxed commands read access to home directories and mounted-volume roots outside the working directories. A retry that needs approval to [run outside the sandbox](https://code.claude.com/docs/en/sandboxing#the-unsandboxed-retry-escape-hatch) prompts you even in `bypassPermissions` mode. Files a tool reads from your home directory, such as `~/.gitconfig`, are denied with the rest; re-open a specific path with [`sandbox.filesystem.allowRead`](#sandbox-filesystem-allowread) when a tool needs it.

When the session's working directory is a linked [git worktree](https://code.claude.com/docs/en/worktrees), including one Claude Code entered mid-session, the repository's common `.git` directory stays readable and writable to sandboxed commands, so git keeps working there.

### `permissions.defaultMode`

Set the [permission mode](https://code.claude.com/docs/en/permission-modes) new sessions start in. When you leave it unset, sessions start in the [built-in default](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in) for your plan and surface.

* **Scope**: [`Any file`](#scopes). `auto` and `bypassPermissions` don't take effect from project or local settings, so set them in `~/.claude/settings.json` instead. Before v2.1.257, `bypassPermissions` took effect from any file. For conversations the VS Code extension starts, Claude Code reads only user, managed, and `--settings` values.
* **Type**: string, one of:
  * `"default"`: Claude Code runs only reads without asking
  * `"acceptEdits"`: Claude Code also runs file edits and common filesystem commands such as `mkdir` and `mv` without asking
  * `"plan"`: Claude Code reads and plans but blocks edits until you approve a plan
  * `"auto"`: Claude Code runs everything, with background safety checks
  * `"dontAsk"`: Claude Code runs only pre-approved tools and auto-denies every call that would otherwise prompt
  * `"bypassPermissions"`: Claude Code runs everything without asking
  * `"manual"`: an alias for `"default"`, in Claude Code v2.1.200 or later
* **Default**: unset
* **Per-session overrides**: `--permission-mode`, and its equivalent `--dangerously-skip-permissions` for `bypassPermissions`, take precedence over this key for one session

```json settings.json theme={null}
{
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}
```

Permission rules layer on top of every mode: `deny` rules block in every mode, including `bypassPermissions`. See [Permission modes](https://code.claude.com/docs/en/permission-modes). `manual` names the permission mode labeled Manual in the CLI and the VS Code extension; the alias requires Claude Code v2.1.200 or later. In Claude Code on the web, Claude Code honors only `acceptEdits`, `plan`, `default`, and `auto` from this key. For conversations the VS Code extension starts, see [which setting the extension reads for the starting permission mode](https://code.claude.com/docs/en/permission-modes#switch-permission-modes).

### `permissions.disableBypassPermissionsMode`

Prevent anyone from entering `bypassPermissions` mode. Claude Code then rejects the `--dangerously-skip-permissions` flag, and ignores an [agent definition's](https://code.claude.com/docs/en/sub-agents#permission-modes) `permissionMode: bypassPermissions`, so the subagent runs with the parent session's permission mode.

* **Scope**: [`Any file`](#scopes). Typically set in [managed settings](https://code.claude.com/docs/en/managed-settings) to enforce organizational policy.
* **Type**: the string `"disable"`
* **Default**: unset
* **Per-session overrides**: this key takes precedence over `--dangerously-skip-permissions`, which Claude Code rejects while the key is set

```json settings.json theme={null}
{
  "permissions": {
    "disableBypassPermissionsMode": "disable"
  }
}
```

Before v2.1.223, Claude Code applied the frontmatter permission mode even with bypass disabled.

### `skipAutoPermissionPrompt`

Skip the one-time notice describing [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) that Claude Code shows when you first enter auto mode yourself, for example through your own settings or the mode selector, rather than when the built-in default starts a session in it. Claude Code shows that notice once and then records that it was shown, so this key only matters where the notice hasn't appeared yet.

* **Scope**: [`User or managed`](#scopes). A repository can't set it for you.
* **Type**: Boolean
  * `true`: Claude Code skips the notice
  * `false`: the same as unset; the notice appears once unless another of these files sets `true`
* **Default**: unset, so the notice appears once

```json settings.json theme={null}
{
  "skipAutoPermissionPrompt": true
}
```

### `skipDangerousModePermissionPrompt`

Skip the confirmation dialog Claude Code shows before a session enters `bypassPermissions` mode, whether from `--dangerously-skip-permissions` or from `defaultMode: "bypassPermissions"`. Claude Code writes `true` here in your user settings when you accept that dialog once.

* **Scope**: [`User, local, or managed`](#scopes). An untrusted repository can't skip the dialog for you.
* **Type**: Boolean
  * `true`: Claude Code skips the confirmation dialog before a session enters `bypassPermissions` mode
  * `false`: the same as unset; the dialog appears unless another of these files sets `true`
* **Default**: unset, so the dialog appears

```json settings.json theme={null}
{
  "skipDangerousModePermissionPrompt": true
}
```
