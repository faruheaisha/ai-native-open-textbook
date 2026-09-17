---
title: "MCP Tool Filter Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/tool_filter_example/README.md"
sourceRel: "examples/mcp/tool_filter_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/tool_filter_example/README.md"
sourceSha256: "2ddbb1c7f087776b643764af008396385c3cbf6087d2295f22cf5bab13c36f59"
pageSha256: "2ddbb1c7f087776b643764af008396385c3cbf6087d2295f22cf5bab13c36f59"
contentMode: "local-full"
zh: ""
---

# MCP Tool Filter Example

Python port of the JS `examples/mcp/tool-filter-example.ts`. It shows how to:

- Run the filesystem MCP server locally via `npx`.
- Apply a static tool filter so only specific tools are exposed to the model.
- Observe that blocked tools are not available.
- Enable `require_approval="always"` and auto-approve interruptions in code so the HITL path is exercised.

Run it with:

```bash
uv run python examples/mcp/tool_filter_example/main.py
```

Prerequisites:

- `npx` available on your PATH.
- `OPENAI_API_KEY` set for the model calls.
