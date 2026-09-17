---
title: "MCP Streamable HTTP Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/streamablehttp_example/README.md"
sourceRel: "examples/mcp/streamablehttp_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/streamablehttp_example/README.md"
sourceSha256: "caf4c89087d002311c1586072d9c1cbd85f7150fa689523aa12bad608ccaa426"
pageSha256: "caf4c89087d002311c1586072d9c1cbd85f7150fa689523aa12bad608ccaa426"
contentMode: "local-full"
zh: ""
---

# MCP Streamable HTTP Example

This repository example targets MCP Python SDK v2 and is intended to run with the repository's locked development environment. The Agents SDK client itself supports both MCP v1 and v2.

This example uses a local Streamable HTTP server in [server.py](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/streamablehttp_example/server.py).

Run the example via:

```
uv run python examples/mcp/streamablehttp_example/main.py
```

## Details

The example uses the `MCPServerStreamableHttp` class from `agents.mcp`. The script picks an open localhost port automatically (or honors `STREAMABLE_HTTP_PORT` if you set it) and starts the server at `http://<host>:<port>/mcp`. Set `STREAMABLE_HTTP_HOST` if you need a different bind address.
