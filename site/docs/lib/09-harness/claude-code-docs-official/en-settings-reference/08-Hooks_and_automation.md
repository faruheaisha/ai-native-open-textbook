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
pageSha256: "fb4246d5fbf640b6a287e1e544aa25d51cb1b673f7e2df493cef5e9f66d8e00e"
contentMode: "local-full"
zh: ""
---

## Hooks and automation

Register hooks, restrict which hooks run, and control workflows. For hook events and payloads, see the [hooks reference](https://code.claude.com/docs/en/hooks).

### `allowedHttpHookUrls`

Limit which URLs [HTTP hooks](https://code.claude.com/docs/en/hooks#http-hook-fields) can target. When you define this key, Claude Code runs an HTTP hook only if its URL matches one of the patterns and blocks the rest without running them; an empty array blocks every HTTP hook.

* **Scope**: [`Any file`](#scopes). Arrays merge across settings files.
* **Type**: array of URL patterns, with `*` as a wildcard
* **Default**: unset, so any URL is allowed

This example allows any URL under `https://hooks.example.com/` and any `http://localhost` URL:

```json settings.json theme={null}
{
  "allowedHttpHookUrls": ["https://hooks.example.com/*", "http://localhost:*"]
}
```

Hostname matching is case-insensitive and treats `hooks.example.com.`, with the trailing dot that marks a fully qualified domain name, the same as `hooks.example.com`, which is how DNS treats them. The allowlist applies to hooks from every source, including managed settings.

### `allowManagedHooksOnly`

Restrict hook execution to hooks your organization deploys.

* **Scope**: [`Managed`](#scopes)
* **Type**: Boolean
  * `true`: only managed hooks run, plus Agent SDK hooks and hooks from plugins your managed settings force-enable. See [What runs under `allowManagedHooksOnly`](#what-runs-under-allowmanagedhooksonly)
  * `false`: hooks from every settings scope and plugin run
* **Default**: unset, so hooks from every settings scope and plugin run

```json managed-settings.json theme={null}
{
  "allowManagedHooksOnly": true
}
```

#### What runs under `allowManagedHooksOnly`

When you set it to `true`, Claude Code changes which hooks and hook-like commands load:

* **Managed and SDK hooks run**: hooks from managed settings and hooks the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) registers in process
* **Force-enabled plugin hooks run**: hooks from plugins your managed settings force-enable through [`enabledPlugins`](#enabledplugins). Claude Code matches on the full `plugin@marketplace` ID, so a plugin with the same name from a different marketplace stays blocked. This lets you distribute vetted hooks through an organization marketplace while blocking everything else
* **Everything else is blocked**: user, project, and local hooks, hooks from other plugins, and hooks declared in agent frontmatter
* **Command-sourced plugins are disabled**: Claude Code also disables plugins with a [`command` source](https://code.claude.com/docs/en/plugin-marketplaces#command-sources), including plugins force-enabled in managed `enabledPlugins`, unless you set [`disableCommandPluginSources`](#disablecommandpluginsources) to `false` explicitly
* **Marketplace `headersHelper` commands are blocked**: Claude Code also blocks marketplace [`headersHelper` commands](https://code.claude.com/docs/en/plugin-marketplaces#authenticate-archive-downloads) unless [`disableCommandPluginSources`](#disablecommandpluginsources) is explicitly set to `false`, except for a marketplace that managed settings themselves declare. Requires Claude Code v2.1.238 or later
* **Status line and file suggestion narrow to managed settings**: Claude Code reads [`statusLine`](https://code.claude.com/docs/en/statusline), [`fileSuggestion`](#filesuggestion), and [`subagentStatusLine`](https://code.claude.com/docs/en/statusline#subagent-status-lines) from managed settings only, following the [status line and file suggestion gates](#status-line-and-file-suggestion-gates)

The [`/goal`](https://code.claude.com/docs/en/goal) command can't run while this key is set, because it depends on hooks.

### `disableAllHooks`

Turn off [hooks](https://code.claude.com/docs/en/hooks#disable-or-remove-hooks), any custom [status line](https://code.claude.com/docs/en/statusline), and any custom [file suggestion](#filesuggestion) command. Use it to turn all of these off temporarily without deleting them from your settings.

* **Scope**: [`Any file`](#scopes). Only managed settings can disable managed hooks.
* **Type**: Boolean
  * `true`: Claude Code turns off hooks, any custom status line, and any custom file suggestion command
  * `false`: hooks, the status line, and the file suggestion command run
* **Default**: unset, so hooks run

```json settings.json theme={null}
{
  "disableAllHooks": true
}
```

The reach depends on which file carries the key:

* **In managed settings**: Claude Code disables every configured hook, including managed ones, and keeps running the hooks the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) registers in process
* **In any other settings file**: Claude Code disables user, project, local, and plugin hooks; managed hooks, Agent SDK hooks, and hooks from plugins force-enabled in managed [`enabledPlugins`](#enabledplugins) keep running

Keeping Agent SDK hooks running when managed settings set this key requires Claude Code v2.1.242 or later.

The [`/goal`](https://code.claude.com/docs/en/goal) command can't run while hooks are disabled, and the `/hooks` menu shows a notice instead of your hooks.

#### Status line and file suggestion gates

Claude Code makes two decisions for `statusLine`, `fileSuggestion`, and `subagentStatusLine`, in this order:

* **Off entirely**: when managed settings set `disableAllHooks`, or when the folder isn't trusted under the same [workspace trust rule as hooks in settings files](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder)
* **Narrowed to managed settings**: when [`allowManagedHooksOnly`](#allowmanagedhooksonly) is set, when `disableAllHooks` is `true` outside managed settings after [settings precedence](https://code.claude.com/docs/en/hooks#disable-or-remove-hooks) applies, or when you start Claude Code with `--safe-mode`

Under narrowing, Claude Code runs a managed value if one is deployed. Otherwise it skips your value without warning: the status line is disabled, and `@` autocomplete falls back to the built-in file suggestion.

### `disableWorkflows`

Turn off [dynamic workflows](https://code.claude.com/docs/en/workflows#turn-workflows-off) and the bundled workflow commands for everyone your settings reach, such as an organization through managed settings. To turn workflows on or off just for yourself, use [`enableWorkflows`](#enableworkflows) instead, which the **Dynamic workflows** toggle in `/config` writes to your user settings.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code turns off dynamic workflows and the bundled workflow commands for everyone your settings reach
  * `false`: the same as unset; whether workflows are on then follows [`enableWorkflows`](#enableworkflows) and your plan's default
* **Default**: `false`
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_WORKFLOWS`](https://code.claude.com/docs/en/env-vars) turns workflows off for one session; whichever of the two turns them off, the other can't turn them back on

```json settings.json theme={null}
{
  "disableWorkflows": true
}
```

### `enableWorkflows`

Turn [dynamic workflows](https://code.claude.com/docs/en/workflows) on or off for yourself when your plan's default isn't what you want. Appears in `/config` as **Dynamic workflows**, which writes this key to your user settings and removes it again when you toggle back to your plan's default. To turn workflows off for everyone from managed settings, use [`disableWorkflows`](#disableworkflows) instead.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code turns dynamic workflows on for you
  * `false`: Claude Code turns dynamic workflows off for you
* **Default**: unset, so workflows are on unless you're on the Pro plan, where they're off
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_WORKFLOWS`](https://code.claude.com/docs/en/env-vars) turns workflows off for one session, and `true` here can't turn them back on while it's set

```json settings.json theme={null}
{
  "enableWorkflows": true
}
```

[`disableWorkflows`](#disableworkflows) and your organization's workflows policy also take precedence: `enableWorkflows: true` can't turn workflows back on while any source turns workflows off. Claude Code hides the `/config` row while a source other than your user settings sets `enableWorkflows`, or sets `disableWorkflows` to `true`.

### `hooks`

Run your own commands, prompts, agents, HTTP requests, or MCP tools as [hooks](https://code.claude.com/docs/en/hooks) at points in Claude Code's lifecycle, such as before a tool call or when a session starts; the [hooks reference](https://code.claude.com/docs/en/hooks#hook-events) lists every event, its payload, and its exit codes. Each event maps to a list of matcher groups, and each group lists the handlers to run when the matcher applies.

* **Scope**: [`Any file`](#scopes). Hooks merge across files rather than replacing each other, and hooks from managed settings can't be removed from other files.
* **Type**: object keyed by [hook event](https://code.claude.com/docs/en/hooks#hook-events); each value is an array of `\{ "matcher", "hooks" \}` groups whose `hooks` entries have a `type` of `"command"`, `"prompt"`, `"agent"`, `"http"`, or `"mcp_tool"`
* **Default**: unset, so no hooks run

This example runs a script before every Bash tool call:

```json settings.json theme={null}
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "~/.claude/hooks/check-bash.sh" }
        ]
      }
    ]
  }
}
```

For every event, matcher pattern, and handler field, see the [hooks reference](https://code.claude.com/docs/en/hooks#configuration). To turn hooks off, see [`disableAllHooks`](#disableallhooks); to limit hooks to the ones your organization deploys, see [`allowManagedHooksOnly`](#allowmanagedhooksonly).

### `httpHookAllowedEnvVars`

An [HTTP hook](https://code.claude.com/docs/en/hooks#http-hook-fields) can put the value of an environment variable into a request header, for example an `Authorization: Bearer $HOOK_TOKEN` header, but only for variables the hook lists in its own `allowedEnvVars`. This key sets an outer limit on that list for every HTTP hook: a hook can use a variable only if both its own `allowedEnvVars` and this key name it. Use it to stop a hook from reading a secret it shouldn't, even when the hook's definition asks for it.

* **Scope**: [`Any file`](#scopes). Arrays merge across settings files.
* **Type**: array of environment variable names
* **Default**: unset, so each hook's own `allowedEnvVars` list applies

This example limits header interpolation to `MY_TOKEN` and `HOOK_SECRET`:

```json settings.json theme={null}
{
  "httpHookAllowedEnvVars": ["MY_TOKEN", "HOOK_SECRET"]
}
```

The allowlist applies to hooks from every source, including managed settings.

### `workflowKeywordTriggerEnabled`

Choose whether typing the keyword `ultracode` in a prompt triggers a [dynamic workflow](https://code.claude.com/docs/en/workflows#ask-for-a-workflow-in-your-prompt). Set it to `false` to type the word without triggering one.

* **Scope**: [`Any file`](#scopes). Appears in `/config` as **Ultracode keyword trigger**.
* **Type**: Boolean
  * `true`: typing `ultracode` in a prompt triggers a dynamic workflow
  * `false`: you can type the word without triggering one
* **Default**: `true`

```json settings.json theme={null}
{
  "workflowKeywordTriggerEnabled": false
}
```

The `ultracode` effort setting, `/workflows`, and saved workflow commands are unaffected.

### `workflowSizeGuideline`

Set the [agent count Claude aims for](https://code.claude.com/docs/en/workflows#set-a-size-guideline) in the dynamic workflows it writes. Claude Code sends the value to Claude as advice, not an enforced cap: `"small"` asks for fewer than 5 agents, `"medium"` fewer than 15, and `"large"` fewer than 50. Choose `"small"` when you want to bound what a workflow spends. Requires Claude Code v2.1.219 or later.

* **Scope**: [`Any file`](#scopes). A value there takes precedence over the **Dynamic workflow size** choice in `/config`, which Claude Code stores in `~/.claude.json`, and Claude Code hides that row while a settings file sets the key.
* **Type**: string, one of:
  * `"unrestricted"`: no guideline, so Claude sizes the workflow to the task
  * `"small"`: Claude aims for fewer than 5 agents
  * `"medium"`: Claude aims for fewer than 15 agents
  * `"large"`: Claude aims for fewer than 50 agents
* **Default**: `"medium"`

```json settings.json theme={null}
{
  "workflowSizeGuideline": "small"
}
```

Requires Claude Code v2.1.219 or later; on v2.1.202 through v2.1.218, set the guideline in `/config` instead.

&lt;span id="plugin-configuration" />

&lt;span id="manage-plugins" />

&lt;span id="plugin-settings" />
