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
pageSha256: "f4513b21b4246b9f55110200ac77146dc88408ee36fd2b5d5e6c45cc22911e81"
contentMode: "local-full"
zh: ""
---

## Use Claude Code as an MCP server

You can use Claude Code itself as an MCP server that other applications can connect to:

```bash theme={null}
# Start Claude as a stdio MCP server
claude mcp serve
```

The command prints nothing when it starts. A stdio MCP server communicates over stdin and stdout, so a silent, blocked terminal means the server is running and waiting for a client to connect.

You can use this in Claude Desktop by adding this configuration to claude\_desktop\_config.json:

```json theme={null}
{
  "mcpServers": {
    "claude-code": {
      "type": "stdio",
      "command": "claude",
      "args": ["mcp", "serve"],
      "env": {}
    }
  }
}
```

  **Configuring the executable path**: the `command` field must reference the Claude Code executable. If the `claude` command is not in your system's PATH, you'll need to specify the full path to the executable.

  To find the full path:

  ```bash theme={null}
  which claude
  ```

  Then use the full path in your configuration:

  ```json theme={null}
  {
    "mcpServers": {
      "claude-code": {
        "type": "stdio",
        "command": "/full/path/to/claude",
        "args": ["mcp", "serve"],
        "env": {}
      }
    }
  }
  ```

  Without the correct executable path, you'll encounter errors like `spawn claude ENOENT`.

  Tips:

  * In Claude Desktop, try asking Claude to read files in a directory, make edits, and more.
  * This MCP server only exposes Claude Code's tools to your MCP client, so your own client is responsible for implementing user confirmation for individual tool calls.
