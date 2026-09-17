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
pageSha256: "afea8af90e76346e7aa3770ef330f2244770f4764163e04048f8d6b31be1b1f0"
contentMode: "local-full"
zh: ""
---

## MCP

Control which MCP servers Claude Code connects to and which an organization allows. See [Connect to external tools with MCP](https://code.claude.com/docs/en/mcp) and [Managed MCP configuration](https://code.claude.com/docs/en/managed-mcp).

### `allowAllClaudeAiMcps`

Load the [claude.ai connectors](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) Claude Code fetches itself alongside a deployed `managed-mcp.json`. Without this key, `managed-mcp.json` takes exclusive control of MCP servers and suppresses those connectors.

* **Scope**: [`Managed`](#scopes). Users can't re-enable connectors that exclusive control suppressed.
* **Type**: Boolean
  * `true`: Claude Code loads the claude.ai connectors alongside a deployed `managed-mcp.json`
  * `false`: a deployed `managed-mcp.json` takes exclusive control of MCP servers and suppresses the claude.ai connectors [Claude Code fetches itself](https://code.claude.com/docs/en/mcp#how-connectors-reach-claude-code)
* **Default**: `false`, so a deployed `managed-mcp.json` suppresses the claude.ai connectors Claude Code fetches itself

```json managed-settings.json theme={null}
{
  "allowAllClaudeAiMcps": true
}
```

[`allowedMcpServers`](#allowedmcpservers) and [`deniedMcpServers`](#deniedmcpservers) still apply to the connectors this key loads. Connectors delivered to a [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web) whose host carries a `managed-mcp.json`, such as a self-hosted runner, stay suppressed. See [Allow claude.ai connectors alongside the managed set](https://code.claude.com/docs/en/managed-mcp#allow-claude-ai-connectors-alongside-the-managed-set).

### `allowedMcpServers`

Allowlist the MCP servers people can add. Claude Code blocks any server that doesn't match an entry wherever it's defined, including plugin servers, servers passed with `--mcp-config`, and servers from claude.ai.

Built-in servers such as Claude in Chrome, the `ide` server Claude Code connects to in a running [VS Code](https://code.claude.com/docs/en/vs-code#the-built-in-ide-mcp-server) or [JetBrains](https://code.claude.com/docs/en/jetbrains#the-built-in-ide-mcp-server) IDE, and servers the CLI itself configures are exempt from the allowlist, and the denylist still applies to them. In-process `type: "sdk"` servers are exempt from both lists; the [app that started the session](https://code.claude.com/docs/en/mcp#how-connectors-reach-claude-code) registers them.

Servers your organization delivers are also exempt from the allowlist, and the denylist still applies to them. The exemption covers every [`managedMcpServers`](#managedmcpservers) entry, and any [`managed-mcp.json`](https://code.claude.com/docs/en/managed-mcp#exclusive-control-with-managed-mcp-json) entry whose values use no `$\{VAR\}` expansion. See [How a server is evaluated](https://code.claude.com/docs/en/managed-mcp#how-a-server-is-evaluated) for the full check order. Before v2.1.259, servers from `managed-mcp.json` had to match too.

* **Scope**: [`Any file`](#scopes). Entries from every file merge into one allowlist unless [`allowManagedMcpServersOnly`](#allowmanagedmcpserversonly) is set. Deploy it in managed settings to enforce it.
* **Type**: array of objects, each with exactly one key: `serverName`, a string limited to letters, numbers, hyphens, and underscores; `serverCommand`, an array of the command and its arguments matched exactly; or `serverUrl`, a URL pattern with `*` wildcards
* **Default**: unset, so every server is allowed; an empty array blocks every server users add

This example allows only the stdio server that the listed `npx` command starts:

```json settings.json theme={null}
{
  "allowedMcpServers": [
    { "serverCommand": ["npx", "-y", "@modelcontextprotocol/server-filesystem"] }
  ]
}
```

A [`deniedMcpServers`](#deniedmcpservers) entry takes precedence, so a server on both lists is blocked. Once the list contains any `serverCommand` entry, a stdio server must match a `serverCommand` entry, and once it contains any `serverUrl` entry, a remote server must match a `serverUrl` entry: a `serverName` match no longer admits that kind of server. See [Policy-based control with allowlists and denylists](https://code.claude.com/docs/en/managed-mcp#policy-based-control-with-allowlists-and-denylists).

### `allowManagedMcpServersOnly`

Make the managed allowlist the only one that applies. Claude Code then reads [`allowedMcpServers`](#allowedmcpservers) from managed settings alone and ignores allowlists in user, project, and local settings; [`deniedMcpServers`](#deniedmcpservers) still merges from every settings scope, so users can still block servers for themselves. Administrators set it so a user's own settings can't broaden what the managed allowlist permits.

* **Scope**: [`Managed`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code reads `allowedMcpServers` from managed settings alone and ignores allowlists in user, project, and local settings
  * `false`: allowlists from every settings scope merge
* **Default**: `false`, so allowlists from every settings scope merge

This example locks the allowlist to managed settings and allows only the server named `github`:

```json managed-settings.json theme={null}
{
  "allowManagedMcpServersOnly": true,
  "allowedMcpServers": [
    { "serverName": "github" }
  ]
}
```

Users can still add MCP servers of their own; only servers that match the managed allowlist load. See [Restrict the allowlist to managed settings only](https://code.claude.com/docs/en/managed-mcp#restrict-the-allowlist-to-managed-settings-only).

### `deniedMcpServers`

Block specific MCP servers. Claude Code refuses to load a matching server wherever it's defined, including plugin servers, servers passed with `--mcp-config`, servers from `managed-mcp.json`, servers from [`managedMcpServers`](#managedmcpservers), and the claude.ai connectors [it fetches itself](https://code.claude.com/docs/en/mcp#how-connectors-reach-claude-code). In-process `type: "sdk"` servers are exempt; the app that started the session registers them.

* **Scope**: [`Any file`](#scopes). Entries from every file merge into one denylist, and [`allowManagedMcpServersOnly`](#allowmanagedmcpserversonly) doesn't change that. Deploy it in managed settings to enforce it.
* **Type**: array of objects, each with exactly one key: `serverName`, any non-empty string, so a claude.ai connector's display name such as `"claude.ai Slack"` works; `serverCommand`, an array of the command and its arguments matched exactly; or `serverUrl`, a URL pattern with `*` wildcards
* **Default**: unset, so no server is blocked; an empty array also blocks nothing

```json settings.json theme={null}
{
  "deniedMcpServers": [
    { "serverName": "filesystem" }
  ]
}
```

The denylist takes precedence over [`allowedMcpServers`](#allowedmcpservers), so a server on both lists is blocked. See [Policy-based control with allowlists and denylists](https://code.claude.com/docs/en/managed-mcp#policy-based-control-with-allowlists-and-denylists).

### `disableClaudeAiConnectors`

Turn off the [claude.ai MCP connectors](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) [Claude Code fetches itself](https://code.claude.com/docs/en/mcp#how-connectors-reach-claude-code), so it neither fetches nor connects them. A `true` in any settings file applies: a checked-in project `.claude/settings.json` can opt a repository out of those connectors, but a project-level `false` can't override a user- or managed-level `true`. Requires Claude Code v2.1.182 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code neither fetches nor connects those connectors
  * `false`: the same as unset; Claude Code fetches your connectors unless another settings file or `ENABLE_CLAUDEAI_MCP_SERVERS` turns them off
* **Default**: `false`, so Claude Code fetches your connectors
* **Per-session overrides**: [`ENABLE_CLAUDEAI_MCP_SERVERS`](https://code.claude.com/docs/en/env-vars) set to `false` turns connectors off for one session; whichever of the two turns them off, the other can't turn them back on

```json settings.json theme={null}
{
  "disableClaudeAiConnectors": true
}
```

Servers you pass explicitly with `--mcp-config` are unaffected. To block individual connectors instead of all of them, use [`deniedMcpServers`](#deniedmcpservers). See [Disable claude.ai connectors](https://code.claude.com/docs/en/mcp#disable-claude-ai-connectors). Requires Claude Code v2.1.182 or later.

### `disabledMcpjsonServers`

Reject specific servers defined in a project's `.mcp.json` file so Claude Code never connects them or asks you to approve them. A rejection in any settings file applies, including a project `.claude/settings.json` checked into the repository.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of strings, the server names as they appear in `.mcp.json`
* **Default**: unset

```json settings.json theme={null}
{
  "disabledMcpjsonServers": ["filesystem"]
}
```

Claude Code writes this key to `.claude/settings.local.json` when you reject a server in the approval dialog. `claude mcp get <name>` shows a rejected server as `✘ Rejected (see disabledMcpjsonServers in settings)`. Rejection takes precedence over [`enabledMcpjsonServers`](#enabledmcpjsonservers) and [`enableAllProjectMcpServers`](#enableallprojectmcpservers).

### `enableAllProjectMcpServers`

Approve every MCP server defined in project `.mcp.json` files without a prompt. Claude Code writes this key to `.claude/settings.local.json` when you choose to approve all servers in the approval dialog.

* **Scope**: [`Any file`](#scopes). In a folder whose trust dialog you haven't accepted, Claude Code honors it from user settings, managed settings, and `--settings` and ignores it in the shared project file, both in the session and for `claude mcp list` and `claude mcp get`; [Project server approvals and workspace trust](https://code.claude.com/docs/en/mcp#project-server-approvals-and-workspace-trust) says when an untracked `.claude/settings.local.json` counts too.
* **Type**: Boolean
  * `true`: Claude Code approves every MCP server defined in project `.mcp.json` files without a prompt
  * `false`: Claude Code asks you to approve each server. In a trusted folder, a `false` in a higher-precedence file overrides a `true` in a lower one; in a folder you haven't trusted, a `true` in any honored file is enough
* **Default**: unset, so Claude Code asks you to approve each server

```json settings.json theme={null}
{
  "enableAllProjectMcpServers": true
}
```

A [`disabledMcpjsonServers`](#disabledmcpjsonservers) entry still rejects a server.

### `enabledMcpjsonServers`

Approve specific servers defined in project `.mcp.json` files so Claude Code connects them without asking. Claude Code writes this key to `.claude/settings.local.json` when you approve a server in the approval dialog.

* **Scope**: [`Any file`](#scopes). In a folder whose trust dialog you haven't accepted, Claude Code honors it from user settings, managed settings, and `--settings` and ignores it in the shared project file, both in the session and for `claude mcp list` and `claude mcp get`; [Project server approvals and workspace trust](https://code.claude.com/docs/en/mcp#project-server-approvals-and-workspace-trust) says when an untracked `.claude/settings.local.json` counts too.
* **Type**: array of strings, the server names as they appear in `.mcp.json`
* **Default**: unset

This example approves the `memory` and `github` servers from the project's `.mcp.json`:

```json settings.json theme={null}
{
  "enabledMcpjsonServers": ["memory", "github"]
}
```

A [`disabledMcpjsonServers`](#disabledmcpjsonservers) entry still rejects a server.

### `managedMcpServers`

Provide remote MCP servers to every user from managed settings. Users keep the servers they add themselves and can't edit or remove the ones you provide. Requires Claude Code v2.1.259 or later.

* **Scope**: [`Managed`](#scopes). Claude Code drops the key with a warning in user, project, and local settings, and doesn't read it in the Claude Desktop app's Code tab on a third-party deployment or in the app's Cowork sessions, where Claude Desktop supplies and locks those sessions' MCP servers itself.
* **Type**: object keyed by server name. Each entry has the `.mcp.json` shape for an `http` or `sse` server: a required `https://` `url`, and optionally `headers`, `oauth`, and the other HTTP and SSE options. Claude Code drops entries that fail validation, and [What an entry can contain](https://code.claude.com/docs/en/managed-mcp#what-an-entry-can-contain) lists the conditions
* **Default**: unset, so managed settings provide no servers

This example provides one HTTP server named `search`:

```json managed-settings.json theme={null}
{
  "managedMcpServers": {
    "search": {
      "type": "http",
      "url": "https://search.example.com/mcp"
    }
  }
}
```

For precedence, how provided servers combine with `managed-mcp.json` and the allow and deny lists, and what users see, see [Provide servers through managed settings](https://code.claude.com/docs/en/managed-mcp#provide-servers-through-managed-settings).
