---
title: "MCP getallmcptools Example"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/mcp/get_all_mcp_tools_example/README.md"
sourceRel: "examples/mcp/get_all_mcp_tools_example/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/mcp/get_all_mcp_tools_example/README.md"
sourceSha256: "549076188527b3fb3e83e33b25778d0990f2930ce5fc86c0d322702cce82fee2"
pageSha256: "549076188527b3fb3e83e33b25778d0990f2930ce5fc86c0d322702cce82fee2"
contentMode: "local-full"
zh: ""
---

# MCP get_all_mcp_tools Example

Python port of the JS `examples/mcp/get-all-mcp-tools-example.ts`. It demonstrates:

- Spinning up a local filesystem MCP server via `npx`.
- Prefetching all MCP tools with `MCPUtil.get_all_function_tools`.
- Building an agent that uses those prefetched tools instead of `mcp_servers`.
- Applying a static tool filter and refetching tools.
- Enabling `require_approval="always"` on the server and auto-approving interruptions in code to exercise the HITL path.

Run it with:

```bash
uv run python examples/mcp/get_all_mcp_tools_example/main.py
```

Prerequisites:

- `npx` available on your PATH.
- `OPENAI_API_KEY` set for the model calls.
