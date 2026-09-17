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
pageSha256: "ffd94f52863d5ed5a159879080fac29e6595934ec7649e0ae44399a173b49f71"
contentMode: "local-full"
zh: ""
---

## Agents, sessions, and worktrees

Set the default agent, control teammates and cross-session messaging, and configure worktrees. See [Subagents](https://code.claude.com/docs/en/sub-agents) and [Worktrees](https://code.claude.com/docs/en/worktrees).

### `agent`

Run the main thread as a named [subagent](https://code.claude.com/docs/en/sub-agents#invoke-subagents-explicitly), so Claude Code applies that subagent's system prompt, tool restrictions, and model to your session. The same key sets the default agent for sessions you dispatch from `claude agents`.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, the name of a built-in or custom agent
* **Default**: unset, so the main thread runs as Claude Code's default agent
* **Per-session overrides**: `--agent` takes precedence over this key for one session

```json settings.json theme={null}
{
  "agent": "code-reviewer"
}
```

A plugin's own `settings.json` can also supply this key; see [Ship default settings with your plugin](https://code.claude.com/docs/en/plugins#ship-default-settings-with-your-plugin).

### `crossSessionInbound`

Choose what this session does with [messages arriving from your other Claude Code sessions](https://code.claude.com/docs/en/cross-session-messaging#control-inbound-messages). When no value applies, Claude Code decides per message from the two sessions' permission-mode classes. Requires Claude Code v2.1.224 or later.

* **Scope**: [`Any file`](#scopes). A project or local value applies only when it's stricter than the value managed settings, the `--settings` flag, or user settings give.
* **Type**: string, one of:
  * `"accept"`: Claude Code delivers the message to Claude
  * `"hold"`: Claude Code shows a notice for the message without delivering it
  * `"refuse"`: Claude Code drops the message
* **Default**: unset, so Claude Code decides per message

```json settings.json theme={null}
{
  "crossSessionInbound": "hold"
}
```

Claude Code reads managed settings first, then the `--settings` flag, then user settings, and applies the first value found. `refuse` is stricter than `hold`, and `hold` is stricter than `accept`. When none of the trusted sources sets a value, a project or local `hold` or `refuse` still applies, replacing the per-message default. In sessions with cross-session messaging, this key appears in `/config` as **Messages from your other sessions**, which writes it to user settings; the row requires Claude Code v2.1.232 or later, and Claude Code hides it while the `--settings` flag or managed settings set the key.

Claude Code [warns](https://code.claude.com/docs/en/errors#crosssessioninbound-must-be-one-of-accept-hold-refuse) when you set a value it doesn't recognize. While that value is present in a user, project, local, or `--settings` file, Claude Code holds inbound messages, even when a source that takes precedence sets `accept`. A `refuse` that another source sets still applies. Fix or remove the value to clear the hold.

When the unrecognized value is in [managed settings](https://code.claude.com/docs/en/managed-settings), Claude Code instead treats it as `refuse` until an administrator fixes it. Before v2.1.248, Claude Code ignored an unrecognized value without warning.

### `disableAgentView`

Turn off [background agents and agent view](https://code.claude.com/docs/en/agent-view): `claude agents`, `--bg`, `/background`, and the on-demand supervisor. Set it in [managed settings](https://code.claude.com/docs/en/managed-settings) to enforce it for an organization.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code turns off `claude agents`, `--bg`, `/background`, and the on-demand supervisor
  * `false`: agent view is available
* **Default**: unset, so agent view is available
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_AGENT_VIEW`](https://code.claude.com/docs/en/env-vars) turns agent view off for one session; whichever of the two turns it off, the other can't turn it back on

```json settings.json theme={null}
{
  "disableAgentView": true
}
```

### `isolatePeerMachines`

Require your explicit approval before Claude's `SendMessage` reaches one of your sessions beyond this machine; see [Require approval for cross-machine messages](https://code.claude.com/docs/en/cross-session-messaging#require-approval-for-cross-machine-messages). The approval prompt appears even in [`bypassPermissions` mode](https://code.claude.com/docs/en/permission-modes#skip-all-checks-with-bypasspermissions-mode).

* **Scope**: [`Any file`](#scopes). A `true` from any scope applies, so a checked-in project file can turn the requirement on but not off.
* **Type**: Boolean
  * `true`: Claude Code asks for your approval before Claude's `SendMessage` reaches one of your sessions beyond this machine
  * `false`: cross-machine messages don't prompt
* **Default**: unset, so cross-machine messages don't prompt

```json settings.json theme={null}
{
  "isolatePeerMachines": true
}
```

The cross-machine `SendMessage` approval requires Claude Code v2.1.224 or later.

### `processWrapper`

On macOS and Linux, place a corporate launcher command in front of the [background processes Claude Code starts](https://code.claude.com/docs/en/corporate-launcher#what-the-launcher-covers). Claude Code runs the launcher with its own command line appended, so the launcher must exec into Claude Code; see [Run Claude Code behind a corporate launcher](https://code.claude.com/docs/en/corporate-launcher) for the launcher contract. Requires Claude Code v2.1.210 or later.

* **Scope**: [`User or managed`](#scopes)
* **Type**: string, the launcher command as an argv prefix, such as an absolute path with optional arguments
* **Default**: unset, so background processes start unwrapped
* **Per-session overrides**: [`CLAUDE_CODE_PROCESS_WRAPPER`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session

```json settings.json theme={null}
{
  "processWrapper": "/opt/corp/launcher --profile claude"
}
```

Claude Code ignores the launcher on Windows and starts every process unwrapped. Requires Claude Code v2.1.210 or later.

### `teammateMode`

Choose where Claude Code shows [agent team](https://code.claude.com/docs/en/agent-teams) teammates: inside your main terminal pane, or in split panes when your terminal supports them. See [Choose a display mode](https://code.claude.com/docs/en/agent-teams#choose-a-display-mode).

* **Scope**: [`Any file`](#scopes). Claude Code also reads a value left in `~/.claude.json` by older versions.
* **Type**: string, one of:
  * `"in-process"`: teammates run inside your main terminal pane
  * `"auto"`: split panes when you're running inside tmux, or inside iTerm2 with `it2` on your `PATH` or tmux installed; in-process otherwise
  * `"tmux"`: split panes using tmux or iTerm2, detected from your terminal
  * `"iterm2"`: iTerm2 native split panes through the `it2` CLI, in Claude Code v2.1.186 or later
* **Default**: `"in-process"`
* **Per-session overrides**: `--teammate-mode` takes precedence over this key for one session

```json settings.json theme={null}
{
  "teammateMode": "auto"
}
```

Before v2.1.179, the default was `auto`. The `iterm2` value requires Claude Code v2.1.186 or later.

&lt;span id="worktree-settings" />

### `worktree`

Configure how Claude Code creates and manages [git worktrees](https://code.claude.com/docs/en/worktrees) for `--worktree`, the `EnterWorktree` tool, and isolated subagents and background sessions.

* **Scope**: [`Any file`](#scopes)
* **Type**: object with `baseRef`, `symlinkDirectories`, `sparsePaths`, and `bgIsolation`
* **Default**: unset

This example branches new worktrees from your current `HEAD` and symlinks `node_modules` into each one:

```json settings.json theme={null}
{
  "worktree": {
    "baseRef": "head",
    "symlinkDirectories": ["node_modules"]
  }
}
```

To copy gitignored files like `.env` into new worktrees, add a [`.worktreeinclude` file](https://code.claude.com/docs/en/worktrees#copy-gitignored-files-into-worktrees) to your project root instead of a setting.

### `worktree.baseRef`
