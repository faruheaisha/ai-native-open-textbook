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
sourceRel: "en/mcp.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/mcp.md"
sourceSha256: "10c37e3b840932b59cb7c7ab34e81595c598b0213bd2f1bb15c8effa1d7bc22b"
pageSha256: "b39f89724c31b7a95343ae33a9344e34aecce4dd2b9f18f20e935871748ce76b"
contentMode: "local-full"
zh: ""
---

## MCP installation scopes

MCP servers can be configured at three scopes. The scope you choose controls which projects the server loads in and whether the configuration is shared with your team. Administrators can also deploy or provide servers for every user via [managed configuration](#managed-mcp-configuration).

| Scope                     | Loads in             | Shared with team         | Stored in                   |
| ------------------------- | -------------------- | ------------------------ | --------------------------- |
| [Local](#local-scope)     | Current project only | No                       | `~/.claude.json`            |
| [Project](#project-scope) | Current project only | Yes, via version control | `.mcp.json` in project root |
| [User](#user-scope)       | All your projects    | No                       | `~/.claude.json`            |

### Local scope

Local scope is the default. A local-scoped server loads only in the project where you added it and stays private to you. Claude Code stores it in `~/.claude.json` under that project's path, so the same server won't appear in your other projects. Use local scope for personal development servers, experimental configurations, or servers with credentials you don't want in version control.

  The term "local scope" for MCP servers differs from general local settings. MCP local-scoped servers are stored in `~/.claude.json` (your home directory), while general local settings use `.claude/settings.local.json` (in the project directory). See [Settings](https://code.claude.com/docs/en/settings#where-settings-live) for details on settings file locations.

```bash theme={null}
# Add a local-scoped server (default)
claude mcp add --transport http stripe https://mcp.stripe.com

# Explicitly specify local scope
claude mcp add --transport http stripe --scope local https://mcp.stripe.com
```

The command writes the server into the entry for your current project inside `~/.claude.json`. The example below shows the result when you run it from `/path/to/your/project`:

```json theme={null}
{
  "projects": {
    "/path/to/your/project": {
      "mcpServers": {
        "stripe": {
          "type": "http",
          "url": "https://mcp.stripe.com"
        }
      }
    }
  }
}
```

### Project scope

Project-scoped servers enable team collaboration by storing configurations in a `.mcp.json` file at your project's root directory. When you add a project-scoped server, Claude Code automatically creates or updates this file with the appropriate configuration structure. Check `.mcp.json` into version control so everyone on your team gets the same MCP tools and services.

```bash theme={null}
# Add a project-scoped server
claude mcp add --transport http shared-server --scope project https://example.com/mcp
```

The resulting `.mcp.json` file follows a standardized format:

```json theme={null}
{
  "mcpServers": {
    "shared-server": {
      "type": "http",
      "url": "https://example.com/mcp"
    }
  }
}
```

For security reasons, Claude Code prompts for approval in interactive sessions before using project-scoped servers from `.mcp.json` files. To reset those approval choices, run `claude mcp reset-project-choices`.

In `claude -p` runs, [Agent SDK](https://code.claude.com/docs/en/headless) sessions, and [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web), Claude Code can't show that prompt: it loads project-scoped servers without asking. Claude Code also skips the prompt in a session you start in `bypassPermissions` mode with [`skipDangerousModePermissionPrompt`](https://code.claude.com/docs/en/settings-reference#skipdangerousmodepermissionprompt) set. To keep a server out anyway:

* Add it to [`disabledMcpjsonServers`](https://code.claude.com/docs/en/settings-reference#disabledmcpjsonservers), which blocks it in every permission mode.
* Exclude project settings entirely with [`--setting-sources`](https://code.claude.com/docs/en/cli-reference#cli-flags) or the SDK's `settingSources` option.
* Start the session with [`--strict-mcp-config`](https://code.claude.com/docs/en/cli-reference#cli-flags). Claude Code then uses only the MCP servers you pass with `--mcp-config`. Skipping the approval prompt for the project-scoped servers Claude Code isn't loading requires Claude Code v2.1.246 or later; before v2.1.246, a strict session still waited on approval for them, which left background sessions waiting at startup. See [Exclusive control with managed-mcp.json](https://code.claude.com/docs/en/managed-mcp#exclusive-control-with-managed-mcp-json) for what the flag does under a managed MCP file.

[Project server approvals and workspace trust](#project-server-approvals-and-workspace-trust) covers how approvals committed to the repository interact with workspace trust.

### User scope

User-scoped servers are stored in `~/.claude.json` and provide cross-project accessibility, making them available across all projects on your machine while remaining private to your user account. This scope works well for personal utility servers, development tools, or services you frequently use across different projects.

```bash theme={null}
# Add a user server
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

### Scope hierarchy and precedence

When the same server is defined in more than one place, Claude Code connects to it once, using the definition from the highest-precedence source. The entire server entry from that source is used; fields are not merged across scopes.

1. Local scope
2. Project scope
3. User scope
4. [Plugin-provided servers](https://code.claude.com/docs/en/plugins)
5. [claude.ai connectors](#use-mcp-servers-from-claude-ai)

The three scopes match duplicates by name. Plugins and connectors match by endpoint, so one that points at the same URL or command as a server above is treated as a duplicate.

A server your organization provides through the [`managedMcpServers`](https://code.claude.com/docs/en/managed-mcp#provide-servers-through-managed-settings) managed setting ranks above all of these, so when one of them duplicates it, Claude Code connects the organization's definition. Requires Claude Code v2.1.259 or later.

If you open a local session in the [Desktop app's Code tab](https://code.claude.com/docs/en/desktop#mcp-servers-from-the-claude-desktop-chat-app) with the same stdio server name at the top level of `~/.claude.json` (user scope) and in `.mcp.json`, the Code tab uses the `~/.claude.json` definition.

### Environment variable expansion in `.mcp.json`

Claude Code supports environment variable expansion in `.mcp.json` files, allowing teams to share configurations while maintaining flexibility for machine-specific paths and sensitive values like API keys.

**Supported syntax:**

* `${VAR}`: expands to the value of environment variable `VAR`
* `${VAR:-default\}`: expands to `VAR` if set, otherwise uses `default`

**Expansion locations:**
Environment variables can be expanded in:

* `command`: the server executable path
* `args`: command-line arguments
* `env`: environment variables passed to the server
* `url`: for HTTP server types
* `headers`: for HTTP server authentication

**Example with variable expansion:**

```json theme={null}
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

If a referenced environment variable isn't set and has no default value, the config still loads: Claude Code reports a missing-variable warning for that server in `claude mcp list` output and uses the unexpanded `$\{VAR\}` text as-is. Set the variable or add a `:-default` fallback so the server starts with the value you intend.
