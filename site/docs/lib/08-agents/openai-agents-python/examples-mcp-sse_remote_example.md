---
title: "MCP SSE Remote Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/sse_remote_example/README.md"
sourceRel: "examples/mcp/sse_remote_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/sse_remote_example/README.md"
sourceSha256: "6650a5efb123acc6dc12c7726fa62b247a556ab55d340297b8b5cd40cb47a05d"
pageSha256: "6650a5efb123acc6dc12c7726fa62b247a556ab55d340297b8b5cd40cb47a05d"
contentMode: "local-full"
zh: ""
---

# MCP SSE Remote Example

Python port of the JS `examples/mcp/sse-example.ts`. By default it starts the bundled local SSE MCP server and lets the agent use those tools. Set `MCP_SSE_REMOTE_URL` to try a compatible remote SSE server instead.

Run it with:

```bash
uv run python examples/mcp/sse_remote_example/main.py
```

Prerequisites:

- `OPENAI_API_KEY` set for the model calls.
