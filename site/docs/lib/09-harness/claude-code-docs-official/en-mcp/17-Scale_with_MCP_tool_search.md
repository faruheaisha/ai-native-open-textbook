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
pageSha256: "0b86223f6037ba592c1368f0cd3f51e54034066fd36eda6cff0eceb09247eace"
contentMode: "local-full"
zh: ""
---

## Scale with MCP tool search

Tool search keeps MCP context usage low by deferring tool definitions until Claude needs them. Only tool names and server instructions load at session start, so adding more MCP servers has minimal impact on your context window. Claude Code doesn't impose a fixed per-server tool cap; the practical limit is your context window budget.

  Tool search isn't supported on Microsoft Foundry [deployments hosted on Azure](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#hosting-options), which reject it server-side: Claude Code detects the rejection and loads MCP tools upfront for that deployment instead. [`ENABLE_TOOL_SEARCH`](#configure-tool-search) can't override this, since the rejection comes from the deployment itself.

### For MCP server authors

If you're building an MCP server, the server instructions field becomes more useful with tool search enabled. Server instructions help Claude understand when to search for your tools, similar to how [skills](https://code.claude.com/docs/en/skills) work.

Add clear, descriptive server instructions that explain:

* What category of tasks your tools handle
* When Claude should search for your tools
* Key capabilities your server provides

Claude Code truncates tool descriptions and server instructions at 2KB each. Keep them concise to avoid truncation, and put critical details near the start.

### Configure tool search

Tool search is enabled by default: MCP tools are deferred and discovered on demand. Claude Code disables it when `ANTHROPIC_BASE_URL` points to a non-first-party host, since most proxies don't forward `tool_reference` blocks. Set `ENABLE_TOOL_SEARCH` explicitly to override that fallback.

Setting [`CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS`](https://code.claude.com/docs/en/env-vars) keeps tool search off. You can't override it by setting `ENABLE_TOOL_SEARCH` yourself. Your organization can keep tool search on through [managed settings](https://code.claude.com/docs/en/managed-settings), on Claude Code v2.1.227 or later. [Disable pre-release capabilities](https://code.claude.com/docs/en/llm-gateway-protocol#disable-pre-release-capabilities) covers where the override applies and what the variable strips.

Tool search requires a model that supports `tool_reference` blocks: Claude Sonnet 4.5, Claude Haiku 4.5, Claude Opus 4.5, and later models. See [model compatibility in the API docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool#model-compatibility) for the current list.

On Google Cloud's Agent Platform, Claude Code decides by model generation:

* **Claude Opus 4.5, Sonnet 4.5, Haiku 4.5, and later**: tool search is on by default, the same as on the Anthropic API.
* **Earlier Agent Platform models**: Claude Code loads all MCP tools upfront, because their serving stacks reject the required beta header. `ENABLE_TOOL_SEARCH=true` doesn't override this.

Before v2.1.221, Claude Code disabled tool search for all models on Google Cloud's Agent Platform unless you set `ENABLE_TOOL_SEARCH=true`.

Control tool search behavior with the `ENABLE_TOOL_SEARCH` environment variable:

| Value    | Behavior                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (unset)  | All MCP tools deferred and loaded on demand. Falls back to loading upfront on Google Cloud's Agent Platform models earlier than the Claude 4.5 generation, when `ANTHROPIC_BASE_URL` is a non-first-party host, or on a Microsoft Foundry deployment hosted on Azure                                                                                                                                          |
| `true`   | All MCP tools deferred, except on a Microsoft Foundry deployment hosted on Azure, where the server-side rejection still forces upfront loading, and on Google Cloud's Agent Platform models earlier than the Claude 4.5 generation, where Claude Code keeps loading tools upfront. Claude Code sends the beta header through proxies, and requests fail on proxies that don't support `tool_reference` blocks |
| `auto`   | Threshold mode: Claude Code loads the tools it would otherwise defer upfront while their definitions total less than 10% of the context window, and defers all of them once the definitions reach 10%                                                                                                                                                                                                         |
| `auto:N` | Threshold mode with a custom percentage, where `N` is 0-100. For example, `auto:5` for 5%                                                                                                                                                                                                                                                                                                                     |
| `false`  | All MCP tools loaded upfront, no deferral                                                                                                                                                                                                                                                                                                                                                                     |

```bash theme={null}
# Use a custom 5% threshold
ENABLE_TOOL_SEARCH=auto:5 claude

# Disable tool search entirely
ENABLE_TOOL_SEARCH=false claude
```

Or set the value in your [settings.json `env` field](https://code.claude.com/docs/en/settings-reference#env).

You can also disable the `ToolSearch` tool specifically:

```json theme={null}
{
  "permissions": {
    "deny": ["ToolSearch"]
  }
}
```

### Exempt a server from deferral

If a server's tools should always be visible to Claude without a search step, set `alwaysLoad` to `true` in that server's configuration. Every tool from that server then loads into context at session start regardless of the `ENABLE_TOOL_SEARCH` setting. Use this for a small number of tools that Claude needs on every turn, since each upfront tool consumes context that would otherwise be available for your conversation.

The following `.mcp.json` entry exempts one HTTP server while leaving other servers deferred:

```json theme={null}
{
  "mcpServers": {
    "core-tools": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "alwaysLoad": true
    }
  }
}
```

The `alwaysLoad` field is available on all server types. An MCP server can also mark individual tools as always-loaded by including `"anthropic/alwaysLoad": true` in the tool's `_meta` object, which has the same effect for that tool only.

Setting `alwaysLoad: true` also makes startup wait for the server's tools, capped at the standard 5-second connect timeout, since they must be present when the first prompt is built. A remote server with a valid [`cached` entry](#server-status-detail) supplies its tools from the cache without connecting, so it doesn't hold startup. Other servers connect in the background by default; set [`MCP_CONNECTION_NONBLOCKING=0`](https://code.claude.com/docs/en/env-vars) to make startup wait for them too.
