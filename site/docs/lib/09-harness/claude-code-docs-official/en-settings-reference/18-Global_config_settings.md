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
pageSha256: "045a05deb34f0317d6a2804bd15be5c74da8972b4209201870e47019aa47fbb0"
contentMode: "local-full"
zh: ""
---

## Global config settings

Save these keys in `~/.claude.json`, not in a settings file. Claude Code ignores them anywhere else. Claude Code and `/config` write most of them for you, and you can also edit them by hand.

### `autoConnectIde`

Connect to a running IDE automatically when you start Claude Code from an external terminal. Appears in `/config` as **Auto-connect to IDE (external terminal)** when you run Claude Code outside a VS Code or JetBrains terminal.

* **Scope**: [`Global config`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code connects to a running IDE automatically when you start it from an external terminal
  * `false`: Claude Code doesn't connect automatically from an external terminal; inside a VS Code or JetBrains terminal, or with `--ide`, it still connects
* **Default**: `false`
* **Per-session overrides**: [`CLAUDE_CODE_AUTO_CONNECT_IDE`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session, in either direction

```json ~/.claude.json theme={null}
{
  "autoConnectIde": true
}
```

Claude Code ignores this key in `settings.json`.

### `autoInstallIdeExtension`

Install the Claude Code IDE extension automatically when you run Claude Code from a VS Code terminal. Appears in `/config` as **Auto-install IDE extension** when you run Claude Code inside a VS Code or JetBrains terminal.

* **Scope**: [`Global config`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code installs the IDE extension automatically when you run it from a VS Code terminal
  * `false`: Claude Code doesn't install the extension automatically
* **Default**: `true`
* **Per-session overrides**: [`CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL`](https://code.claude.com/docs/en/env-vars) set to `1` skips the install for one session even when this key is `true`

```json ~/.claude.json theme={null}
{
  "autoInstallIdeExtension": false
}
```

Claude Code ignores this key in `settings.json`.

### `diffTool`

Choose where Claude Code shows the diff of an `Edit` or `Write` change it proposes when a [VS Code](https://code.claude.com/docs/en/vs-code) or [JetBrains](https://code.claude.com/docs/en/jetbrains#features) IDE is connected: `"auto"` opens it in the IDE's diff viewer, `"terminal"` keeps it in the terminal. Appears in `/config` as **Diff tool** only while Claude Code is connected to a VS Code or JetBrains IDE.

* **Scope**: [`Global config`](#scopes)
* **Type**: string, one of:
  * `"auto"`: Claude Code opens the diff in the IDE's diff viewer when a VS Code or JetBrains IDE is connected
  * `"terminal"`: Claude Code keeps the diff in the terminal
* **Default**: `"auto"`

```json ~/.claude.json theme={null}
{
  "diffTool": "terminal"
}
```

Claude Code ignores this key in `settings.json`.

### `externalEditorContext`

When you press `Ctrl+G`, Claude Code opens the prompt you're typing in your [external editor](https://code.claude.com/docs/en/interactive-mode#general-controls). With this key on, the editor buffer starts with Claude's previous response as `#` comment lines, so you can read it while you write, and Claude Code strips those lines when you save. Appears in `/config` as **Show last response in external editor**.

* **Scope**: [`Global config`](#scopes)
* **Type**: Boolean
  * `true`: the editor buffer starts with Claude's previous response as `#` comment lines, which Claude Code strips when you save
  * `false`: the editor buffer opens with only your prompt
* **Default**: `false`

```json ~/.claude.json theme={null}
{
  "externalEditorContext": true
}
```

With it on, the buffer Claude Code opens looks like this, and only the text below the marker line is sent as your prompt:

```text theme={null}
# ─── Claude's last response (for reference; removed on save) ───
# I added the retry loop to fetchUser in src/api.ts and a test
# for the timeout case. Want me to wire the same retry into
# fetchOrders?
# ─── Write your reply below this line ──────────────────────────

Yes, and cap it at three attempts.
```

Claude Code keeps the last 50 lines of the response and marks the cut with `# … (earlier output truncated)`.

Claude Code ignores this key in `settings.json`.

### `permissionExplainerEnabled`

  Removed in v2.1.257, together with the `Ctrl+E` command explanation on Bash and PowerShell permission prompts. Setting it has no effect on current versions.

Through v2.1.256, you could press `Ctrl+E` on a Bash or PowerShell permission prompt to see a model-generated explanation of the command, and set this key to `false` to turn that shortcut off.

* **Scope**: [`Global config`](#scopes). On v2.1.256 and earlier.
* **Type**: Boolean
* **Default**: `true`

### `teammateDefaultModel`

  Removed in v2.1.234, together with its `/config` row **Default teammate model**. Setting it has no effect on current versions.

Through v2.1.233, you set this key to the model for [agent team](https://code.claude.com/docs/en/agent-teams#specify-teammates-and-models) teammates your prompt didn't name a model for: an alias such as `"sonnet"`, or `null` to follow the lead's model. For the model Claude Code picks for such teammates now, see [specify teammates and models](https://code.claude.com/docs/en/agent-teams#specify-teammates-and-models).

* **Scope**: [`Global config`](#scopes). On v2.1.233 and earlier.
* **Type**: string, a model alias or full model ID, or `null`
* **Default**: unset
