---
title: "MCP SSE Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/sse_example/README.md"
sourceRel: "examples/mcp/sse_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/sse_example/README.md"
sourceSha256: "31625f6e2910de3273f8a7a9b8017fe89e86ba50326ef61b49dcf7ee62cadc72"
pageSha256: "31625f6e2910de3273f8a7a9b8017fe89e86ba50326ef61b49dcf7ee62cadc72"
contentMode: "local-full"
zh: ""
---

# MCP SSE Example

This repository example targets MCP Python SDK v2 and is intended to run with the repository's locked development environment. The Agents SDK client itself supports both MCP v1 and v2.

This example uses a local SSE server in [server.py](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/sse_example/server.py).

Run the example via:

```
uv run python examples/mcp/sse_example/main.py
```

## Details

The example uses the `MCPServerSse` class from `agents.mcp`. The server runs in a sub-process at `https://localhost:8000/sse`.
