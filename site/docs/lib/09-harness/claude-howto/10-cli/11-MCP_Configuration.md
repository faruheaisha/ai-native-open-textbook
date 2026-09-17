---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/10-cli/README.md"
sourceRel: "10-cli/README.md"
rawUrl: "/raw/09-harness/claude-howto/10-cli/README.md"
sourceSha256: "d828c0d6684b52e2c08a4547b5e6e526f7b27045e72b6e3e8b73824e05e7f8e5"
pageSha256: "f9396d66c8098a20f2c72ef52d706b51036355e8e16095a387821594d657b63d"
contentMode: "local-full"
zh: ""
---

## MCP Configuration

| Flag | Description | Example |
|------|-------------|---------|
| `--mcp-config` | Load MCP servers from JSON | `claude --mcp-config ./mcp.json` |
| `--strict-mcp-config` | Only use specified MCP config | `claude --strict-mcp-config --mcp-config ./mcp.json` |
| `--channels` | Subscribe to MCP channel plugins. Entries must be tagged `plugin:<name>@<marketplace>`; bare names are rejected | `claude --channels plugin:discord@my-marketplace` |

### MCP Examples

```bash
# Load GitHub MCP server
claude --mcp-config ./github-mcp.json "list open PRs"

# Strict mode - only specified servers
claude --strict-mcp-config --mcp-config ./production-mcp.json "deploy to staging"
```
