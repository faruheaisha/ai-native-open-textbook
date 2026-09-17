---
title: "MCP Filesystem Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/filesystem_example/README.md"
sourceRel: "examples/mcp/filesystem_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/filesystem_example/README.md"
sourceSha256: "b0a8d80fc36f089be6d9cf887488edc5a62c42820619e66bbb24d5a01b1557d4"
pageSha256: "b0a8d80fc36f089be6d9cf887488edc5a62c42820619e66bbb24d5a01b1557d4"
contentMode: "local-full"
zh: ""
---

# MCP Filesystem Example

This example uses the [filesystem MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem), running locally via `npx`.

Run it via:

```
uv run python examples/mcp/filesystem_example/main.py
```

## Details

The example uses the `MCPServerStdio` class from `agents.mcp`, with the command:

```bash
npx -y "@modelcontextprotocol/server-filesystem" <samples_directory>
```

It's only given access to the `sample_files` directory adjacent to the example, which contains some sample data.

Under the hood:

1. The server is spun up in a subprocess, and exposes a bunch of tools like `list_directory()`, `read_file()`, etc.
2. We add the server instance to the Agent via `mcp_agents`.
3. Each time the agent runs, we call out to the MCP server to fetch the list of tools via `server.list_tools()`.
4. If the LLM chooses to use an MCP tool, we call the MCP server to run the tool via `server.run_tool()`.
