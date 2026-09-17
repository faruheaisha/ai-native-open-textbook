---
title: "Connect to external tools with MCP"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/mcp.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/mcp.md"
sourceSha256: "6c825ca20031c7494d157449c68deb67bf1596790b8a2596c704eee9902cf0aa"
pageSha256: "6c825ca20031c7494d157449c68deb67bf1596790b8a2596c704eee9902cf0aa"
contentMode: "local-full"
zh: ""
---

# Connect to external tools with MCP

> Configure MCP servers to extend your agent with external tools. Covers transport types, tool search for large tool sets, authentication, and error handling.

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) is an open standard for connecting AI agents to external tools and data sources. With MCP, your agent can query databases, integrate with APIs like Slack and GitHub, and connect to other services without writing custom tool implementations.

MCP servers can run as local processes, connect over HTTP, or execute directly within your SDK application.

  This page covers MCP configuration for the Agent SDK. To add MCP servers to the Claude Code CLI so they load in every project, see [MCP installation scopes](https://code.claude.com/docs/en/mcp#mcp-installation-scopes).

## Quickstart

This example connects to the [Claude Code documentation](https://code.claude.com/docs) MCP server using [HTTP transport](#http%2Fsse-servers) and uses [`allowedTools`](#allow-mcp-tools) with a wildcard to permit all tools from the server.

  ```typescript TypeScript theme={null}
  import { query } from "@anthropic-ai/claude-agent-sdk";

  for await (const message of query({
    prompt: "Use the docs MCP server to explain what hooks are in Claude Code",
    options: {
      mcpServers: {
        "claude-code-docs": {
          type: "http",
          url: "https://code.claude.com/docs/mcp"
        }
      },
      allowedTools: ["mcp__claude-code-docs__*"]
    }
  })) {
    if (message.type === "result" && message.subtype === "success") {
      console.log(message.result);
    }
  }
  ```

  ```python Python theme={null}
  import asyncio
  from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage

  async def main():
      options = ClaudeAgentOptions(
          mcp_servers={
              "claude-code-docs": {
                  "type": "http",
                  "url": "https://code.claude.com/docs/mcp",
              }
          },
          allowed_tools=["mcp__claude-code-docs__*"],
      )

      async for message in query(
          prompt="Use the docs MCP server to explain what hooks are in Claude Code",
          options=options,
      ):
          if isinstance(message, ResultMessage) and message.subtype == "success":
              print(message.result)

  asyncio.run(main())
  ```

The agent connects to the documentation server, searches for information about hooks, and returns the results.

## Add an MCP server

You can configure MCP servers in code when calling `query()`, or in a `.mcp.json` file loaded via [`settingSources`](#from-a-config-file).

### In code

Pass MCP servers directly in the `mcpServers` option. This example starts a local filesystem MCP server for `/Users/me/projects`. Replace that path with a directory on your machine:

  ```typescript TypeScript theme={null}
  import { query } from "@anthropic-ai/claude-agent-sdk";

  for await (const message of query({
    prompt: "List files in my project",
    options: {
      mcpServers: {
        filesystem: {
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]
        }
      },
      allowedTools: ["mcp__filesystem__*"]
    }
  })) {
    if (message.type === "result" && message.subtype === "success") {
      console.log(message.result);
    }
  }
  ```

  ```python Python theme={null}
  import asyncio
  from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage

  async def main():
      options = ClaudeAgentOptions(
          mcp_servers={
              "filesystem": {
                  "command": "npx",
                  "args": [
                      "-y",
                      "@modelcontextprotocol/server-filesystem",
                      "/Users/me/projects",
                  ],
              }
          },
          allowed_tools=["mcp__filesystem__*"],
      )

      async for message in query(prompt="List files in my project", options=options):
          if isinstance(message, ResultMessage) and message.subtype == "success":
              print(message.result)

  asyncio.run(main())
  ```

### From a config file

Create a `.mcp.json` file at your project root. The file is picked up when the `project` setting source is enabled, which it is for default `query()` options. If you set `settingSources` explicitly, include `"project"` for this file to load. Replace `/Users/me/projects` with a directory on your machine:

```json theme={null}
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]
    }
  }
}
```

## Connection timing

Claude Code registers the servers you pass in `options.mcpServers` at startup and emits the [init message](#error-handling) once the first-turn wait, if any, resolves. Without `options.mcpServers`, Claude Code waits 2 seconds for pending servers before the first turn, so servers loaded from [settings files](#from-a-config-file) such as `.mcp.json` commonly show `pending` at init. When each `options.mcpServers` server connects, and whether it delays the first turn, depends on its type:

| Server type                                                                            | Delays the first turn?                                 | First-turn wait timeout                                                                     |
| :------------------------------------------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| stdio server, or HTTP/SSE server without a cached tool list                            | Yes, until it connects                                 | [`MCP_TIMEOUT`](https://code.claude.com/docs/en/env-vars), 30 seconds by default; the connection fails at that deadline |
| Remote server with a cached tool list, saved by Claude Code from a previous connection | No; the cached tools are available from the first turn | None; connects on its first tool call, and that deferred connect has its own timeout        |
| In-process [SDK server](#sdk-mcp-servers)                                              | No; never delays the first turn                        | None                                                                                        |

To block startup itself at a separate, earlier phase than the first-turn wait, before the init message is sent:

* Set [`MCP_CONNECTION_NONBLOCKING`](https://code.claude.com/docs/en/env-vars) to `0` to block on the whole connection batch. Claude Code caps that wait at 5 seconds by default. Adjust the cap with the [`MCP_CONNECT_TIMEOUT_MS`](https://code.claude.com/docs/en/env-vars) environment variable, in milliseconds. Servers still pending at that deadline keep connecting in the background.
* Set `alwaysLoad: true` on a server's config to make its tools available at their full schemas on the first turn, [exempt from tool search deferral](https://code.claude.com/docs/en/mcp#exempt-a-server-from-deferral). Claude Code waits at startup for that server's tools, capped at the same deadline, while other servers keep connecting in the background; a remote server with a cached tool list supplies them without connecting, per the table above.

The `system` message with subtype `init` reports each server's status at the moment it's emitted; see [Error handling](#error-handling) for reading those statuses.

## Allow MCP tools

MCP tools require explicit permission before Claude can use them. Without permission, Claude will see that tools are available but won't be able to call them.

### Tool naming convention
