---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-settings.md"
sourceRel: "best-practice/claude-settings.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-settings.md"
sourceSha256: "75075e7b44bd6afd58459b40b4d627c415bb3b04514783ad87ee15a97b2e8077"
pageSha256: "b35b5d527d2c41ef570ba0523984432d1fc3900897c125382982b5d0875d3b2c"
contentMode: "local-full"
zh: ""
---

## MCP Servers

Configure Model Context Protocol servers for extended capabilities.

> **OAuth (v2.1.111):** MCP servers that authenticate via OAuth follow [RFC 9728](https://datatracker.ietf.org/doc/rfc9728/) for protected-resource metadata discovery. Compliant servers expose authorization endpoints under `/.well-known/oauth-protected-resource`, and Claude Code completes the OAuth flow automatically — no manual `apiKeyHelper` or `headersHelper` script required for spec-conformant servers.

> **Reserved server names (v2.1.128+):** `workspace`, `Claude Browser`, and `Claude Preview` are reserved MCP server names. User-defined servers with these names are skipped at load time with a warning logged to the session log. Rename any pre-existing servers using these names to avoid the collision.

> **`.mcp.json` hot-reload (v2.1.139):** The `/mcp` Reconnect action now re-reads `.mcp.json` from disk before reconnecting, so adding or editing a server no longer requires a session restart. Claude Code also injects `CLAUDE_PROJECT_DIR` into stdio-launched MCP server environments (v2.1.139) so servers can resolve paths relative to the project root.

> **Per-server timeout floor (v2.1.162):** Per-server `timeout` values less than 1000ms are ignored and the global `MCP_TOOL_TIMEOUT` default applies instead. Values ≥ 1000ms are honored as before.

### MCP Settings

| Key | Type | Scope | Description |
|-----|------|-------|-------------|
| `enableAllProjectMcpServers` | boolean | Any | Auto-approve all `.mcp.json` servers. **Security note (v2.1.196):** `.mcp.json` servers no longer self-approve — explicit opt-in via `enableAllProjectMcpServers: true` or `enabledMcpjsonServers` is now required |
| `enabledMcpjsonServers` | array | Any | Allowlist specific server names |
| `disabledMcpjsonServers` | array | Any | Blocklist specific server names |
| `allowedMcpServers` | array | Managed only | Allowlist with name/command/URL matching |
| `deniedMcpServers` | array | Managed only | Blocklist with matching |
| `allowManagedMcpServersOnly` | boolean | Managed only | Only allow MCP servers explicitly listed in managed allowlist |
| `channelsEnabled` | boolean | Managed only | Allow [channels](https://code.claude.com/docs/en/channels) for Team and Enterprise users. When unset or `false`, channel message delivery is blocked regardless of `--channels` flag |
| `allowedChannelPlugins` | array | Managed only | Allowlist of channel plugins that may push messages. Replaces the default Anthropic allowlist when set. Undefined = fall back to the default, empty array = block all channel plugins. Requires `channelsEnabled: true`. Each entry is an object with `marketplace` and `plugin` fields (v2.1.84) |
| `allowAllClaudeAiMcps` | boolean | Managed only | Load claude.ai cloud MCP connectors alongside `managed-mcp.json`. When enabled, claude.ai-hosted MCP connectors are made available in addition to admin-deployed managed MCP servers |
| `disableClaudeAiConnectors` | boolean | Any | Disable auto-fetching of claude.ai MCP connectors. When `true`, claude.ai cloud connectors are not loaded. **Restrictive-value exception:** `true` applies from any scope, including project settings, even against a managed `false` — lower-priority scopes can opt out but cannot opt in (v2.1.182) |

### MCP Server Matching (Managed Settings)

```json
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverCommand": "npx @modelcontextprotocol/*" },
    { "serverUrl": "https://mcp.company.com/*" }
  ],
  "deniedMcpServers": [
    { "serverName": "dangerous-server" }
  ]
}
```

> **`${VAR}` interpolation (v2.1.219):** `allowedMcpServers` and `deniedMcpServers` entries may contain `${VAR\}` placeholders. Claude Code resolves them from the startup environment and managed-settings `env` block at load time. Use to reference environment-specific server names or URLs without hardcoding them in managed settings (e.g., `\{ "serverUrl": "https://$\{MCP_HOST\}/*" \}`).

### Per-Server Tool Loading (`alwaysLoad`, v2.1.121)

By default, MCP tool definitions are deferred (loaded into context on demand via tool search). Set `alwaysLoad: true` on an individual MCP server entry in `.mcp.json` (or inline `mcpServers`) to exempt that server from deferral — every tool from that server then loads upfront at session start regardless of `ENABLE_TOOL_SEARCH`. Available on all server types; requires Claude Code v2.1.121+. Use this only for a small set of tools needed every turn — each upfront tool consumes context that would otherwise be available for conversation.

```json
{
  "mcpServers": {
    "always-on-server": {
      "type": "http",
      "url": "https://mcp.example.com",
      "alwaysLoad": true
    }
  }
}
```

An MCP server can also mark individual tools as always-loaded by including `"anthropic/alwaysLoad": true` in the tool's `_meta` object — useful when only a subset of a server's tools should bypass deferral.

**Example:**
```json
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["memory", "github", "filesystem"],
  "disabledMcpjsonServers": ["experimental-server"]
}
```
