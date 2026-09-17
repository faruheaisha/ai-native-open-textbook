---
title: "MCP Streamable HTTP Remote Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/streamable_http_remote_example/README.md"
sourceRel: "examples/mcp/streamable_http_remote_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/streamable_http_remote_example/README.md"
sourceSha256: "a3bf6ffbc211c73d0bccc6ffe30c6b96f3b12ced14f7db56a00376700c2a94d6"
pageSha256: "a3bf6ffbc211c73d0bccc6ffe30c6b96f3b12ced14f7db56a00376700c2a94d6"
contentMode: "local-full"
zh: ""
---

# MCP Streamable HTTP Remote Example

Python port of the JS `examples/mcp/streamable-http-example.ts`. It connects to DeepWiki over the Streamable HTTP transport (`https://mcp.deepwiki.com/mcp`) and lets the agent use those tools.

Run it with:

```bash
uv run python examples/mcp/streamable_http_remote_example/main.py
```

Prerequisites:

- `OPENAI_API_KEY` set for the model calls.
